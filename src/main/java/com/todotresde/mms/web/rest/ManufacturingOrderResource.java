package com.todotresde.mms.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.todotresde.mms.domain.ManufacturingOrder;

import com.todotresde.mms.repository.ManufacturingOrderRepository;
import com.todotresde.mms.service.ManufacturingOrderService;
import com.todotresde.mms.service.dto.ManufacturingOrderDTO;
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
 * REST controller for managing ManufacturingOrder.
 */
@RestController
@RequestMapping("/api")
public class ManufacturingOrderResource {

    private final Logger log = LoggerFactory.getLogger(ManufacturingOrderResource.class);

    private static final String ENTITY_NAME = "manufacturingOrder";

    private final ManufacturingOrderRepository manufacturingOrderRepository;

    private final ManufacturingOrderService manufacturingOrderService;

    public ManufacturingOrderResource(ManufacturingOrderRepository manufacturingOrderRepository, ManufacturingOrderService manufacturingOrderService) {
        this.manufacturingOrderRepository = manufacturingOrderRepository;
        this.manufacturingOrderService = manufacturingOrderService;
    }

    /**
     * POST  /manufacturing-orders : Create a new manufacturingOrder.
     *
     * @param manufacturingOrder the manufacturingOrder to create
     * @return the ResponseEntity with status 201 (Created) and with body the new manufacturingOrder, or with status 400 (Bad Request) if the manufacturingOrder has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/manufacturing-orders")
    @Timed
    public ResponseEntity<ManufacturingOrder> createManufacturingOrder(@Valid @RequestBody ManufacturingOrder manufacturingOrder) throws URISyntaxException {
        log.debug("REST request to save ManufacturingOrder : {}", manufacturingOrder);
        if (manufacturingOrder.getId() != null) {
            throw new BadRequestAlertException("A new manufacturingOrder cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ManufacturingOrder result = manufacturingOrderRepository.save(manufacturingOrder);
        return ResponseEntity.created(new URI("/api/manufacturing-orders/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * POST  /manufacturing-orders/products : Create a new manufacturingOrder with Products.
     *
     * @param manufacturingOrderDTO the manufacturingOrder to create
     * @return the ResponseEntity with status 201 (Created) and with body the new manufacturingOrder, or with status 400 (Bad Request) if the manufacturingOrder has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/manufacturing-orders/products")
    @Timed
    public ResponseEntity<ManufacturingOrder> createManufacturingOrderWithProducts(@Valid @RequestBody ManufacturingOrderDTO manufacturingOrderDTO) throws URISyntaxException {
        log.debug("REST request to save ManufacturingOrder with Products : {}", manufacturingOrderDTO.getManufacturingOrder());
        if (manufacturingOrderDTO.getManufacturingOrder().getId() != null) {
            throw new BadRequestAlertException("A new manufacturingOrder cannot already have an ID", ENTITY_NAME, "idexists");
        }

        ManufacturingOrder result = manufacturingOrderService.saveWithProductsAndSTAttributeValues(manufacturingOrderDTO.getManufacturingOrder(), manufacturingOrderDTO.getProducts(), manufacturingOrderDTO.getSupplyTypeAttrValues());
        return ResponseEntity.created(new URI("/api/manufacturing-orders/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /manufacturing-orders : Updates an existing manufacturingOrder.
     *
     * @param manufacturingOrder the manufacturingOrder to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated manufacturingOrder,
     * or with status 400 (Bad Request) if the manufacturingOrder is not valid,
     * or with status 500 (Internal Server Error) if the manufacturingOrder couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/manufacturing-orders")
    @Timed
    public ResponseEntity<ManufacturingOrder> updateManufacturingOrder(@Valid @RequestBody ManufacturingOrder manufacturingOrder) throws URISyntaxException {
        log.debug("REST request to update ManufacturingOrder : {}", manufacturingOrder);
        if (manufacturingOrder.getId() == null) {
            return createManufacturingOrder(manufacturingOrder);
        }
        ManufacturingOrder result = manufacturingOrderRepository.save(manufacturingOrder);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, manufacturingOrder.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /manufacturing-orders/products : Updates an existing manufacturingOrder.
     *
     * @param manufacturingOrderDTO the manufacturingOrder to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated manufacturingOrder,
     * or with status 400 (Bad Request) if the manufacturingOrder is not valid,
     * or with status 500 (Internal Server Error) if the manufacturingOrder couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/manufacturing-orders/products")
    @Timed
    public ResponseEntity<ManufacturingOrder> updateManufacturingOrderWithProducts(@Valid @RequestBody ManufacturingOrderDTO manufacturingOrderDTO) throws URISyntaxException {
        log.debug("REST request to update ManufacturingOrder with Products : {}", manufacturingOrderDTO.getManufacturingOrder());
        if (manufacturingOrderDTO.getManufacturingOrder().getId() == null) {
            return createManufacturingOrderWithProducts(manufacturingOrderDTO);
        }
        ManufacturingOrder result = manufacturingOrderService.updateWithProductsAndSTAttributeValues(manufacturingOrderDTO.getManufacturingOrder(), manufacturingOrderDTO.getProducts(), manufacturingOrderDTO.getSupplyTypeAttrValues());
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, manufacturingOrderDTO.getManufacturingOrder().getId().toString()))
            .body(result);
    }

    /**
     * GET  /manufacturing-orders : get all the manufacturingOrders.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of manufacturingOrders in body
     */
    @GetMapping("/manufacturing-orders")
    @Timed
    public ResponseEntity<List<ManufacturingOrder>> getAllManufacturingOrders(Pageable pageable) {
        log.debug("REST request to get a page of ManufacturingOrders");
        Page<ManufacturingOrder> page = manufacturingOrderRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/paginados");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
        }

