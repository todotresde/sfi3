package com.todotresde.mms.service;

import com.todotresde.mms.config.Constants;
import com.todotresde.mms.domain.*;
import com.todotresde.mms.repository.TracerRepository;
import com.todotresde.mms.repository.WorkStationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.UUID;

import static com.todotresde.mms.config.Constants.STATUS_FINISHED;

/**
 * Service class for managing users.
 */
@Service
@Transactional
public class TracerService {

    private final Logger log = LoggerFactory.getLogger(TracerService.class);

    private final TracerRepository tracerRepository;
    private final WorkStationRepository workStationRepository;
    private final SupplyTypeAttrValueService supplyTypeAttrValueService;
    private final ManufacturingOrderService manufacturingOrderService;
    private final SchedulerService schedulerService;

    public TracerService(TracerRepository tracerRepository, WorkStationRepository workStationRepository, SupplyTypeAttrValueService supplyTypeAttrValueService, @Lazy ManufacturingOrderService manufacturingOrderService, @Lazy SchedulerService schedulerService) {
        this.tracerRepository = tracerRepository;
        this.workStationRepository = workStationRepository;
        this.supplyTypeAttrValueService = supplyTypeAttrValueService;
        this.manufacturingOrderService = manufacturingOrderService;
        this.schedulerService = schedulerService;
    }

    public void create(Line line, Product product, WorkStationConfig workStationConfig){
        log.debug("Create a Tracer for Product {}", product.getId());

        Supply supply = this.getSupplyForWorkStationConfig(workStationConfig, product);

        List<SupplyTypeAttrValue> supplyTypeAttrValues;
        if (null != supply) {
            supplyTypeAttrValues = this.supplyTypeAttrValueService
                .getByManufacturingOrderAndProductAndSupply(product.getManufacturingOrder(), product, supply);
        } else {
            supplyTypeAttrValues = new ArrayList<>();
        }

        Tracer tracer = new Tracer();
        tracer.setCode(UUID.randomUUID().toString());
        tracer.setInTime(Instant.now());
        tracer.setStatus(Constants.STATUS_CREATED);
        tracer.setWorkStationConfig(workStationConfig);
        tracer.setManufacturingOrder(product.getManufacturingOrder());
        tracer.setProduct(product);
        tracer.setSupply(supply);
        tracer.setSupplyTypeAttrValues(new HashSet<>(supplyTypeAttrValues));
        tracer.setLine(line);
        tracer.setWorkStation(workStationConfig.getWorkStation());
        tracer.setTime(this.schedulerService.getAverageTimeForWorkStationConfig(workStationConfig));
        tracer.setPrevWorkStation(null);
        tracer.setNextWorkStation(null);
        tracer.setEmployee(workStationConfig.getEmployees().iterator().next());

        tracerRepository.save(tracer);
    }

    public Tracer sendFromWorkStationIP(WorkStationConfig workStationConfig, String ip, Tracer tracer){
        WorkStation workStation = this.workStationRepository.findByIp(ip);

        //Validate WorkStation and Tracer
        Boolean validTrace = this.tracerRepository.findByWorkStationAndCode(workStation, tracer.getCode()) != null;

        if(validTrace){
            return this.moveNext(workStationConfig, tracer);
        }

        return null;
    }

    public Tracer send(WorkStationConfig workStationConfig, Tracer tracer){
        //Validate WorkStation and Tracer
        Boolean validTrace = this.tracerRepository.findByWorkStationAndCode(tracer.getWorkStation(), tracer.getCode()) != null;

        if(validTrace){
            return this.moveNext(workStationConfig, tracer);
        }

        return null;
    }

