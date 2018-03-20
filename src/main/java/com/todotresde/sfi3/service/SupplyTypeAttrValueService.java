package com.todotresde.sfi3.service;

import com.todotresde.sfi3.domain.*;
import com.todotresde.sfi3.repository.SupplyTypeAttrValueRepository;
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
public class SupplyTypeAttrValueService {

    private final Logger log = LoggerFactory.getLogger(SupplyTypeAttrValueService.class);

    private final SupplyTypeAttrValueRepository supplyTypeAttrValueRepository;

    public SupplyTypeAttrValueService(SupplyTypeAttrValueRepository supplyTypeAttrValueRepository) {
        this.supplyTypeAttrValueRepository = supplyTypeAttrValueRepository;
    }

    public SupplyTypeAttrValue save(SupplyTypeAttrValue supplyTypeAttrValue) {
        return this.supplyTypeAttrValueRepository.save(supplyTypeAttrValue);
    }

    public List<SupplyTypeAttrValue> getByManufacturingOrder(ManufacturingOrder manufacturingOrder) {
        return this.supplyTypeAttrValueRepository.findByManufacturingOrder(manufacturingOrder);
    }

    public void delete(SupplyTypeAttrValue supplyTypeAttrValue) {
        this.supplyTypeAttrValueRepository.delete(supplyTypeAttrValue.getId());
    }

}