    /**
     * GET  /manufacturing-orders/:id : get the "id" manufacturingOrder.
     *
     * @param id the id of the manufacturingOrder to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the manufacturingOrder, or with status 404 (Not Found)
     */
    @GetMapping("/manufacturing-orders/{id}")
    @Timed
    public ResponseEntity<ManufacturingOrder> getManufacturingOrder(@PathVariable Long id) {
        log.debug("REST request to get ManufacturingOrder : {}", id);
        ManufacturingOrder manufacturingOrder = manufacturingOrderRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(manufacturingOrder));
    }

    /**
     * GET  /manufacturing-orders/:id/products : get ManufacturingOrderDTO by the "id" manufacturingOrder.
     *
     * @param id the id of the manufacturingOrder to retrieve ManufacturingOrderDTO
     * @return the ResponseEntity with status 200 (OK) and with body the manufacturingOrder, or with status 404 (Not Found)
     */
    @GetMapping("/manufacturing-orders/{id}/products")
    @Timed
    public ResponseEntity<ManufacturingOrderDTO> getManufacturingOrderWithProducts(@PathVariable Long id) {
        log.debug("REST request to get ManufacturingOrderDTO : {}", id);
        ManufacturingOrderDTO manufacturingOrderDTO = manufacturingOrderService.findOneFull(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(manufacturingOrderDTO));
    }

    /**
     * GET  /manufacturing-orders/:id/time : get the time in seconds to finish it by the "id" manufacturingOrder.
     *
     * @param id the id of the manufacturingOrder to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the manufacturingOrder, or with status 404 (Not Found)
     */
    @GetMapping("/manufacturing-orders/{id}/time")
    @Timed
    public ResponseEntity<Integer> getManufacturingOrderTimeToFinish(@PathVariable Long id) {
        log.debug("REST request to the time in seconds to finish the manufacturingOrder : {}", id);
        Integer time = manufacturingOrderService.getTimeToFinish(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(time));
    }

    /**
     * GET  /manufacturing-order/:id : Send a manufacturingOrder to build.
     *
     * @param id the id of the manufacturingOrder to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the manufacturingOrder, or with status 404 (Not Found)
     */
    @GetMapping("/manufacturing-orders/send/{id}")
    @Timed
    public ResponseEntity<ManufacturingOrder> sendManufacturingOrder(@PathVariable Long id) {
        log.debug("REST request to get ManufacturingOrder : {}", id);
        ManufacturingOrder manufacturingOrder = manufacturingOrderService.send(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(manufacturingOrder));
    }

    /**
     * DELETE  /manufacturing-orders/:id : delete the "id" manufacturingOrder.
     *
     * @param id the id of the manufacturingOrder to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/manufacturing-orders/{id}")
    @Timed
    public ResponseEntity<Void> deleteManufacturingOrder(@PathVariable Long id) {
        log.debug("REST request to delete ManufacturingOrder : {}", id);
        manufacturingOrderRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
