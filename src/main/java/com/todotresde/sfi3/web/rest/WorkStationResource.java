package com.todotresde.sfi3.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.todotresde.sfi3.domain.WorkStation;

import com.todotresde.sfi3.repository.WorkStationRepository;
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
 * REST controller for managing WorkStation.
 */
@RestController
@RequestMapping("/api")
public class WorkStationResource {

    private final Logger log = LoggerFactory.getLogger(WorkStationResource.class);

    private static final String ENTITY_NAME = "workStation";

    private final WorkStationRepository workStationRepository;

    public WorkStationResource(WorkStationRepository workStationRepository) {
        this.workStationRepository = workStationRepository;
    }

    /**
     * POST  /work-stations : Create a new workStation.
     *
     * @param workStation the workStation to create
     * @return the ResponseEntity with status 201 (Created) and with body the new workStation, or with status 400 (Bad Request) if the workStation has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/work-stations")
    @Timed
    public ResponseEntity<WorkStation> createWorkStation(@Valid @RequestBody WorkStation workStation) throws URISyntaxException {
        log.debug("REST request to save WorkStation : {}", workStation);
        if (workStation.getId() != null) {
            throw new BadRequestAlertException("A new workStation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        WorkStation result = workStationRepository.save(workStation);
        return ResponseEntity.created(new URI("/api/work-stations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /work-stations : Updates an existing workStation.
     *
     * @param workStation the workStation to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated workStation,
     * or with status 400 (Bad Request) if the workStation is not valid,
     * or with status 500 (Internal Server Error) if the workStation couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/work-stations")
    @Timed
    public ResponseEntity<WorkStation> updateWorkStation(@Valid @RequestBody WorkStation workStation) throws URISyntaxException {
        log.debug("REST request to update WorkStation : {}", workStation);
        if (workStation.getId() == null) {
            return createWorkStation(workStation);
        }
        WorkStation result = workStationRepository.save(workStation);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, workStation.getId().toString()))
            .body(result);
    }

    /**
     * GET  /work-stations : get all the workStations.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of workStations in body
     */
    @GetMapping("/work-stations")
    @Timed
    public List<WorkStation> getAllWorkStations() {
        log.debug("REST request to get all WorkStations");
        return workStationRepository.findAll();
        }

    /**
     * GET  /work-stations/:id : get the "id" workStation.
     *
     * @param id the id of the workStation to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the workStation, or with status 404 (Not Found)
     */
    @GetMapping("/work-stations/{id}")
    @Timed
    public ResponseEntity<WorkStation> getWorkStation(@PathVariable Long id) {
        log.debug("REST request to get WorkStation : {}", id);
        WorkStation workStation = workStationRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(workStation));
    }

    /**
     * DELETE  /work-stations/:id : delete the "id" workStation.
     *
     * @param id the id of the workStation to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/work-stations/{id}")
    @Timed
    public ResponseEntity<Void> deleteWorkStation(@PathVariable Long id) {
        log.debug("REST request to delete WorkStation : {}", id);
        workStationRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
