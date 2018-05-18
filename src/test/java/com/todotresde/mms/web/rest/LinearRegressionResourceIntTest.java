package com.todotresde.mms.web.rest;

import com.todotresde.mms.MmsApp;

import com.todotresde.mms.domain.LinearRegression;
import com.todotresde.mms.domain.Line;
import com.todotresde.mms.domain.WorkStationConfig;
import com.todotresde.mms.domain.WorkStation;
import com.todotresde.mms.domain.Supply;
import com.todotresde.mms.domain.SupplyType;
import com.todotresde.mms.domain.Employee;
import com.todotresde.mms.repository.LinearRegressionRepository;
import com.todotresde.mms.service.LinearRegressionService;
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
import java.util.List;

import static com.todotresde.mms.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the LinearRegressionResource REST controller.
 *
 * @see LinearRegressionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MmsApp.class)
public class LinearRegressionResourceIntTest {

    private static final Integer DEFAULT_DIMENSION = 1;
    private static final Integer UPDATED_DIMENSION = 2;

    private static final Double DEFAULT_X = 1D;
    private static final Double UPDATED_X = 2D;

    private static final Double DEFAULT_BETA_0 = 1D;
    private static final Double UPDATED_BETA_0 = 2D;

    private static final Double DEFAULT_BETA_1 = 1D;
    private static final Double UPDATED_BETA_1 = 2D;

    @Autowired
    private LinearRegressionRepository linearRegressionRepository;

    @Autowired
    private LinearRegressionService linearRegressionService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restLinearRegressionMockMvc;

    private LinearRegression linearRegression;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final LinearRegressionResource linearRegressionResource = new LinearRegressionResource(linearRegressionService);
        this.restLinearRegressionMockMvc = MockMvcBuilders.standaloneSetup(linearRegressionResource)
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
    public static LinearRegression createEntity(EntityManager em) {
        LinearRegression linearRegression = new LinearRegression()
            .dimension(DEFAULT_DIMENSION)
            .x(DEFAULT_X)
            .beta0(DEFAULT_BETA_0)
            .beta1(DEFAULT_BETA_1);
        // Add required entity
        Line line = LineResourceIntTest.createEntity(em);
        em.persist(line);
        em.flush();
        linearRegression.setLine(line);
        // Add required entity
        WorkStationConfig workStationConfig = WorkStationConfigResourceIntTest.createEntity(em);
        em.persist(workStationConfig);
        em.flush();
        linearRegression.setWorkStationConfig(workStationConfig);
        // Add required entity
        WorkStation workStation = WorkStationResourceIntTest.createEntity(em);
        em.persist(workStation);
        em.flush();
        linearRegression.setWorkStation(workStation);
        // Add required entity
        Supply supply = SupplyResourceIntTest.createEntity(em);
        em.persist(supply);
        em.flush();
        linearRegression.setSupply(supply);
        // Add required entity
        SupplyType supplyType = SupplyTypeResourceIntTest.createEntity(em);
        em.persist(supplyType);
        em.flush();
        linearRegression.setSupplyType(supplyType);
        // Add required entity
        Employee employee = EmployeeResourceIntTest.createEntity(em);
        em.persist(employee);
        em.flush();
        linearRegression.setEmployee(employee);
        return linearRegression;
    }

    @Before
    public void initTest() {
        linearRegression = createEntity(em);
    }

