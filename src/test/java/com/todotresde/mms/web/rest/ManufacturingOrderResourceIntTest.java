package com.todotresde.mms.web.rest;

import com.todotresde.mms.MMSApp;

import com.todotresde.mms.domain.ManufacturingOrder;
import com.todotresde.mms.repository.ManufacturingOrderRepository;
import com.todotresde.mms.service.ManufacturingOrderService;
import com.todotresde.mms.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static com.todotresde.mms.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ManufacturingOrderResource REST controller.
 *
 * @see ManufacturingOrderResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MMSApp.class)
public class ManufacturingOrderResourceIntTest {

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final Instant DEFAULT_ORDER_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_ORDER_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Integer DEFAULT_STATUS = 1;
    private static final Integer UPDATED_STATUS = 2;

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private ManufacturingOrderRepository manufacturingOrderRepository;

    @Autowired
    ManufacturingOrderService manufacturingOrderService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restManufacturingOrderMockMvc;

    private ManufacturingOrder manufacturingOrder;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ManufacturingOrderResource manufacturingOrderResource = new ManufacturingOrderResource(manufacturingOrderRepository, manufacturingOrderService);
        this.restManufacturingOrderMockMvc = MockMvcBuilders.standaloneSetup(manufacturingOrderResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ManufacturingOrder createEntity(EntityManager em) {
        ManufacturingOrder manufacturingOrder = new ManufacturingOrder()
            .code(DEFAULT_CODE)
            .orderDate(DEFAULT_ORDER_DATE)
            .status(DEFAULT_STATUS)
            .description(DEFAULT_NAME);
        return manufacturingOrder;
    }

    @Before
    public void initTest() {
        manufacturingOrder = createEntity(em);
    }

    @Test
    @Transactional
    public void createManufacturingOrder() throws Exception {
        int databaseSizeBeforeCreate = manufacturingOrderRepository.findAll().size();

        // Create the ManufacturingOrder
        restManufacturingOrderMockMvc.perform(post("/api/manufacturing-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(manufacturingOrder)))
            .andExpect(status().isCreated());

        // Validate the ManufacturingOrder in the database
        List<ManufacturingOrder> manufacturingOrderList = manufacturingOrderRepository.findAll();
        assertThat(manufacturingOrderList).hasSize(databaseSizeBeforeCreate + 1);
        ManufacturingOrder testManufacturingOrder = manufacturingOrderList.get(manufacturingOrderList.size() - 1);
        assertThat(testManufacturingOrder.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testManufacturingOrder.getOrderDate()).isEqualTo(DEFAULT_ORDER_DATE);
        assertThat(testManufacturingOrder.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testManufacturingOrder.getDescription()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createManufacturingOrderWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = manufacturingOrderRepository.findAll().size();

        // Create the ManufacturingOrder with an existing ID
        manufacturingOrder.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restManufacturingOrderMockMvc.perform(post("/api/manufacturing-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(manufacturingOrder)))
            .andExpect(status().isBadRequest());

        // Validate the ManufacturingOrder in the database
        List<ManufacturingOrder> manufacturingOrderList = manufacturingOrderRepository.findAll();
        assertThat(manufacturingOrderList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = manufacturingOrderRepository.findAll().size();
        // set the field null
        manufacturingOrder.setCode(null);

        // Create the ManufacturingOrder, which fails.

        restManufacturingOrderMockMvc.perform(post("/api/manufacturing-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(manufacturingOrder)))
            .andExpect(status().isBadRequest());

        List<ManufacturingOrder> manufacturingOrderList = manufacturingOrderRepository.findAll();
        assertThat(manufacturingOrderList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkOrderDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = manufacturingOrderRepository.findAll().size();
        // set the field null
        manufacturingOrder.setOrderDate(null);

        // Create the ManufacturingOrder, which fails.

        restManufacturingOrderMockMvc.perform(post("/api/manufacturing-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(manufacturingOrder)))
            .andExpect(status().isBadRequest());

        List<ManufacturingOrder> manufacturingOrderList = manufacturingOrderRepository.findAll();
        assertThat(manufacturingOrderList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStatusIsRequired() throws Exception {
        int databaseSizeBeforeTest = manufacturingOrderRepository.findAll().size();
        // set the field null
        manufacturingOrder.setStatus(null);

        // Create the ManufacturingOrder, which fails.

        restManufacturingOrderMockMvc.perform(post("/api/manufacturing-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(manufacturingOrder)))
            .andExpect(status().isBadRequest());

        List<ManufacturingOrder> manufacturingOrderList = manufacturingOrderRepository.findAll();
        assertThat(manufacturingOrderList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllManufacturingOrders() throws Exception {
        // Initialize the database
        manufacturingOrderRepository.saveAndFlush(manufacturingOrder);

        // Get all the manufacturingOrderList
        restManufacturingOrderMockMvc.perform(get("/api/manufacturing-orders?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(manufacturingOrder.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())))
            .andExpect(jsonPath("$.[*].orderDate").value(hasItem(DEFAULT_ORDER_DATE.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS)))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getManufacturingOrder() throws Exception {
        // Initialize the database
        manufacturingOrderRepository.saveAndFlush(manufacturingOrder);

        // Get the manufacturingOrder
        restManufacturingOrderMockMvc.perform(get("/api/manufacturing-orders/{id}", manufacturingOrder.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(manufacturingOrder.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()))
            .andExpect(jsonPath("$.orderDate").value(DEFAULT_ORDER_DATE.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingManufacturingOrder() throws Exception {
        // Get the manufacturingOrder
        restManufacturingOrderMockMvc.perform(get("/api/manufacturing-orders/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateManufacturingOrder() throws Exception {
        // Initialize the database
        manufacturingOrderRepository.saveAndFlush(manufacturingOrder);
        int databaseSizeBeforeUpdate = manufacturingOrderRepository.findAll().size();

        // Update the manufacturingOrder
        ManufacturingOrder updatedManufacturingOrder = manufacturingOrderRepository.findOne(manufacturingOrder.getId());
        // Disconnect from session so that the updates on updatedManufacturingOrder are not directly saved in db
        em.detach(updatedManufacturingOrder);
        updatedManufacturingOrder
            .code(UPDATED_CODE)
            .orderDate(UPDATED_ORDER_DATE)
            .status(UPDATED_STATUS)
            .description(UPDATED_NAME);

        restManufacturingOrderMockMvc.perform(put("/api/manufacturing-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedManufacturingOrder)))
            .andExpect(status().isOk());

        // Validate the ManufacturingOrder in the database
        List<ManufacturingOrder> manufacturingOrderList = manufacturingOrderRepository.findAll();
        assertThat(manufacturingOrderList).hasSize(databaseSizeBeforeUpdate);
        ManufacturingOrder testManufacturingOrder = manufacturingOrderList.get(manufacturingOrderList.size() - 1);
        assertThat(testManufacturingOrder.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testManufacturingOrder.getOrderDate()).isEqualTo(UPDATED_ORDER_DATE);
        assertThat(testManufacturingOrder.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testManufacturingOrder.getDescription()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingManufacturingOrder() throws Exception {
        int databaseSizeBeforeUpdate = manufacturingOrderRepository.findAll().size();

        // Create the ManufacturingOrder

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restManufacturingOrderMockMvc.perform(put("/api/manufacturing-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(manufacturingOrder)))
            .andExpect(status().isCreated());

        // Validate the ManufacturingOrder in the database
        List<ManufacturingOrder> manufacturingOrderList = manufacturingOrderRepository.findAll();
        assertThat(manufacturingOrderList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteManufacturingOrder() throws Exception {
        // Initialize the database
        manufacturingOrderRepository.saveAndFlush(manufacturingOrder);
        int databaseSizeBeforeDelete = manufacturingOrderRepository.findAll().size();

        // Get the manufacturingOrder
        restManufacturingOrderMockMvc.perform(delete("/api/manufacturing-orders/{id}", manufacturingOrder.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ManufacturingOrder> manufacturingOrderList = manufacturingOrderRepository.findAll();
        assertThat(manufacturingOrderList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ManufacturingOrder.class);
        ManufacturingOrder manufacturingOrder1 = new ManufacturingOrder();
        manufacturingOrder1.setId(1L);
        ManufacturingOrder manufacturingOrder2 = new ManufacturingOrder();
        manufacturingOrder2.setId(manufacturingOrder1.getId());
        assertThat(manufacturingOrder1).isEqualTo(manufacturingOrder2);
        manufacturingOrder2.setId(2L);
        assertThat(manufacturingOrder1).isNotEqualTo(manufacturingOrder2);
        manufacturingOrder1.setId(null);
        assertThat(manufacturingOrder1).isNotEqualTo(manufacturingOrder2);
    }
}
