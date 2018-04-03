package com.todotresde.mms.web.rest;

import com.todotresde.mms.MMSApp;

import com.todotresde.mms.domain.WorkStation;
import com.todotresde.mms.repository.WorkStationRepository;
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
 * Test class for the WorkStationResource REST controller.
 *
 * @see WorkStationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MMSApp.class)
public class WorkStationResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_SHORT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_SHORT_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_IP = "AAAAAAAAAA";
    private static final String UPDATED_IP = "BBBBBBBBBB";

    @Autowired
    private WorkStationRepository workStationRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restWorkStationMockMvc;

    private WorkStation workStation;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final WorkStationResource workStationResource = new WorkStationResource(workStationRepository);
        this.restWorkStationMockMvc = MockMvcBuilders.standaloneSetup(workStationResource)
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
    public static WorkStation createEntity(EntityManager em) {
        WorkStation workStation = new WorkStation()
            .name(DEFAULT_NAME)
            .shortName(DEFAULT_SHORT_NAME)
            .ip(DEFAULT_IP);
        return workStation;
    }

    @Before
    public void initTest() {
        workStation = createEntity(em);
    }

    @Test
    @Transactional
    public void createWorkStation() throws Exception {
        int databaseSizeBeforeCreate = workStationRepository.findAll().size();

        // Create the WorkStation
        restWorkStationMockMvc.perform(post("/api/work-stations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(workStation)))
            .andExpect(status().isCreated());

        // Validate the WorkStation in the database
        List<WorkStation> workStationList = workStationRepository.findAll();
        assertThat(workStationList).hasSize(databaseSizeBeforeCreate + 1);
        WorkStation testWorkStation = workStationList.get(workStationList.size() - 1);
        assertThat(testWorkStation.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testWorkStation.getShortName()).isEqualTo(DEFAULT_SHORT_NAME);
        assertThat(testWorkStation.getIp()).isEqualTo(DEFAULT_IP);
    }

    @Test
    @Transactional
    public void createWorkStationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = workStationRepository.findAll().size();

        // Create the WorkStation with an existing ID
        workStation.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restWorkStationMockMvc.perform(post("/api/work-stations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(workStation)))
            .andExpect(status().isBadRequest());

        // Validate the WorkStation in the database
        List<WorkStation> workStationList = workStationRepository.findAll();
        assertThat(workStationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = workStationRepository.findAll().size();
        // set the field null
        workStation.setName(null);

        // Create the WorkStation, which fails.

        restWorkStationMockMvc.perform(post("/api/work-stations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(workStation)))
            .andExpect(status().isBadRequest());

        List<WorkStation> workStationList = workStationRepository.findAll();
        assertThat(workStationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkShortNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = workStationRepository.findAll().size();
        // set the field null
        workStation.setShortName(null);

        // Create the WorkStation, which fails.

        restWorkStationMockMvc.perform(post("/api/work-stations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(workStation)))
            .andExpect(status().isBadRequest());

        List<WorkStation> workStationList = workStationRepository.findAll();
        assertThat(workStationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkIpIsRequired() throws Exception {
        int databaseSizeBeforeTest = workStationRepository.findAll().size();
        // set the field null
        workStation.setIp(null);

        // Create the WorkStation, which fails.

        restWorkStationMockMvc.perform(post("/api/work-stations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(workStation)))
            .andExpect(status().isBadRequest());

        List<WorkStation> workStationList = workStationRepository.findAll();
        assertThat(workStationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllWorkStations() throws Exception {
        // Initialize the database
        workStationRepository.saveAndFlush(workStation);

        // Get all the workStationList
        restWorkStationMockMvc.perform(get("/api/work-stations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(workStation.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].shortName").value(hasItem(DEFAULT_SHORT_NAME.toString())))
            .andExpect(jsonPath("$.[*].ip").value(hasItem(DEFAULT_IP.toString())));
    }

    @Test
    @Transactional
    public void getWorkStation() throws Exception {
        // Initialize the database
        workStationRepository.saveAndFlush(workStation);

        // Get the workStation
        restWorkStationMockMvc.perform(get("/api/work-stations/{id}", workStation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(workStation.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.shortName").value(DEFAULT_SHORT_NAME.toString()))
            .andExpect(jsonPath("$.ip").value(DEFAULT_IP.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingWorkStation() throws Exception {
        // Get the workStation
        restWorkStationMockMvc.perform(get("/api/work-stations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateWorkStation() throws Exception {
        // Initialize the database
        workStationRepository.saveAndFlush(workStation);
        int databaseSizeBeforeUpdate = workStationRepository.findAll().size();

        // Update the workStation
        WorkStation updatedWorkStation = workStationRepository.findOne(workStation.getId());
        // Disconnect from session so that the updates on updatedWorkStation are not directly saved in db
        em.detach(updatedWorkStation);
        updatedWorkStation
            .name(UPDATED_NAME)
            .shortName(UPDATED_SHORT_NAME)
            .ip(UPDATED_IP);

        restWorkStationMockMvc.perform(put("/api/work-stations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedWorkStation)))
            .andExpect(status().isOk());

        // Validate the WorkStation in the database
        List<WorkStation> workStationList = workStationRepository.findAll();
        assertThat(workStationList).hasSize(databaseSizeBeforeUpdate);
        WorkStation testWorkStation = workStationList.get(workStationList.size() - 1);
        assertThat(testWorkStation.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testWorkStation.getShortName()).isEqualTo(UPDATED_SHORT_NAME);
        assertThat(testWorkStation.getIp()).isEqualTo(UPDATED_IP);
    }

    @Test
    @Transactional
    public void updateNonExistingWorkStation() throws Exception {
        int databaseSizeBeforeUpdate = workStationRepository.findAll().size();

        // Create the WorkStation

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restWorkStationMockMvc.perform(put("/api/work-stations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(workStation)))
            .andExpect(status().isCreated());

        // Validate the WorkStation in the database
        List<WorkStation> workStationList = workStationRepository.findAll();
        assertThat(workStationList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteWorkStation() throws Exception {
        // Initialize the database
        workStationRepository.saveAndFlush(workStation);
        int databaseSizeBeforeDelete = workStationRepository.findAll().size();

        // Get the workStation
        restWorkStationMockMvc.perform(delete("/api/work-stations/{id}", workStation.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<WorkStation> workStationList = workStationRepository.findAll();
        assertThat(workStationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(WorkStation.class);
        WorkStation workStation1 = new WorkStation();
        workStation1.setId(1L);
        WorkStation workStation2 = new WorkStation();
        workStation2.setId(workStation1.getId());
        assertThat(workStation1).isEqualTo(workStation2);
        workStation2.setId(2L);
        assertThat(workStation1).isNotEqualTo(workStation2);
        workStation1.setId(null);
        assertThat(workStation1).isNotEqualTo(workStation2);
    }
}
