package com.todotresde.sfi3.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.todotresde.sfi3.domain.SupplyTypeAttrValue;
import com.todotresde.sfi3.domain.Tracer;

import com.todotresde.sfi3.domain.WorkStation;
import com.todotresde.sfi3.repository.TracerRepository;
import com.todotresde.sfi3.repository.WorkStationRepository;
import com.todotresde.sfi3.service.LineService;
import com.todotresde.sfi3.service.TracerService;
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
import java.util.Set;

/**
 * REST controller for managing Tracer.
 */
@RestController
@RequestMapping("/api")
public class TracerResource {

    private final Logger log = LoggerFactory.getLogger(TracerResource.class);

    private static final String ENTITY_NAME = "tracer";

    private final TracerRepository tracerRepository;
    private final WorkStationRepository workStationRepository;

    private final TracerService tracerService;
    private final LineService lineService;

    public TracerResource(TracerRepository tracerRepository, WorkStationRepository workStationRepository, TracerService tracerService, LineService lineService) {
        this.tracerRepository = tracerRepository;
        this.workStationRepository = workStationRepository;
        this.tracerService = tracerService;
        this.lineService = lineService;
    }

    /**
     * POST  /tracers : Create a new tracer.
     *
     * @param tracer the tracer to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tracer, or with status 400 (Bad Request) if the tracer has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tracers")
    @Timed
    public ResponseEntity<Tracer> createTracer(@Valid @RequestBody Tracer tracer) throws URISyntaxException {
        log.debug("REST request to save Tracer : {}", tracer);
        if (tracer.getId() != null) {
            throw new BadRequestAlertException("A new tracer cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Tracer result = tracerRepository.save(tracer);
        return ResponseEntity.created(new URI("/api/tracers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tracers : Updates an existing tracer.
     *
     * @param tracer the tracer to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tracer,
     * or with status 400 (Bad Request) if the tracer is not valid,
     * or with status 500 (Internal Server Error) if the tracer couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tracers")
    @Timed
    public ResponseEntity<Tracer> updateTracer(@Valid @RequestBody Tracer tracer) throws URISyntaxException {
        log.debug("REST request to update Tracer : {}", tracer);
        if (tracer.getId() == null) {
            return createTracer(tracer);
        }
        Tracer result = tracerRepository.save(tracer);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tracer.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tracers : get all the tracers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tracers in body
     */
    @GetMapping("/tracers")
    @Timed
    public List<Tracer> getAllTracers() {
        log.debug("REST request to get all Tracers");
        return tracerRepository.findAll();
        }

    /**
     * GET  /tracers/workStationIP/:ip : get all the tracers by WorkStation IP.
     *
     * @param ip the ip of the workstation
     * @return the ResponseEntity with status 200 (OK) and the list of tracers in body
     */
    @GetMapping("/tracers/workStationIP/{ip}")
    @Timed
    public List<Tracer> getAllTracersByWorkStationIP(@PathVariable String ip) {
        log.debug("REST request to get all Tracers by WorkStation IP");
        WorkStation workStation = workStationRepository.findByIp(ip);
        return tracerRepository.findByWorkStationAndStatus(workStation,0);
    }

    /**
     * POST  /tracers/sendFromWorkStationIP/:ip : Create a new tracer.
     *
     * @param ip the ip of the workstation
     * @param tracer the tracer to move
     * @return the ResponseEntity with status 201 (Created) and with body the new tracer, or with status 400 (Bad Request) if the tracer has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tracers/sendFromWorkStationIP/{ip}")
    @Timed
    public ResponseEntity<Tracer> sendFromWorkStationIP(@PathVariable String ip, @Valid @RequestBody Tracer tracer) throws URISyntaxException {
        log.debug("REST request to move Tracer : {}", tracer);
        if (tracer.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new tracer cannot already have an ID")).body(null);
        }
        Tracer result = this.lineService.sendFromWorkStationIP(ip, tracer);

        return ResponseEntity.created(new URI("/api/tracers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * POST  /tracers/send : Create a new tracer.
     *
     * @param tracer the tracer to move
     * @return the ResponseEntity with status 201 (Created) and with body the new tracer, or with status 400 (Bad Request) if the tracer has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tracers/send")
    @Timed
    public ResponseEntity<Tracer> send(@Valid @RequestBody Tracer tracer) throws URISyntaxException {
        log.debug("REST request to send Tracer : {}", tracer);
        Tracer result = this.lineService.send(tracer);

        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tracer.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tracers/:id : get the "id" tracer.
     *
     * @param id the id of the tracer to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tracer, or with status 404 (Not Found)
     */
    @GetMapping("/tracers/{id}")
    @Timed
    public ResponseEntity<Tracer> getTracer(@PathVariable Long id) {
        log.debug("REST request to get Tracer : {}", id);
        Tracer tracer = tracerRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(tracer));
    }

    /**
     * DELETE  /tracers/:id : delete the "id" tracer.
     *
     * @param id the id of the tracer to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tracers/{id}")
    @Timed
    public ResponseEntity<Void> deleteTracer(@PathVariable Long id) {
        log.debug("REST request to delete Tracer : {}", id);
        tracerRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
