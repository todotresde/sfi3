package com.todotresde.mms.service;

import com.todotresde.mms.domain.*;
import com.todotresde.mms.repository.LineRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import java.util.*;

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

    public void sendProduct(Line line, Product product){
        log.debug("Send Product to build line: {} and product: {}", line.getId(), product.getId());

        WorkStationConfig workStationConfig = this.workStationConfigService.getFirstWorkStationConfigForLine(line);
        this.tracerService.create(line, product, workStationConfig);
    }

    public Tracer sendFromWorkStationIP(String ip, Tracer tracer){
        WorkStationConfig nextWorkStationConfig = this.getNextWorkStationConfig(tracer.getWorkStationConfig(), tracer.getProduct(), this.productService.nextSupply(tracer.getProduct(), tracer.getSupply()));

        return this.tracerService.sendFromWorkStationIP(nextWorkStationConfig, ip, tracer);
    }

    public Tracer send(Tracer tracer){
        WorkStationConfig nextWorkStationConfig = this.getNextWorkStationConfig(tracer.getWorkStationConfig(), tracer.getProduct(), this.productService.nextSupply(tracer.getProduct(), tracer.getSupply()));

        return this.tracerService.send(nextWorkStationConfig, tracer);
    }

    public WorkStationConfig getNextWorkStationConfig(WorkStationConfig workStationConfig, Product product, Supply supply){
        return this.workStationConfigService.getNextWorkStationConfig(workStationConfig, product, supply);
    }

    /**
     *
     * @param product the product to get lines
     * @return the List<Line> with all lines that has the ability to build the product
     */
    public List<Line> getLineForProduct(Product product) {
        List<Line> lines = this.lineRepository.findAll();
        List<Line> linesForProduct = new ArrayList<>();

        List<SupplyType> productSupplyTypes = this.productService.getSupplyTypes(product);
        for(Line line: lines){
            List<SupplyType> lineSupplyTypes = this.getSupplyTypesForLine(line);

            if(lineSupplyTypes.equals(productSupplyTypes)){
                linesForProduct.add(line);
            }
        }

        return linesForProduct;
    }

    /**
     *
     * @param line the line to get supplies
     * @return the List<SupplyType> with all supplies provided for the line, without repetitions.
     */
    public List<SupplyType> getSupplyTypesForLine(Line line){
        Set<SupplyType> supplyTypes = new HashSet<>();

        for(WorkStationConfig workStationConfig: line.getWorkStationConfigs()){
            for(SupplyType supplyType: workStationConfig.getSupplyTypes()) {
                if(!supplyTypes.contains(supplyType))
                    supplyTypes.add(supplyType);
            }
        }

        return new ArrayList<>(supplyTypes);
    }

}

