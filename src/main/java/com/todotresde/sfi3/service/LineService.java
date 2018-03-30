package com.todotresde.sfi3.service;

import com.todotresde.sfi3.domain.*;
import com.todotresde.sfi3.repository.LineRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    public List<Line> findAll() {
        return this.lineRepository.findAll();
    }
}

