package com.todotresde.sfi3.service;

import com.todotresde.sfi3.domain.Line;
import com.todotresde.sfi3.domain.Product;
import com.todotresde.sfi3.domain.SupplyType;
import com.todotresde.sfi3.domain.WorkStationConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.concurrent.ThreadLocalRandom;

/**
 * Service class for managing users.
 */
@Service
@Transactional
public class SchedulerService {

    private final Logger log = LoggerFactory.getLogger(SchedulerService.class);

    private final LineService lineService;
    private final ProductService productService;

    public SchedulerService(LineService lineService, ProductService productService) {
        this.lineService = lineService;
        this.productService = productService;

    }

    public void sendProduct(Product product) {
        log.debug("Send manufacturingOrderProduct to build {}", product.getId());

        Line line = this.getBestLineForProduct(product);

        lineService.sendProduct(line, product);
    }

    private Line getBestLineForProduct(Product product) {
        List<Line> lines = this.getLineForProduct(product);
        Line bestLine = null;
        Long time = (long) 999999999;

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

    private List<Line> getLineForProduct(Product product) {
        List<Line> lines = this.lineService.findAll();
        List<Line> linesForProduct = new ArrayList<>();

        List<SupplyType> productSupplyTypes = this.productService.getSupplyTypes(product);
        for(Line line: lines){
            List<SupplyType> lineSupplyTypes = this.getSupplyTypesForLine(line);

            if(lineSupplyTypes.containsAll(productSupplyTypes)){
                linesForProduct.add(line);
            }
        }

        return linesForProduct;
    }

    public List<SupplyType> getSupplyTypesForLine(Line line){
        Set<SupplyType> supplyTypes = new HashSet<>();

        for(WorkStationConfig workStationConfig: line.getWorkStationConfigs()){
            for(SupplyType supplyType: workStationConfig.getSupplyTypes()) {
                supplyTypes.add(supplyType);
            }
        }

        return new ArrayList<>(supplyTypes);
    }

    public Long getTimeForLine(Line line) {
        return (long)ThreadLocalRandom.current().nextInt(20, 100 );
    }
}

