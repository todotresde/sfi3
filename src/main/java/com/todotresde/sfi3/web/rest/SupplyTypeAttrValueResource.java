package com.todotresde.sfi3.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.todotresde.sfi3.domain.SupplyTypeAttrValue;

import com.todotresde.sfi3.repository.SupplyTypeAttrValueRepository;
import com.todotresde.sfi3.web.rest.errors.BadRequestAlertException;
import com.todotresde.sfi3.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing SupplyTypeAttrValue.
 */
@RestController
@RequestMapping("/api")
public class SupplyTypeAttrValueResource {

    private final Logger log = LoggerFactory.getLogger(SupplyTypeAttrValueResource.class);

    private static final String ENTITY_NAME = "supplyTypeAttrValue";

    private final SupplyTypeAttrValueRepository supplyTypeAttrValueRepository;

    public SupplyTypeAttrValueResource(SupplyTypeAttrValueRepository supplyTypeAttrValueRepository) {
        this.supplyTypeAttrValueRepository = supplyTypeAttrValueRepository;
    }

    /**
     * POST  /supply-type-attr-values : Create a new supplyTypeAttrValue.
     *
     * @param supplyTypeAttrValue the supplyTypeAttrValue to create
     * @return the ResponseEntity with status 201 (Created) and with body the new supplyTypeAttrValue, or with status 400 (Bad Request) if the supplyTypeAttrValue has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/supply-type-attr-values")
    @Timed
    public ResponseEntity<SupplyTypeAttrValue> createSupplyTypeAttrValue(@Valid @RequestBody SupplyTypeAttrValue supplyTypeAttrValue) throws URISyntaxException {
        log.debug("REST request to save SupplyTypeAttrValue : {}", supplyTypeAttrValue);
        if (supplyTypeAttrValue.getId() != null) {
            throw new BadRequestAlertException("A new supplyTypeAttrValue cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SupplyTypeAttrValue result = supplyTypeAttrValueRepository.save(supplyTypeAttrValue);
        return ResponseEntity.created(new URI("/api/supply-type-attr-values/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /supply-type-attr-values : Updates an existing supplyTypeAttrValue.
     *
     * @param supplyTypeAttrValue the supplyTypeAttrValue to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated supplyTypeAttrValue,
     * or with status 400 (Bad Request) if the supplyTypeAttrValue is not valid,
     * or with status 500 (Internal Server Error) if the supplyTypeAttrValue couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/supply-type-attr-values")
    @Timed
    public ResponseEntity<SupplyTypeAttrValue> updateSupplyTypeAttrValue(@Valid @RequestBody SupplyTypeAttrValue supplyTypeAttrValue) throws URISyntaxException {
        log.debug("REST request to update SupplyTypeAttrValue : {}", supplyTypeAttrValue);
        if (supplyTypeAttrValue.getId() == null) {
            return createSupplyTypeAttrValue(supplyTypeAttrValue);
        }
        SupplyTypeAttrValue result = supplyTypeAttrValueRepository.save(supplyTypeAttrValue);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, supplyTypeAttrValue.getId().toString()))
            .body(result);
    }

    /**
     * GET  /supply-type-attr-values : get all the supplyTypeAttrValues.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of supplyTypeAttrValues in body
     */
    @GetMapping("/supply-type-attr-values")
    @Timed
    public List<SupplyTypeAttrValue> getAllSupplyTypeAttrValues() {
        log.debug("REST request to get all SupplyTypeAttrValues");
        return supplyTypeAttrValueRepository.findAll();
        }

    /**
     * GET  /supply-type-attr-values/manufacturing-order/:id : get all the supplyTypeAttrValues from manufacturingOrder.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of supplyTypeAttrValues in body
     */
    @GetMapping("/supply-type-attr-values/manufacturing-order/{id}")
    @Timed
    public List<SupplyTypeAttrValue> getAllSupplyTypeAttrValues(@PathVariable Long id) {
        log.debug("REST request to get all SupplyTypeAttrValues by ManufacturingOrder");
        return supplyTypeAttrValueRepository.findAllByManufacturingOrderId(id);
    }

    /**
     * GET  /supply-type-attr-values/:id : get the "id" supplyTypeAttrValue.
     *
     * @param id the id of the supplyTypeAttrValue to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the supplyTypeAttrValue, or with status 404 (Not Found)
     */
    @GetMapping("/supply-type-attr-values/{id}")
    @Timed
    public ResponseEntity<SupplyTypeAttrValue> getSupplyTypeAttrValue(@PathVariable Long id) {
        log.debug("REST request to get SupplyTypeAttrValue : {}", id);
        SupplyTypeAttrValue supplyTypeAttrValue = supplyTypeAttrValueRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(supplyTypeAttrValue));
    }

    /**
     * DELETE  /supply-type-attr-values/:id : delete the "id" supplyTypeAttrValue.
     *
     * @param id the id of the supplyTypeAttrValue to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/supply-type-attr-values/{id}")
    @Timed
    public ResponseEntity<Void> deleteSupplyTypeAttrValue(@PathVariable Long id) {
        log.debug("REST request to delete SupplyTypeAttrValue : {}", id);
        supplyTypeAttrValueRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
