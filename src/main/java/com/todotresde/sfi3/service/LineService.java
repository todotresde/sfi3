package com.todotresde.sfi3.service;

import com.todotresde.sfi3.domain.*;
import com.todotresde.sfi3.repository.LineRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.concurrent.ThreadLocalRandom;

/**
 * Service class for managing users.
 */
@Service
@Transactional
public class LineService {

    private final Logger log = LoggerFactory.getLogger(LineService.class);

    private final LineRepository lineRepository;
    private final WorkStationConfigService workStationConfigService;
    private final TracerService tracerService;
    private final ProductService productService;

    public LineService(LineRepository lineRepository, WorkStationConfigService workStationConfigService, TracerService tracerService, ProductService productService) {
        this.lineRepository = lineRepository;
        this.workStationConfigService = workStationConfigService;
        this.tracerService = tracerService;
        this.productService = productService;
    }

    public Line getBestLineForProduct(Product product) {
        List<Line> lines = this.getLineForProduct(product);
        Line bestLine = null;
        Long time = new Long(999999999);

        //Get Lines that has necessary workstations to build thos MOProduct
        for(Line line: lines){
            Long lineTime = this.getTimeForLine(line);
            if(lineTime < time){
                time = lineTime;
                bestLine = line;
            }
        }

        return bestLine;
    }

    public List<Line> getLineForProduct(Product product) {
        List<Line> lines = this.lineRepository.findAll();
        List<Line> linesForProduct = new ArrayList<Line>();

        List<SupplyType> productSupplyTypes = this.productService.getSupplyTypes(product);
        for(Line line: lines){
            List<SupplyType> lineSupplyTypes = this.getSupplyTypesForLine(line);

            //if(productSupplyTypes.size() == lineSupplyTypes.size() && productSupplyTypes.containsAll(lineSupplyTypes)){
            if(lineSupplyTypes.containsAll(productSupplyTypes)){
                linesForProduct.add(line);
            }
        }

        return linesForProduct;
    }

    public Long getTimeForLine(Line line) {
        return new Long(ThreadLocalRandom.current().nextInt(20, 100 ));
    }

    public void sendProduct(Line line, Product product){
        WorkStationConfig workStationConfig = this.workStationConfigService.getFirstWorkStationConfigForLine(line);
        this.workStationConfigService.create(workStationConfig, line, product);

    }

    public Tracer sendFromWorkStationIP(String ip, Tracer tracer){
        WorkStation nextWorkStation = null;
        WorkStationConfig nextWorkStationConfig = this.getNextWorkStationConfig(tracer.getWorkStationConfig());
        if(nextWorkStationConfig != null) {
            WorkStationConfig nextToNextWorkStationConfig = this.getNextWorkStationConfig(nextWorkStationConfig);
            nextWorkStation = (nextToNextWorkStationConfig != null) ? nextToNextWorkStationConfig.getWorkStation() : null;
        }
        return this.tracerService.sendFromWorkStationIP(nextWorkStationConfig, ip, tracer, nextWorkStation);
    }

    public Tracer send(Tracer tracer){
        WorkStation nextWorkStation = null;
        WorkStationConfig nextWorkStationConfig = this.getNextWorkStationConfig(tracer.getWorkStationConfig());
        if(nextWorkStationConfig != null) {
            WorkStationConfig nextToNextWorkStationConfig = this.getNextWorkStationConfig(nextWorkStationConfig);
            nextWorkStation = (nextToNextWorkStationConfig != null) ? nextToNextWorkStationConfig.getWorkStation() : null;
        }
        return this.tracerService.send(nextWorkStationConfig, tracer, nextWorkStation);
    }

    public WorkStationConfig getNextWorkStationConfig(WorkStationConfig workStationConfig){
        return this.workStationConfigService.getNextWorkStationConfig(workStationConfig);
    }

    public List<SupplyType> getSupplyTypesForLine(Line line){
        Set<SupplyType> supplyTypes = new HashSet<SupplyType>();

        for(WorkStationConfig wSConfiguration: line.getWorkStationConfigs()){
            for(SupplyType supplyType: wSConfiguration.getSupplyTypes()) {
                supplyTypes.add(supplyType);
            }
        }

        return new ArrayList<>(supplyTypes);
    }
}

