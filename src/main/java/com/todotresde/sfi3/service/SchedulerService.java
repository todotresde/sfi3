package com.todotresde.sfi3.service;

import com.todotresde.sfi3.domain.Line;
import com.todotresde.sfi3.domain.Product;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service class for managing users.
 */
@Service
@Transactional
public class SchedulerService {

    private final Logger log = LoggerFactory.getLogger(SchedulerService.class);

    private final LineService lineService;

    public SchedulerService(LineService lineService) {
        this.lineService = lineService;
    }

    public void sendProduct(Product product) {
        log.debug("Send manufacturingOrderProduct to build {}", product.getId());

        Line line = lineService.getBestLineForProduct(product);

        lineService.sendProduct(line, product);
    }
}