    public Tracer moveNext(WorkStationConfig workStationConfig, Tracer tracer){
        Tracer nextTracer = new Tracer();

        if(workStationConfig != null) {
            Supply supply = this.getSupplyForWorkStationConfig(workStationConfig, tracer.getProduct());

            List<SupplyTypeAttrValue> supplyTypeAttrValues;
            if (null != supply) {
                supplyTypeAttrValues = this.supplyTypeAttrValueService
                    .getByManufacturingOrderAndProductAndSupply(tracer.getProduct().getManufacturingOrder(), tracer.getProduct(), supply);
            } else {
                supplyTypeAttrValues = new ArrayList<>();
            }

            nextTracer.setCode(tracer.getCode());
            nextTracer.setInTime(Instant.now());
            nextTracer.setStatus(Constants.STATUS_CREATED);
            nextTracer.setWorkStationConfig(workStationConfig);
            nextTracer.setManufacturingOrder(tracer.getManufacturingOrder());
            nextTracer.setProduct(tracer.getProduct());
            nextTracer.setSupply(supply);
            nextTracer.setSupplyTypeAttrValues(new HashSet<>(supplyTypeAttrValues));
            nextTracer.setLine(tracer.getLine());
            nextTracer.setWorkStation(workStationConfig.getWorkStation());
            nextTracer.setPrevWorkStation(tracer.getWorkStation());
            nextTracer.setNextWorkStation(null);
            nextTracer.setPrevTracer(tracer);
            nextTracer.setTime(this.schedulerService.getAverageTimeForWorkStationConfig(workStationConfig));
            nextTracer.setEmployee(workStationConfig.getEmployees().iterator().next());

            tracerRepository.save(nextTracer);

            tracer.setNextWorkStation(workStationConfig.getWorkStation());
        }

        tracer.setEndTime(Instant.now());
        //tracer.setTime((int)tracer.getEndTime().getEpochSecond() - (int)tracer.getStartTime().getEpochSecond());
        Integer randTime = (5 + (int)(Math.random() * ((20 - 5) + 1))) * 60;
        tracer.setTime(randTime);

        tracer.setStatus(STATUS_FINISHED);
        tracer.setNextTracer(null);
        tracerRepository.save(tracer);

        if (workStationConfig == null) {
            this.manufacturingOrderService.productFinished(tracer.getProduct());
        }

        return nextTracer;
    }

    public List<Tracer> getTracersForWorkStation(WorkStation workStation){
        return this.tracerRepository.findByWorkStationAndStatus(workStation, Constants.STATUS_CREATED);
    }

    public Supply getSupplyForWorkStationConfig(WorkStationConfig workStationConfig, Product product) {
        Supply supply = null;

        for( SupplyType supplyType: workStationConfig.getSupplyTypes()) {
            for( Supply productSupply: product.getSupplies()) {
                if(productSupply.getSupplyType().getId() == supplyType.getId()) {
                    supply = productSupply;
                }
            }
        }

        return supply;
    }

    public Integer getTotalForManufacturingOrder(ManufacturingOrder manufacturingOrder) {
        return this.tracerRepository.countByManufacturingOrder(manufacturingOrder);
    }

    public Integer getFinishedForManufacturingOrder(ManufacturingOrder manufacturingOrder) {
        return this.tracerRepository.countByManufacturingOrderAndStatus(manufacturingOrder,STATUS_FINISHED);
    }

    /**
     * Get the total time in a workStation using the WorkStationConfig
     *
     * @param workStationConfig the workStationConfig to get the time
     * @return the time to wait in the workStation
     */
    public Integer getTotalTimeForWorkStationConfig(WorkStationConfig workStationConfig) {
        List<Tracer> tracers = this.tracerRepository.findByWorkStationAndOpen(workStationConfig.getWorkStation());
        Integer sum = 0;
        for( Tracer tracer: tracers) {
            sum += tracer.getTime();
        }
        return sum;
    }

    public Integer getTimeToFinish(Tracer tracer) {
        return this.getTotalTimeForWorkStationConfig(tracer.getWorkStationConfig());
    }

    public List<Tracer> findByManufacturingOrder(ManufacturingOrder manufacturingOrder) {
        return this.tracerRepository.findByManufacturingOrder(manufacturingOrder);
    }

    public List<Tracer> getFinishedForWorkStationConfig(WorkStationConfig workStationConfig) {
        return this.tracerRepository.findByWorkStationAndStatus(workStationConfig.getWorkStation(), STATUS_FINISHED);
    }

    public Tracer findByCodeAndIp(String code, String ip) {
        WorkStation workStation = this.workStationRepository.findByIp(ip);
        return this.tracerRepository.findByWorkStationAndCode(workStation, code);
    }
}

