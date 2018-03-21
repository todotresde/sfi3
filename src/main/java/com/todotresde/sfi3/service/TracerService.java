package com.todotresde.sfi3.service;

import com.todotresde.sfi3.domain.*;
import com.todotresde.sfi3.repository.TracerRepository;
import com.todotresde.sfi3.repository.WorkStationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
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

    public TracerService(TracerRepository tracerRepository, WorkStationRepository workStationRepository, SupplyTypeAttrValueService supplyTypeAttrValueService) {
        this.tracerRepository = tracerRepository;
        this.workStationRepository = workStationRepository;
        this.supplyTypeAttrValueService = supplyTypeAttrValueService;
    }

    public void create(Line line, Product product, WorkStationConfig workStationConfig, WorkStation prevWorkStation, WorkStation nextWorkStation){
        Supply supply = this.getSupplyForWorkStationConfig(workStationConfig, product);

        List<SupplyTypeAttrValue> supplyTypeAttrValues = this.supplyTypeAttrValueService
            .getByManufacturingOrderAndProductAndSupply(product.getManufacturingOrder(), product, supply);

        Tracer tracer = new Tracer();
        tracer.setCode(UUID.randomUUID().toString());
        tracer.setInTime(Instant.now());
        tracer.setStatus(0);
        tracer.setWorkStationConfig(workStationConfig);
        tracer.setManufacturingOrder(product.getManufacturingOrder());
        tracer.setProduct(product);
        tracer.setSupply(supply);
        tracer.setSupplyTypeAttrValues(new HashSet<>(supplyTypeAttrValues));
        tracer.setLine(line);
        tracer.setWorkStation(workStationConfig.getWorkStation());
        tracer.setPrevWorkStation(prevWorkStation);
        tracer.setNextWorkStation(nextWorkStation);

        tracerRepository.save(tracer);
    }

    public Tracer sendFromWorkStationIP(WorkStationConfig workStationConfig, String ip, Tracer tracer, WorkStation nextWorkStation){
        WorkStation workStation = this.workStationRepository.findByIp(ip);

        //Validate WorkStation and Tracer
        Boolean validTrace = this.tracerRepository.findByWorkStationAndCode(workStation, tracer.getCode()) != null;

        if(validTrace){
            return this.moveNext(workStationConfig, tracer, nextWorkStation);
        }

        return null;
    }

    public Tracer send(WorkStationConfig workStationConfig, Tracer tracer, WorkStation nextWorkStation){
        //Validate WorkStation and Tracer
        Boolean validTrace = this.tracerRepository.findByWorkStationAndCode(tracer.getWorkStation(), tracer.getCode()) != null;

        if(validTrace){
            return this.moveNext(workStationConfig, tracer, nextWorkStation);
        }

        return null;
    }

    public Tracer moveNext(WorkStationConfig workStationConfig, Tracer tracer, WorkStation nextWorkStation){
        Tracer nextTracer = new Tracer();

        if(workStationConfig != null) {
            Supply supply = this.getSupplyForWorkStationConfig(workStationConfig, tracer.getProduct());

            List<SupplyTypeAttrValue> supplyTypeAttrValues = this.supplyTypeAttrValueService
                .getByManufacturingOrderAndProductAndSupply(tracer.getProduct().getManufacturingOrder(), tracer.getProduct(), supply);

            nextTracer.setCode(tracer.getCode());
            nextTracer.setInTime(Instant.now());
            nextTracer.setStatus(0);
            nextTracer.setWorkStationConfig(workStationConfig);
            nextTracer.setManufacturingOrder(tracer.getManufacturingOrder());
            nextTracer.setProduct(tracer.getProduct());
            nextTracer.setSupply(supply);
            tracer.setSupplyTypeAttrValues(new HashSet<>(supplyTypeAttrValues));
            nextTracer.setLine(tracer.getLine());
            nextTracer.setWorkStation(workStationConfig.getWorkStation());
            nextTracer.setPrevWorkStation(tracer.getWorkStation());
            nextTracer.setNextWorkStation(nextWorkStation);
            nextTracer.setPrevTracer(tracer);

            tracerRepository.save(nextTracer);
        }

        tracer.setStatus(1);
        tracer.setNextTracer(null);
        tracerRepository.save(tracer);

        return nextTracer;
    }

    public List<Tracer> getTracersForWorkStation(WorkStation workStation){
        return this.tracerRepository.findByWorkStationAndStatus(workStation,0);
    }

    public Supply getSupplyForWorkStationConfig(WorkStationConfig workStationConfig, Product product) {
        Supply supply = new Supply();

        for( SupplyType supplyType: workStationConfig.getSupplyTypes()) {
            for( Supply productSupply: product.getSupplies()) {
                if(productSupply.getSupplyType().getId() == supplyType.getId()) {
                    supply = productSupply;
                }
            }
        }

        return supply;
    }
}

