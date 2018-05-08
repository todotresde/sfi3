package com.todotresde.mms.service;

import com.todotresde.mms.domain.*;
import com.todotresde.mms.repository.ProductRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

/**
 * Service class for managing users.
 */
@Service
@Transactional
public class ProductService {

    private final Logger log = LoggerFactory.getLogger(ProductService.class);

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Product save(Product product) {
        return this.productRepository.save(product);
    }

    public List<Product> getByManufacturingOrder(ManufacturingOrder manufacturingOrder) {
        return this.productRepository.findAllWithEagerRelationshipsByManufacturingOrderId(manufacturingOrder.getId());
    }

    public List<SupplyType> getSupplyTypes(Product product) {
        log.debug("Get supplies for product {}", product.getId());

        List<SupplyType> supplyTypes = new ArrayList<>();

        for(Supply supply: product.getSupplies()){
            if(!supplyTypes.contains(supply.getSupplyType()))
                supplyTypes.add(supply.getSupplyType());
        }

        return supplyTypes;
    }

    public void delete(Product product) {
        this.productRepository.delete(product.getId());
    }

    public Supply nextSupply(Product product, Supply currentSupply, WorkStationConfig nextWorkStationConfig) {
        return this.nextSupply(product, (currentSupply != null) ? currentSupply.getSupplyType() : null, nextWorkStationConfig);
    }

    @Deprecated
    public Supply nextSupply(Product product, SupplyType currentSupply, WorkStationConfig nextWorkStationConfig) {
        Supply nextSupply = null;
        Boolean foundSupply = false;

        if (currentSupply != null) {
            for (Supply productSupply : product.getSupplies()) {
                if(nextWorkStationConfig.getSupplyTypes().contains(productSupply.getSupplyType())) {
                    nextSupply = productSupply;
                }
            }
        }

        return nextSupply;
    }
}

