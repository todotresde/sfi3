package com.todotresde.sfi3.web.rest;

import com.todotresde.sfi3.Sfi3App;

import com.todotresde.sfi3.domain.WorkStationConfig;
import com.todotresde.sfi3.domain.WorkStation;
import com.todotresde.sfi3.domain.Line;
import com.todotresde.sfi3.repository.WorkStationConfigRepository;
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
import java.util.List;

import static com.todotresde.sfi3.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the WorkStationConfigResource REST controller.
 *
 * @see WorkStationConfigResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Sfi3App.class)
public class WorkStationConfigResourceIntTest {

    private static final Boolean DEFAULT_FIRST = false;
    private static final Boolean UPDATED_FIRST = true;

    private static final Boolean DEFAULT_LAST = false;
    private static final Boolean UPDATED_LAST = true;

    @Autowired
    private WorkStationConfigRepository workStationConfigRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restWorkStationConfigMockMvc;

    private WorkStationConfig workStationConfig;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final WorkStationConfigResource workStationConfigResource = new WorkStationConfigResource(workStationConfigRepository);
        this.restWorkStationConfigMockMvc = MockMvcBuilders.standaloneSetup(workStationConfigResource)
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
    public static WorkStationConfig createEntity(EntityManager em) {
        WorkStationConfig workStationConfig = new WorkStationConfig()
            .first(DEFAULT_FIRST)
            .last(DEFAULT_LAST);
        // Add required entity
        WorkStation workStation = WorkStationResourceIntTest.createEntity(em);
        em.persist(workStation);
        em.flush();
        workStationConfig.setWorkStation(workStation);
        // Add required entity
        Line line = LineResourceIntTest.createEntity(em);
        em.persist(line);
        em.flush();
        workStationConfig.setLine(line);
        return workStationConfig;
    }

    @Before
    public void initTest() {
        workStationConfig = createEntity(em);
    }

    @Test
    @Transactional
    public void createWorkStationConfig() throws Exception {
        int databaseSizeBeforeCreate = workStationConfigRepository.findAll().size();

        // Create the WorkStationConfig
        restWorkStationConfigMockMvc.perform(post("/api/work-station-configs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(workStationConfig)))
            .andExpect(status().isCreated());

        // Validate the WorkStationConfig in the database
        List<WorkStationConfig> workStationConfigList = workStationConfigRepository.findAll();
        assertThat(workStationConfigList).hasSize(databaseSizeBeforeCreate + 1);
        WorkStationConfig testWorkStationConfig = workStationConfigList.get(workStationConfigList.size() - 1);
        assertThat(testWorkStationConfig.isFirst()).isEqualTo(DEFAULT_FIRST);
        assertThat(testWorkStationConfig.isLast()).isEqualTo(DEFAULT_LAST);
    }

    @Test
    @Transactional
    public void createWorkStationConfigWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = workStationConfigRepository.findAll().size();

        // Create the WorkStationConfig with an existing ID
        workStationConfig.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restWorkStationConfigMockMvc.perform(post("/api/work-station-configs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(workStationConfig)))
            .andExpect(status().isBadRequest());

        // Validate the WorkStationConfig in the database
        List<WorkStationConfig> workStationConfigList = workStationConfigRepository.findAll();
        assertThat(workStationConfigList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllWorkStationConfigs() throws Exception {
        // Initialize the database
        workStationConfigRepository.saveAndFlush(workStationConfig);

        // Get all the workStationConfigList
        restWorkStationConfigMockMvc.perform(get("/api/work-station-configs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(workStationConfig.getId().intValue())))
            .andExpect(jsonPath("$.[*].first").value(hasItem(DEFAULT_FIRST.booleanValue())))
            .andExpect(jsonPath("$.[*].last").value(hasItem(DEFAULT_LAST.booleanValue())));
    }

    @Test
    @Transactional
    public void getWorkStationConfig() throws Exception {
        // Initialize the database
        workStationConfigRepository.saveAndFlush(workStationConfig);

        // Get the workStationConfig
        restWorkStationConfigMockMvc.perform(get("/api/work-station-configs/{id}", workStationConfig.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(workStationConfig.getId().intValue()))
            .andExpect(jsonPath("$.first").value(DEFAULT_FIRST.booleanValue()))
            .andExpect(jsonPath("$.last").value(DEFAULT_LAST.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingWorkStationConfig() throws Exception {
        // Get the workStationConfig
        restWorkStationConfigMockMvc.perform(get("/api/work-station-configs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateWorkStationConfig() throws Exception {
        // Initialize the database
        workStationConfigRepository.saveAndFlush(workStationConfig);
        int databaseSizeBeforeUpdate = workStationConfigRepository.findAll().size();

        // Update the workStationConfig
        WorkStationConfig updatedWorkStationConfig = workStationConfigRepository.findOne(workStationConfig.getId());
        // Disconnect from session so that the updates on updatedWorkStationConfig are not directly saved in db
        em.detach(updatedWorkStationConfig);
        updatedWorkStationConfig
            .first(UPDATED_FIRST)
            .last(UPDATED_LAST);

        restWorkStationConfigMockMvc.perform(put("/api/work-station-configs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedWorkStationConfig)))
            .andExpect(status().isOk());

        // Validate the WorkStationConfig in the database
        List<WorkStationConfig> workStationConfigList = workStationConfigRepository.findAll();
        assertThat(workStationConfigList).hasSize(databaseSizeBeforeUpdate);
        WorkStationConfig testWorkStationConfig = workStationConfigList.get(workStationConfigList.size() - 1);
        assertThat(testWorkStationConfig.isFirst()).isEqualTo(UPDATED_FIRST);
        assertThat(testWorkStationConfig.isLast()).isEqualTo(UPDATED_LAST);
    }

    @Test
    @Transactional
    public void updateNonExistingWorkStationConfig() throws Exception {
        int databaseSizeBeforeUpdate = workStationConfigRepository.findAll().size();

        // Create the WorkStationConfig

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restWorkStationConfigMockMvc.perform(put("/api/work-station-configs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(workStationConfig)))
            .andExpect(status().isCreated());

        // Validate the WorkStationConfig in the database
        List<WorkStationConfig> workStationConfigList = workStationConfigRepository.findAll();
        assertThat(workStationConfigList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteWorkStationConfig() throws Exception {
        // Initialize the database
        workStationConfigRepository.saveAndFlush(workStationConfig);
        int databaseSizeBeforeDelete = workStationConfigRepository.findAll().size();

        // Get the workStationConfig
        restWorkStationConfigMockMvc.perform(delete("/api/work-station-configs/{id}", workStationConfig.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<WorkStationConfig> workStationConfigList = workStationConfigRepository.findAll();
        assertThat(workStationConfigList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(WorkStationConfig.class);
        WorkStationConfig workStationConfig1 = new WorkStationConfig();
        workStationConfig1.setId(1L);
        WorkStationConfig workStationConfig2 = new WorkStationConfig();
        workStationConfig2.setId(workStationConfig1.getId());
        assertThat(workStationConfig1).isEqualTo(workStationConfig2);
        workStationConfig2.setId(2L);
        assertThat(workStationConfig1).isNotEqualTo(workStationConfig2);
        workStationConfig1.setId(null);
        assertThat(workStationConfig1).isNotEqualTo(workStationConfig2);
    }
}
