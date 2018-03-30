package com.todotresde.sfi3.service;

import com.todotresde.sfi3.config.Constants;
import com.todotresde.sfi3.domain.*;
import com.todotresde.sfi3.repository.TracerRepository;
import com.todotresde.sfi3.repository.WorkStationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.Period;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.UUID;

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
    private ManufacturingOrderService manufacturingOrderService;

    public TracerService(TracerRepository tracerRepository, WorkStationRepository workStationRepository, SupplyTypeAttrValueService supplyTypeAttrValueService, @Lazy ManufacturingOrderService manufacturingOrderService) {
        this.tracerRepository = tracerRepository;
        this.workStationRepository = workStationRepository;
        this.supplyTypeAttrValueService = supplyTypeAttrValueService;
        this.manufacturingOrderService = manufacturingOrderService;
    }

    public void create(Line line, Product product, WorkStationConfig workStationConfig){
        Supply supply = this.getSupplyForWorkStationConfig(workStationConfig, product);

        List<SupplyTypeAttrValue> supplyTypeAttrValues;
        if (null != supply) {
            supplyTypeAttrValues = this.supplyTypeAttrValueService
                .getByManufacturingOrderAndProductAndSupply(product.getManufacturingOrder(), product, supply);
        } else {
            supplyTypeAttrValues = new ArrayList<SupplyTypeAttrValue>();
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
        tracer.setPrevWorkStation(null);
        tracer.setNextWorkStation(null);

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
                supplyTypeAttrValues = new ArrayList<SupplyTypeAttrValue>();
            }

            nextTracer.setCode(tracer.getCode());
            nextTracer.setInTime(Instant.now());
            nextTracer.setStatus(Constants.STATUS_CREATED);
            nextTracer.setWorkStationConfig(workStationConfig);
            nextTracer.setManufacturingOrder(tracer.getManufacturingOrder());
            nextTracer.setProduct(tracer.getProduct());
            nextTracer.setSupply(supply);
            tracer.setSupplyTypeAttrValues(new HashSet<>(supplyTypeAttrValues));
            nextTracer.setLine(tracer.getLine());
            nextTracer.setWorkStation(workStationConfig.getWorkStation());
            nextTracer.setPrevWorkStation(tracer.getWorkStation());
            nextTracer.setNextWorkStation(null);
            nextTracer.setPrevTracer(tracer);

            tracerRepository.save(nextTracer);

            tracer.setNextWorkStation(workStationConfig.getWorkStation());
        }

        tracer.setEndTime(Instant.now());
        tracer.setTime((int)tracer.getEndTime().getEpochSecond() - (int)tracer.getStartTime().getEpochSecond());
        tracer.setStatus(Constants.STATUS_FINISHED);
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
        return this.tracerRepository.countByManufacturingOrderAndStatus(manufacturingOrder,Constants.STATUS_FINISHED);
    }
}

