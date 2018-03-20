package com.todotresde.sfi3.web.rest;

import com.todotresde.sfi3.Sfi3App;

import com.todotresde.sfi3.domain.Tracer;
import com.todotresde.sfi3.domain.WorkStationConfig;
import com.todotresde.sfi3.domain.ManufacturingOrder;
import com.todotresde.sfi3.domain.Line;
import com.todotresde.sfi3.domain.WorkStation;
import com.todotresde.sfi3.repository.TracerRepository;
import com.todotresde.sfi3.web.rest.errors.ExceptionTranslator;

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

import static com.todotresde.sfi3.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the TracerResource REST controller.
 *
 * @see TracerResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Sfi3App.class)
public class TracerResourceIntTest {

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final Instant DEFAULT_IN_TIME = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_IN_TIME = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_START_TIME = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_START_TIME = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_END_TIME = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_END_TIME = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Integer DEFAULT_TIME = 1;
    private static final Integer UPDATED_TIME = 2;

    private static final Integer DEFAULT_STATUS = 1;
    private static final Integer UPDATED_STATUS = 2;

    @Autowired
    private TracerRepository tracerRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTracerMockMvc;

    private Tracer tracer;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TracerResource tracerResource = new TracerResource(tracerRepository);
        this.restTracerMockMvc = MockMvcBuilders.standaloneSetup(tracerResource)
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
    public static Tracer createEntity(EntityManager em) {
        Tracer tracer = new Tracer()
            .code(DEFAULT_CODE)
            .inTime(DEFAULT_IN_TIME)
            .startTime(DEFAULT_START_TIME)
            .endTime(DEFAULT_END_TIME)
            .time(DEFAULT_TIME)
            .status(DEFAULT_STATUS);
        // Add required entity
        WorkStationConfig workStationConfig = WorkStationConfigResourceIntTest.createEntity(em);
        em.persist(workStationConfig);
        em.flush();
        tracer.setWorkStationConfig(workStationConfig);
        // Add required entity
        ManufacturingOrder manufacturingOrder = ManufacturingOrderResourceIntTest.createEntity(em);
        em.persist(manufacturingOrder);
        em.flush();
        tracer.setManufacturingOrder(manufacturingOrder);
        // Add required entity
        Line line = LineResourceIntTest.createEntity(em);
        em.persist(line);
        em.flush();
        tracer.setLine(line);
        // Add required entity
        WorkStation workStation = WorkStationResourceIntTest.createEntity(em);
        em.persist(workStation);
        em.flush();
        tracer.setWorkStation(workStation);
        return tracer;
    }

    @Before
    public void initTest() {
        tracer = createEntity(em);
    }

