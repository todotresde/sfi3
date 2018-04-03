package com.todotresde.mms.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.todotresde.mms.domain.SupplyTypeAttr;

import com.todotresde.mms.repository.SupplyTypeAttrRepository;
import com.todotresde.mms.web.rest.errors.BadRequestAlertException;
import com.todotresde.mms.web.rest.util.HeaderUtil;
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
 * REST controller for managing SupplyTypeAttr.
 */
@RestController
@RequestMapping("/api")
public class SupplyTypeAttrResource {

    private final Logger log = LoggerFactory.getLogger(SupplyTypeAttrResource.class);

    private static final String ENTITY_NAME = "supplyTypeAttr";

    private final SupplyTypeAttrRepository supplyTypeAttrRepository;

    public SupplyTypeAttrResource(SupplyTypeAttrRepository supplyTypeAttrRepository) {
        this.supplyTypeAttrRepository = supplyTypeAttrRepository;
    }

    /**
     * POST  /supply-type-attrs : Create a new supplyTypeAttr.
     *
     * @param supplyTypeAttr the supplyTypeAttr to create
     * @return the ResponseEntity with status 201 (Created) and with body the new supplyTypeAttr, or with status 400 (Bad Request) if the supplyTypeAttr has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/supply-type-attrs")
    @Timed
    public ResponseEntity<SupplyTypeAttr> createSupplyTypeAttr(@Valid @RequestBody SupplyTypeAttr supplyTypeAttr) throws URISyntaxException {
        log.debug("REST request to save SupplyTypeAttr : {}", supplyTypeAttr);
        if (supplyTypeAttr.getId() != null) {
            throw new BadRequestAlertException("A new supplyTypeAttr cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SupplyTypeAttr result = supplyTypeAttrRepository.save(supplyTypeAttr);
        return ResponseEntity.created(new URI("/api/supply-type-attrs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /supply-type-attrs : Updates an existing supplyTypeAttr.
     *
     * @param supplyTypeAttr the supplyTypeAttr to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated supplyTypeAttr,
     * or with status 400 (Bad Request) if the supplyTypeAttr is not valid,
     * or with status 500 (Internal Server Error) if the supplyTypeAttr couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/supply-type-attrs")
    @Timed
    public ResponseEntity<SupplyTypeAttr> updateSupplyTypeAttr(@Valid @RequestBody SupplyTypeAttr supplyTypeAttr) throws URISyntaxException {
        log.debug("REST request to update SupplyTypeAttr : {}", supplyTypeAttr);
        if (supplyTypeAttr.getId() == null) {
            return createSupplyTypeAttr(supplyTypeAttr);
        }
        SupplyTypeAttr result = supplyTypeAttrRepository.save(supplyTypeAttr);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, supplyTypeAttr.getId().toString()))
            .body(result);
    }

    /**
     * GET  /supply-type-attrs : get all the supplyTypeAttrs.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of supplyTypeAttrs in body
     */
    @GetMapping("/supply-type-attrs")
    @Timed
    public List<SupplyTypeAttr> getAllSupplyTypeAttrs() {
        log.debug("REST request to get all SupplyTypeAttrs");
        return supplyTypeAttrRepository.findAll();
        }

    /**
     * GET  /supply-type-attrs/:id : get the "id" supplyTypeAttr.
     *
     * @param id the id of the supplyTypeAttr to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the supplyTypeAttr, or with status 404 (Not Found)
     */
    @GetMapping("/supply-type-attrs/{id}")
    @Timed
    public ResponseEntity<SupplyTypeAttr> getSupplyTypeAttr(@PathVariable Long id) {
        log.debug("REST request to get SupplyTypeAttr : {}", id);
        SupplyTypeAttr supplyTypeAttr = supplyTypeAttrRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(supplyTypeAttr));
    }

    /**
     * DELETE  /supply-type-attrs/:id : delete the "id" supplyTypeAttr.
     *
     * @param id the id of the supplyTypeAttr to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/supply-type-attrs/{id}")
    @Timed
    public ResponseEntity<Void> deleteSupplyTypeAttr(@PathVariable Long id) {
        log.debug("REST request to delete SupplyTypeAttr : {}", id);
        supplyTypeAttrRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
