package com.todotresde.sfi3.web.rest;

import com.todotresde.sfi3.Sfi3App;

import com.todotresde.sfi3.domain.SupplyType;
import com.todotresde.sfi3.repository.SupplyTypeRepository;
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
 * Test class for the SupplyTypeResource REST controller.
 *
 * @see SupplyTypeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Sfi3App.class)
public class SupplyTypeResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private SupplyTypeRepository supplyTypeRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSupplyTypeMockMvc;

    private SupplyType supplyType;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SupplyTypeResource supplyTypeResource = new SupplyTypeResource(supplyTypeRepository);
        this.restSupplyTypeMockMvc = MockMvcBuilders.standaloneSetup(supplyTypeResource)
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
    public static SupplyType createEntity(EntityManager em) {
        SupplyType supplyType = new SupplyType()
            .name(DEFAULT_NAME);
        return supplyType;
    }

    @Before
    public void initTest() {
        supplyType = createEntity(em);
    }

    @Test
    @Transactional
    public void createSupplyType() throws Exception {
        int databaseSizeBeforeCreate = supplyTypeRepository.findAll().size();

        // Create the SupplyType
        restSupplyTypeMockMvc.perform(post("/api/supply-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(supplyType)))
            .andExpect(status().isCreated());

        // Validate the SupplyType in the database
        List<SupplyType> supplyTypeList = supplyTypeRepository.findAll();
        assertThat(supplyTypeList).hasSize(databaseSizeBeforeCreate + 1);
        SupplyType testSupplyType = supplyTypeList.get(supplyTypeList.size() - 1);
        assertThat(testSupplyType.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createSupplyTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = supplyTypeRepository.findAll().size();

        // Create the SupplyType with an existing ID
        supplyType.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSupplyTypeMockMvc.perform(post("/api/supply-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(supplyType)))
            .andExpect(status().isBadRequest());

        // Validate the SupplyType in the database
        List<SupplyType> supplyTypeList = supplyTypeRepository.findAll();
        assertThat(supplyTypeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = supplyTypeRepository.findAll().size();
        // set the field null
        supplyType.setName(null);

        // Create the SupplyType, which fails.

        restSupplyTypeMockMvc.perform(post("/api/supply-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(supplyType)))
            .andExpect(status().isBadRequest());

        List<SupplyType> supplyTypeList = supplyTypeRepository.findAll();
        assertThat(supplyTypeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSupplyTypes() throws Exception {
        // Initialize the database
        supplyTypeRepository.saveAndFlush(supplyType);

        // Get all the supplyTypeList
        restSupplyTypeMockMvc.perform(get("/api/supply-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(supplyType.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getSupplyType() throws Exception {
        // Initialize the database
        supplyTypeRepository.saveAndFlush(supplyType);

        // Get the supplyType
        restSupplyTypeMockMvc.perform(get("/api/supply-types/{id}", supplyType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(supplyType.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSupplyType() throws Exception {
        // Get the supplyType
        restSupplyTypeMockMvc.perform(get("/api/supply-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSupplyType() throws Exception {
        // Initialize the database
        supplyTypeRepository.saveAndFlush(supplyType);
        int databaseSizeBeforeUpdate = supplyTypeRepository.findAll().size();

        // Update the supplyType
        SupplyType updatedSupplyType = supplyTypeRepository.findOne(supplyType.getId());
        // Disconnect from session so that the updates on updatedSupplyType are not directly saved in db
        em.detach(updatedSupplyType);
        updatedSupplyType
            .name(UPDATED_NAME);

        restSupplyTypeMockMvc.perform(put("/api/supply-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSupplyType)))
            .andExpect(status().isOk());

        // Validate the SupplyType in the database
        List<SupplyType> supplyTypeList = supplyTypeRepository.findAll();
        assertThat(supplyTypeList).hasSize(databaseSizeBeforeUpdate);
        SupplyType testSupplyType = supplyTypeList.get(supplyTypeList.size() - 1);
        assertThat(testSupplyType.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingSupplyType() throws Exception {
        int databaseSizeBeforeUpdate = supplyTypeRepository.findAll().size();

        // Create the SupplyType

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSupplyTypeMockMvc.perform(put("/api/supply-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(supplyType)))
            .andExpect(status().isCreated());

        // Validate the SupplyType in the database
        List<SupplyType> supplyTypeList = supplyTypeRepository.findAll();
        assertThat(supplyTypeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteSupplyType() throws Exception {
        // Initialize the database
        supplyTypeRepository.saveAndFlush(supplyType);
        int databaseSizeBeforeDelete = supplyTypeRepository.findAll().size();

        // Get the supplyType
        restSupplyTypeMockMvc.perform(delete("/api/supply-types/{id}", supplyType.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<SupplyType> supplyTypeList = supplyTypeRepository.findAll();
        assertThat(supplyTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SupplyType.class);
        SupplyType supplyType1 = new SupplyType();
        supplyType1.setId(1L);
        SupplyType supplyType2 = new SupplyType();
        supplyType2.setId(supplyType1.getId());
        assertThat(supplyType1).isEqualTo(supplyType2);
        supplyType2.setId(2L);
        assertThat(supplyType1).isNotEqualTo(supplyType2);
        supplyType1.setId(null);
        assertThat(supplyType1).isNotEqualTo(supplyType2);
    }
}