    @Test
    @Transactional
    public void createTracer() throws Exception {
        int databaseSizeBeforeCreate = tracerRepository.findAll().size();

        // Create the Tracer
        restTracerMockMvc.perform(post("/api/tracers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tracer)))
            .andExpect(status().isCreated());

        // Validate the Tracer in the database
        List<Tracer> tracerList = tracerRepository.findAll();
        assertThat(tracerList).hasSize(databaseSizeBeforeCreate + 1);
        Tracer testTracer = tracerList.get(tracerList.size() - 1);
        assertThat(testTracer.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testTracer.getInTime()).isEqualTo(DEFAULT_IN_TIME);
        assertThat(testTracer.getStartTime()).isEqualTo(DEFAULT_START_TIME);
        assertThat(testTracer.getEndTime()).isEqualTo(DEFAULT_END_TIME);
        assertThat(testTracer.getTime()).isEqualTo(DEFAULT_TIME);
        assertThat(testTracer.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void createTracerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tracerRepository.findAll().size();

        // Create the Tracer with an existing ID
        tracer.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTracerMockMvc.perform(post("/api/tracers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tracer)))
            .andExpect(status().isBadRequest());

        // Validate the Tracer in the database
        List<Tracer> tracerList = tracerRepository.findAll();
        assertThat(tracerList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = tracerRepository.findAll().size();
        // set the field null
        tracer.setCode(null);

        // Create the Tracer, which fails.

        restTracerMockMvc.perform(post("/api/tracers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tracer)))
            .andExpect(status().isBadRequest());

        List<Tracer> tracerList = tracerRepository.findAll();
        assertThat(tracerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkInTimeIsRequired() throws Exception {
        int databaseSizeBeforeTest = tracerRepository.findAll().size();
        // set the field null
        tracer.setInTime(null);

        // Create the Tracer, which fails.

        restTracerMockMvc.perform(post("/api/tracers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tracer)))
            .andExpect(status().isBadRequest());

        List<Tracer> tracerList = tracerRepository.findAll();
        assertThat(tracerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStatusIsRequired() throws Exception {
        int databaseSizeBeforeTest = tracerRepository.findAll().size();
        // set the field null
        tracer.setStatus(null);

        // Create the Tracer, which fails.

        restTracerMockMvc.perform(post("/api/tracers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tracer)))
            .andExpect(status().isBadRequest());

        List<Tracer> tracerList = tracerRepository.findAll();
        assertThat(tracerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTracers() throws Exception {
        // Initialize the database
        tracerRepository.saveAndFlush(tracer);

        // Get all the tracerList
        restTracerMockMvc.perform(get("/api/tracers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tracer.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())))
            .andExpect(jsonPath("$.[*].inTime").value(hasItem(DEFAULT_IN_TIME.toString())))
            .andExpect(jsonPath("$.[*].startTime").value(hasItem(DEFAULT_START_TIME.toString())))
            .andExpect(jsonPath("$.[*].endTime").value(hasItem(DEFAULT_END_TIME.toString())))
            .andExpect(jsonPath("$.[*].time").value(hasItem(DEFAULT_TIME)))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS)));
    }

    @Test
    @Transactional
    public void getTracer() throws Exception {
        // Initialize the database
        tracerRepository.saveAndFlush(tracer);

        // Get the tracer
        restTracerMockMvc.perform(get("/api/tracers/{id}", tracer.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tracer.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()))
            .andExpect(jsonPath("$.inTime").value(DEFAULT_IN_TIME.toString()))
            .andExpect(jsonPath("$.startTime").value(DEFAULT_START_TIME.toString()))
            .andExpect(jsonPath("$.endTime").value(DEFAULT_END_TIME.toString()))
            .andExpect(jsonPath("$.time").value(DEFAULT_TIME))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS));
    }

    @Test
    @Transactional
    public void getNonExistingTracer() throws Exception {
        // Get the tracer
        restTracerMockMvc.perform(get("/api/tracers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTracer() throws Exception {
        // Initialize the database
        tracerRepository.saveAndFlush(tracer);
        int databaseSizeBeforeUpdate = tracerRepository.findAll().size();

        // Update the tracer
        Tracer updatedTracer = tracerRepository.findOne(tracer.getId());
        // Disconnect from session so that the updates on updatedTracer are not directly saved in db
        em.detach(updatedTracer);
        updatedTracer
            .code(UPDATED_CODE)
            .inTime(UPDATED_IN_TIME)
            .startTime(UPDATED_START_TIME)
            .endTime(UPDATED_END_TIME)
            .time(UPDATED_TIME)
            .status(UPDATED_STATUS);

        restTracerMockMvc.perform(put("/api/tracers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTracer)))
            .andExpect(status().isOk());

        // Validate the Tracer in the database
        List<Tracer> tracerList = tracerRepository.findAll();
        assertThat(tracerList).hasSize(databaseSizeBeforeUpdate);
        Tracer testTracer = tracerList.get(tracerList.size() - 1);
        assertThat(testTracer.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testTracer.getInTime()).isEqualTo(UPDATED_IN_TIME);
        assertThat(testTracer.getStartTime()).isEqualTo(UPDATED_START_TIME);
        assertThat(testTracer.getEndTime()).isEqualTo(UPDATED_END_TIME);
        assertThat(testTracer.getTime()).isEqualTo(UPDATED_TIME);
        assertThat(testTracer.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingTracer() throws Exception {
        int databaseSizeBeforeUpdate = tracerRepository.findAll().size();

        // Create the Tracer

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTracerMockMvc.perform(put("/api/tracers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tracer)))
            .andExpect(status().isCreated());

        // Validate the Tracer in the database
        List<Tracer> tracerList = tracerRepository.findAll();
        assertThat(tracerList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTracer() throws Exception {
        // Initialize the database
        tracerRepository.saveAndFlush(tracer);
        int databaseSizeBeforeDelete = tracerRepository.findAll().size();

        // Get the tracer
        restTracerMockMvc.perform(delete("/api/tracers/{id}", tracer.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Tracer> tracerList = tracerRepository.findAll();
        assertThat(tracerList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Tracer.class);
        Tracer tracer1 = new Tracer();
        tracer1.setId(1L);
        Tracer tracer2 = new Tracer();
        tracer2.setId(tracer1.getId());
        assertThat(tracer1).isEqualTo(tracer2);
        tracer2.setId(2L);
        assertThat(tracer1).isNotEqualTo(tracer2);
        tracer1.setId(null);
        assertThat(tracer1).isNotEqualTo(tracer2);
    }
}
