package com.todotresde.sfi3.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.todotresde.sfi3.domain.SupplyType;

import com.todotresde.sfi3.repository.SupplyTypeRepository;
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
 * REST controller for managing SupplyType.
 */
@RestController
@RequestMapping("/api")
public class SupplyTypeResource {

    private final Logger log = LoggerFactory.getLogger(SupplyTypeResource.class);

    private static final String ENTITY_NAME = "supplyType";

    private final SupplyTypeRepository supplyTypeRepository;

    public SupplyTypeResource(SupplyTypeRepository supplyTypeRepository) {
        this.supplyTypeRepository = supplyTypeRepository;
    }

    /**
     * POST  /supply-types : Create a new supplyType.
     *
     * @param supplyType the supplyType to create
     * @return the ResponseEntity with status 201 (Created) and with body the new supplyType, or with status 400 (Bad Request) if the supplyType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/supply-types")
    @Timed
    public ResponseEntity<SupplyType> createSupplyType(@Valid @RequestBody SupplyType supplyType) throws URISyntaxException {
        log.debug("REST request to save SupplyType : {}", supplyType);
        if (supplyType.getId() != null) {
            throw new BadRequestAlertException("A new supplyType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SupplyType result = supplyTypeRepository.save(supplyType);
        return ResponseEntity.created(new URI("/api/supply-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /supply-types : Updates an existing supplyType.
     *
     * @param supplyType the supplyType to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated supplyType,
     * or with status 400 (Bad Request) if the supplyType is not valid,
     * or with status 500 (Internal Server Error) if the supplyType couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/supply-types")
    @Timed
    public ResponseEntity<SupplyType> updateSupplyType(@Valid @RequestBody SupplyType supplyType) throws URISyntaxException {
        log.debug("REST request to update SupplyType : {}", supplyType);
        if (supplyType.getId() == null) {
            return createSupplyType(supplyType);
        }
        SupplyType result = supplyTypeRepository.save(supplyType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, supplyType.getId().toString()))
            .body(result);
    }

    /**
     * GET  /supply-types : get all the supplyTypes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of supplyTypes in body
     */
    @GetMapping("/supply-types")
    @Timed
    public List<SupplyType> getAllSupplyTypes() {
        log.debug("REST request to get all SupplyTypes");
        return supplyTypeRepository.findAllWithEagerRelationships();
        }

    /**
     * GET  /supply-types/:id : get the "id" supplyType.
     *
     * @param id the id of the supplyType to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the supplyType, or with status 404 (Not Found)
     */
    @GetMapping("/supply-types/{id}")
    @Timed
    public ResponseEntity<SupplyType> getSupplyType(@PathVariable Long id) {
        log.debug("REST request to get SupplyType : {}", id);
        SupplyType supplyType = supplyTypeRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(supplyType));
    }

    /**
     * DELETE  /supply-types/:id : delete the "id" supplyType.
     *
     * @param id the id of the supplyType to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/supply-types/{id}")
    @Timed
    public ResponseEntity<Void> deleteSupplyType(@PathVariable Long id) {
        log.debug("REST request to delete SupplyType : {}", id);
        supplyTypeRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
