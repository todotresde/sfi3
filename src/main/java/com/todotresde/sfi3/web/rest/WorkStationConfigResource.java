package com.todotresde.sfi3.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.todotresde.sfi3.domain.WorkStationConfig;

import com.todotresde.sfi3.repository.WorkStationConfigRepository;
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
 * REST controller for managing WorkStationConfig.
 */
@RestController
@RequestMapping("/api")
public class WorkStationConfigResource {

    private final Logger log = LoggerFactory.getLogger(WorkStationConfigResource.class);

    private static final String ENTITY_NAME = "workStationConfig";

    private final WorkStationConfigRepository workStationConfigRepository;

    public WorkStationConfigResource(WorkStationConfigRepository workStationConfigRepository) {
        this.workStationConfigRepository = workStationConfigRepository;
    }

    /**
     * POST  /work-station-configs : Create a new workStationConfig.
     *
     * @param workStationConfig the workStationConfig to create
     * @return the ResponseEntity with status 201 (Created) and with body the new workStationConfig, or with status 400 (Bad Request) if the workStationConfig has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/work-station-configs")
    @Timed
    public ResponseEntity<WorkStationConfig> createWorkStationConfig(@Valid @RequestBody WorkStationConfig workStationConfig) throws URISyntaxException {
        log.debug("REST request to save WorkStationConfig : {}", workStationConfig);
        if (workStationConfig.getId() != null) {
            throw new BadRequestAlertException("A new workStationConfig cannot already have an ID", ENTITY_NAME, "idexists");
        }
        WorkStationConfig result = workStationConfigRepository.save(workStationConfig);
        return ResponseEntity.created(new URI("/api/work-station-configs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /work-station-configs : Updates an existing workStationConfig.
     *
     * @param workStationConfig the workStationConfig to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated workStationConfig,
     * or with status 400 (Bad Request) if the workStationConfig is not valid,
     * or with status 500 (Internal Server Error) if the workStationConfig couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/work-station-configs")
    @Timed
    public ResponseEntity<WorkStationConfig> updateWorkStationConfig(@Valid @RequestBody WorkStationConfig workStationConfig) throws URISyntaxException {
        log.debug("REST request to update WorkStationConfig : {}", workStationConfig);
        if (workStationConfig.getId() == null) {
            return createWorkStationConfig(workStationConfig);
        }
        WorkStationConfig result = workStationConfigRepository.save(workStationConfig);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, workStationConfig.getId().toString()))
            .body(result);
    }

    /**
     * GET  /work-station-configs : get all the workStationConfigs.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of workStationConfigs in body
     */
    @GetMapping("/work-station-configs")
    @Timed
    public List<WorkStationConfig> getAllWorkStationConfigs() {
        log.debug("REST request to get all WorkStationConfigs");
        return workStationConfigRepository.findAllWithEagerRelationships();
        }

    /**
     * GET  /work-station-configs/:id : get the "id" workStationConfig.
     *
     * @param id the id of the workStationConfig to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the workStationConfig, or with status 404 (Not Found)
     */
    @GetMapping("/work-station-configs/{id}")
    @Timed
    public ResponseEntity<WorkStationConfig> getWorkStationConfig(@PathVariable Long id) {
        log.debug("REST request to get WorkStationConfig : {}", id);
        WorkStationConfig workStationConfig = workStationConfigRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(workStationConfig));
    }

    /**
     * DELETE  /work-station-configs/:id : delete the "id" workStationConfig.
     *
     * @param id the id of the workStationConfig to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/work-station-configs/{id}")
    @Timed
    public ResponseEntity<Void> deleteWorkStationConfig(@PathVariable Long id) {
        log.debug("REST request to delete WorkStationConfig : {}", id);
        workStationConfigRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