    @Test
    @Transactional
    public void createLinearRegression() throws Exception {
        int databaseSizeBeforeCreate = linearRegressionRepository.findAll().size();

        // Create the LinearRegression
        restLinearRegressionMockMvc.perform(post("/api/linear-regressions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(linearRegression)))
            .andExpect(status().isCreated());

        // Validate the LinearRegression in the database
        List<LinearRegression> linearRegressionList = linearRegressionRepository.findAll();
        assertThat(linearRegressionList).hasSize(databaseSizeBeforeCreate + 1);
        LinearRegression testLinearRegression = linearRegressionList.get(linearRegressionList.size() - 1);
        assertThat(testLinearRegression.getDimension()).isEqualTo(DEFAULT_DIMENSION);
        assertThat(testLinearRegression.getX()).isEqualTo(DEFAULT_X);
        assertThat(testLinearRegression.getBeta0()).isEqualTo(DEFAULT_BETA_0);
        assertThat(testLinearRegression.getBeta1()).isEqualTo(DEFAULT_BETA_1);
    }

    @Test
    @Transactional
    public void createLinearRegressionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = linearRegressionRepository.findAll().size();

        // Create the LinearRegression with an existing ID
        linearRegression.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLinearRegressionMockMvc.perform(post("/api/linear-regressions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(linearRegression)))
            .andExpect(status().isBadRequest());

        // Validate the LinearRegression in the database
        List<LinearRegression> linearRegressionList = linearRegressionRepository.findAll();
        assertThat(linearRegressionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDimensionIsRequired() throws Exception {
        int databaseSizeBeforeTest = linearRegressionRepository.findAll().size();
        // set the field null
        linearRegression.setDimension(null);

        // Create the LinearRegression, which fails.

        restLinearRegressionMockMvc.perform(post("/api/linear-regressions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(linearRegression)))
            .andExpect(status().isBadRequest());

        List<LinearRegression> linearRegressionList = linearRegressionRepository.findAll();
        assertThat(linearRegressionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkXIsRequired() throws Exception {
        int databaseSizeBeforeTest = linearRegressionRepository.findAll().size();
        // set the field null
        linearRegression.setX(null);

        // Create the LinearRegression, which fails.

        restLinearRegressionMockMvc.perform(post("/api/linear-regressions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(linearRegression)))
            .andExpect(status().isBadRequest());

        List<LinearRegression> linearRegressionList = linearRegressionRepository.findAll();
        assertThat(linearRegressionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkBeta0IsRequired() throws Exception {
        int databaseSizeBeforeTest = linearRegressionRepository.findAll().size();
        // set the field null
        linearRegression.setBeta0(null);

        // Create the LinearRegression, which fails.

        restLinearRegressionMockMvc.perform(post("/api/linear-regressions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(linearRegression)))
            .andExpect(status().isBadRequest());

        List<LinearRegression> linearRegressionList = linearRegressionRepository.findAll();
        assertThat(linearRegressionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkBeta1IsRequired() throws Exception {
        int databaseSizeBeforeTest = linearRegressionRepository.findAll().size();
        // set the field null
        linearRegression.setBeta1(null);

        // Create the LinearRegression, which fails.

        restLinearRegressionMockMvc.perform(post("/api/linear-regressions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(linearRegression)))
            .andExpect(status().isBadRequest());

        List<LinearRegression> linearRegressionList = linearRegressionRepository.findAll();
        assertThat(linearRegressionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllLinearRegressions() throws Exception {
        // Initialize the database
        linearRegressionRepository.saveAndFlush(linearRegression);

        // Get all the linearRegressionList
        restLinearRegressionMockMvc.perform(get("/api/linear-regressions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(linearRegression.getId().intValue())))
            .andExpect(jsonPath("$.[*].dimension").value(hasItem(DEFAULT_DIMENSION)))
            .andExpect(jsonPath("$.[*].x").value(hasItem(DEFAULT_X.doubleValue())))
            .andExpect(jsonPath("$.[*].beta0").value(hasItem(DEFAULT_BETA_0.doubleValue())))
            .andExpect(jsonPath("$.[*].beta1").value(hasItem(DEFAULT_BETA_1.doubleValue())));
    }

    @Test
    @Transactional
    public void getLinearRegression() throws Exception {
        // Initialize the database
        linearRegressionRepository.saveAndFlush(linearRegression);

        // Get the linearRegression
        restLinearRegressionMockMvc.perform(get("/api/linear-regressions/{id}", linearRegression.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(linearRegression.getId().intValue()))
            .andExpect(jsonPath("$.dimension").value(DEFAULT_DIMENSION))
            .andExpect(jsonPath("$.x").value(DEFAULT_X.doubleValue()))
            .andExpect(jsonPath("$.beta0").value(DEFAULT_BETA_0.doubleValue()))
            .andExpect(jsonPath("$.beta1").value(DEFAULT_BETA_1.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingLinearRegression() throws Exception {
        // Get the linearRegression
        restLinearRegressionMockMvc.perform(get("/api/linear-regressions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLinearRegression() throws Exception {
        // Initialize the database
        linearRegressionService.save(linearRegression);

        int databaseSizeBeforeUpdate = linearRegressionRepository.findAll().size();

        // Update the linearRegression
        LinearRegression updatedLinearRegression = linearRegressionRepository.findOne(linearRegression.getId());
        // Disconnect from session so that the updates on updatedLinearRegression are not directly saved in db
        em.detach(updatedLinearRegression);
        updatedLinearRegression
            .dimension(UPDATED_DIMENSION)
            .x(UPDATED_X)
            .beta0(UPDATED_BETA_0)
            .beta1(UPDATED_BETA_1);

        restLinearRegressionMockMvc.perform(put("/api/linear-regressions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedLinearRegression)))
            .andExpect(status().isOk());

        // Validate the LinearRegression in the database
        List<LinearRegression> linearRegressionList = linearRegressionRepository.findAll();
        assertThat(linearRegressionList).hasSize(databaseSizeBeforeUpdate);
        LinearRegression testLinearRegression = linearRegressionList.get(linearRegressionList.size() - 1);
        assertThat(testLinearRegression.getDimension()).isEqualTo(UPDATED_DIMENSION);
        assertThat(testLinearRegression.getX()).isEqualTo(UPDATED_X);
        assertThat(testLinearRegression.getBeta0()).isEqualTo(UPDATED_BETA_0);
        assertThat(testLinearRegression.getBeta1()).isEqualTo(UPDATED_BETA_1);
    }

    @Test
    @Transactional
    public void updateNonExistingLinearRegression() throws Exception {
        int databaseSizeBeforeUpdate = linearRegressionRepository.findAll().size();

        // Create the LinearRegression

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restLinearRegressionMockMvc.perform(put("/api/linear-regressions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(linearRegression)))
            .andExpect(status().isCreated());

        // Validate the LinearRegression in the database
        List<LinearRegression> linearRegressionList = linearRegressionRepository.findAll();
        assertThat(linearRegressionList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteLinearRegression() throws Exception {
        // Initialize the database
        linearRegressionService.save(linearRegression);

        int databaseSizeBeforeDelete = linearRegressionRepository.findAll().size();

        // Get the linearRegression
        restLinearRegressionMockMvc.perform(delete("/api/linear-regressions/{id}", linearRegression.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<LinearRegression> linearRegressionList = linearRegressionRepository.findAll();
        assertThat(linearRegressionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LinearRegression.class);
        LinearRegression linearRegression1 = new LinearRegression();
        linearRegression1.setId(1L);
        LinearRegression linearRegression2 = new LinearRegression();
        linearRegression2.setId(linearRegression1.getId());
        assertThat(linearRegression1).isEqualTo(linearRegression2);
        linearRegression2.setId(2L);
        assertThat(linearRegression1).isNotEqualTo(linearRegression2);
        linearRegression1.setId(null);
        assertThat(linearRegression1).isNotEqualTo(linearRegression2);
    }
}
