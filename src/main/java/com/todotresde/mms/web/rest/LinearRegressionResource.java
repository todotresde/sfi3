package com.todotresde.mms.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.todotresde.mms.domain.LinearRegression;
import com.todotresde.mms.domain.Tracer;
import com.todotresde.mms.repository.LinearRegressionRepository;
import com.todotresde.mms.service.LinearRegressionService;
import com.todotresde.mms.web.rest.errors.BadRequestAlertException;
import com.todotresde.mms.web.rest.util.HeaderUtil;
import com.todotresde.mms.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing LinearRegression.
 */
@RestController
@RequestMapping("/api")
public class LinearRegressionResource {

    private final Logger log = LoggerFactory.getLogger(LinearRegressionResource.class);

    private static final String ENTITY_NAME = "linearRegression";

    private final LinearRegressionRepository linearRegressionRepository;
    private final LinearRegressionService linearRegressionService;

    public LinearRegressionResource(LinearRegressionRepository linearRegressionRepository, LinearRegressionService linearRegressionService) {
        this.linearRegressionRepository = linearRegressionRepository;
        this.linearRegressionService = linearRegressionService;
    }

    /**
     * POST  /linear-regressions : Create a new linearRegression.
     *
     * @param linearRegression the linearRegression to create
     * @return the ResponseEntity with status 201 (Created) and with body the new linearRegression, or with status 400 (Bad Request) if the linearRegression has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/linear-regressions")
    @Timed
    public ResponseEntity<LinearRegression> createLinearRegression(@Valid @RequestBody LinearRegression linearRegression) throws URISyntaxException {
        log.debug("REST request to save LinearRegression : {}", linearRegression);
        if (linearRegression.getId() != null) {
            throw new BadRequestAlertException("A new linearRegression cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LinearRegression result = linearRegressionRepository.save(linearRegression);
        return ResponseEntity.created(new URI("/api/linear-regressions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /linear-regressions : Updates an existing linearRegression.
     *
     * @param linearRegression the linearRegression to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated linearRegression,
     * or with status 400 (Bad Request) if the linearRegression is not valid,
     * or with status 500 (Internal Server Error) if the linearRegression couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/linear-regressions")
    @Timed
    public ResponseEntity<LinearRegression> updateLinearRegression(@Valid @RequestBody LinearRegression linearRegression) throws URISyntaxException {
        log.debug("REST request to update LinearRegression : {}", linearRegression);
        if (linearRegression.getId() == null) {
            return createLinearRegression(linearRegression);
        }
        LinearRegression result = linearRegressionRepository.save(linearRegression);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, linearRegression.getId().toString()))
            .body(result);
    }

    /**
     * GET  /linear-regressions : get all the linearRegressions.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of linearRegressions in body
     */
    @GetMapping("/linear-regressions")
    @Timed
    public ResponseEntity<List<LinearRegression>> getAllLinearRegressions(Pageable pageable) {
        log.debug("REST request to get a page of LinearRegressions");
        Page<LinearRegression> page = linearRegressionRepository.findAllGrouped(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/linear-regressions");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /linear-regressions/:id : get the "id" linearRegression.
     *
     * @param id the id of the linearRegression to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the linearRegression, or with status 404 (Not Found)
     */
    @GetMapping("/linear-regressions/{id}")
    @Timed
    public ResponseEntity<LinearRegression> getLinearRegression(@PathVariable Long id) {
        log.debug("REST request to get LinearRegression : {}", id);
        LinearRegression linearRegression = linearRegressionRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(linearRegression));
    }

    /**
     * GET  /linear-regressions/bygroup/:lineId/:workStationConfigId/:workStationId/:employeeId : get the "id" linearRegression.
     *
     * @param lineId the id of the linearRegression to retrieve
     * @param workStationConfigId the id of the linearRegression to retrieve
     * @param workStationId the id of the linearRegression to retrieve
     * @param employeeId the id of the linearRegression to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the linearRegression, or with status 404 (Not Found)
     */
    @GetMapping("/linear-regressions/bygroup/{lineId}/{workStationConfigId}/{workStationId}/{employeeId}")
    @Timed
    public ResponseEntity<List<LinearRegression>> getLinearRegression(@PathVariable Long lineId, @PathVariable Long workStationConfigId, @PathVariable Long workStationId, @PathVariable Long employeeId) {
        log.debug("REST request to get LinearRegression : {}", lineId, workStationConfigId, workStationId, employeeId);
        List<LinearRegression> linearRegressions = linearRegressionService.findByLineAndWorkStationConfigAndWorkStationAndEmployee(lineId, workStationConfigId, workStationId, employeeId);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(linearRegressions));
    }

    /**
     * GET  /linear-regressions/tracers/:id : get all the tracers for linearRegressions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of linearRegressions in body
     */
    @GetMapping("/linear-regressions/tracers/{id}")
    @Timed
    public List<Tracer> getAllTracers(@PathVariable Long id) {
        log.debug("REST request to get a page of LinearRegressions");
        LinearRegression linearRegression = linearRegressionRepository.findOne(id);
        return linearRegressionService.findAllTracers(linearRegression);
    }

    /**
     * GET  /linear-regressions/tracers/bygroup/:lineId/:workStationConfigId/:workStationId/:employeeId : get all the tracers for linearRegressions.
     *
     * @param lineId the id of the linearRegression to retrieve
     * @param workStationConfigId the id of the linearRegression to retrieve
     * @param workStationId the id of the linearRegression to retrieve
     * @param employeeId the id of the linearRegression to retrieve
     *
     * @return the ResponseEntity with status 200 (OK) and the list of linearRegressions in body
     */
    @GetMapping("/linear-regressions/tracers/bygroup/{lineId}/{workStationConfigId}/{workStationId}/{employeeId}")
    @Timed
    public List<Tracer> getAllTracers(@PathVariable Long lineId, @PathVariable Long workStationConfigId, @PathVariable Long workStationId, @PathVariable Long employeeId) {
        log.debug("REST request to get a page of LinearRegressions");
        return linearRegressionService.findAllTracersByLineAndWorkStationConfigAndWorkStationAndEmployee(lineId, workStationConfigId, workStationId, employeeId);
    }

    /**
     * GET  /linear-regressions/generate : generate all linearRegression.
     *
     * @return the ResponseEntity with status 200 (OK) and with body the linearRegression, or with status 404 (Not Found)
     */
    @GetMapping("/linear-regressions/generate")
    @Timed
    public List<LinearRegression> generateLinearRegressions() {
        log.debug("REST request to generate LinearRegressions : {}");
        List<LinearRegression> linearRegressions = linearRegressionService.generate();
        return linearRegressions;
    }

    /**
     * DELETE  /linear-regressions/:id : delete the "id" linearRegression.
     *
     * @param id the id of the linearRegression to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/linear-regressions/{id}")
    @Timed
    public ResponseEntity<Void> deleteLinearRegression(@PathVariable Long id) {
        log.debug("REST request to delete LinearRegression : {}", id);
        linearRegressionRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
