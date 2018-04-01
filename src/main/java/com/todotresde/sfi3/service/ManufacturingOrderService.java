package com.todotresde.sfi3.service;

import com.todotresde.sfi3.config.Constants;
import com.todotresde.sfi3.domain.*;
import com.todotresde.sfi3.repository.ManufacturingOrderRepository;
import com.todotresde.sfi3.service.dto.ManufacturingOrderDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service class for managing users.
 */
@Service
@Transactional
public class ManufacturingOrderService {

    private final Logger log = LoggerFactory.getLogger(ManufacturingOrderService.class);

    private final SchedulerService schedulerService;
    private final ProductService productService;
    private final SupplyTypeAttrValueService supplyTypeAttrValueService;
    private final TracerService tracerService;
    private final ManufacturingOrderRepository manufacturingOrderRepository;
    private final WorkStationConfigService workStationConfigService;


    public ManufacturingOrderService(SchedulerService schedulerService, ManufacturingOrderRepository manufacturingOrderRepository, ProductService productService, SupplyTypeAttrValueService supplyTypeAttrValueService, TracerService tracerService, WorkStationConfigService workStationConfigService) {
        this.schedulerService = schedulerService;
        this.productService = productService;
        this.supplyTypeAttrValueService = supplyTypeAttrValueService;
        this.manufacturingOrderRepository = manufacturingOrderRepository;
        this.tracerService = tracerService;
        this.workStationConfigService = workStationConfigService;
    }

    public ManufacturingOrder send(Long id) {
        ManufacturingOrder manufacturingOrder = manufacturingOrderRepository.findOne(id);
        log.debug("Send manufacturingOrder to build {}", manufacturingOrder);

        List<Product> products = this.productService.getByManufacturingOrder(manufacturingOrder);

        for(Product product: products){
            for(Integer cantProducts = 0; cantProducts<product.getQuantity(); cantProducts++) {
                schedulerService.sendProduct(product);
            }
        }

        manufacturingOrder.setStatus(Constants.STATUS_STARTED);

        manufacturingOrderRepository.save(manufacturingOrder);

        return manufacturingOrder;
    }

    public ManufacturingOrder saveWithProductsAndSTAttributeValues(ManufacturingOrder manufacturingOrder, List<Product> products, List<SupplyTypeAttrValue> supplyTypeAttrValues) {
        manufacturingOrder = manufacturingOrderRepository.save(manufacturingOrder);
        Integer stAttributeValueIndex = 0;
        for(Product product : products) {
            product.setId(null);
            product.setManufacturingOrder(manufacturingOrder);
            product.setDescription("");

            productService.save(product);

            for(Supply supply : product.getSupplies()) {
                for(SupplyTypeAttr supplyTypeAttr : supply.getSupplyType().getSupplyTypeAttrs()) {
                    SupplyTypeAttrValue supplyTypeAttrValue = new SupplyTypeAttrValue();
                    supplyTypeAttrValue.setManufacturingOrder(manufacturingOrder);
                    supplyTypeAttrValue.setProduct(product);
                    supplyTypeAttrValue.setSupplyTypeAttr(supplyTypeAttr);
                    supplyTypeAttrValue.setSupply(supply);
                    supplyTypeAttrValue.setSupplyType(supply.getSupplyType());
                    supplyTypeAttrValue.setValue(supplyTypeAttrValues.get(stAttributeValueIndex).getValue());

                    supplyTypeAttrValueService.save(supplyTypeAttrValue);

                    stAttributeValueIndex++;
                }

            }
        }

        return manufacturingOrder;
    }

    public ManufacturingOrderDTO findOneFull(Long id) {
        ManufacturingOrderDTO manufacturingOrderDTO = new ManufacturingOrderDTO();
        manufacturingOrderDTO.setManufacturingOrder(this.manufacturingOrderRepository.findOne(id));

        List<Product> products = this.productService.getByManufacturingOrder(manufacturingOrderDTO.getManufacturingOrder());
        manufacturingOrderDTO.setProducts(products);
        manufacturingOrderDTO.setSupplyTypeAttrValues(this.supplyTypeAttrValueService.getByManufacturingOrder(manufacturingOrderDTO.getManufacturingOrder()));

        return manufacturingOrderDTO;
    }

    public ManufacturingOrder updateWithProductsAndSTAttributeValues(ManufacturingOrder manufacturingOrder, List<Product> products, List<SupplyTypeAttrValue> supplyTypeAttrValues) {
        for(SupplyTypeAttrValue supplyTypeAttrValue : this.supplyTypeAttrValueService.getByManufacturingOrder(manufacturingOrder)) {
            this.supplyTypeAttrValueService.delete(supplyTypeAttrValue);
        }

        for(Product product : this.productService.getByManufacturingOrder(manufacturingOrder)) {
            this.productService.delete(product);
        }

        return this.saveWithProductsAndSTAttributeValues(manufacturingOrder, products, supplyTypeAttrValues);
    }

    public ManufacturingOrder productFinished(Product product) {
        ManufacturingOrder manufacturingOrder = product.getManufacturingOrder();

        Integer totalTracers = this.tracerService.getTotalForManufacturingOrder(manufacturingOrder);
        Integer finishedTracers = this.tracerService.getFinishedForManufacturingOrder(manufacturingOrder);

        if (totalTracers.equals(finishedTracers) ) {
            manufacturingOrder.setStatus(Constants.STATUS_FINISHED);
            this.manufacturingOrderRepository.save(manufacturingOrder);
        }

        return manufacturingOrder;
    }

    public Integer getTimeToFinish(Long manufacturingOrderId) {
        Integer timeToFinish = 0;
        ManufacturingOrder manufacturingOrder = this.manufacturingOrderRepository.findOne(manufacturingOrderId);
        List <Tracer> tracers = this.tracerService.findByManufacturingOrder(manufacturingOrder);
        for(Tracer tracer : tracers) {
            timeToFinish += this.tracerService.getTotalTimeForWorkStationConfig(tracer.getWorkStationConfig()) + this.workStationConfigService.getPendingRowTimeFromWorkStationConfig(tracer.getWorkStationConfig(), tracer.getProduct(), tracer.getSupply());
        }
        return timeToFinish;
    }
}

