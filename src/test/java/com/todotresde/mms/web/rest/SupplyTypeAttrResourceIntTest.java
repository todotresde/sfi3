package com.todotresde.mms.web.rest;

import com.todotresde.mms.MMSApp;

import com.todotresde.mms.domain.SupplyTypeAttr;
import com.todotresde.mms.repository.SupplyTypeAttrRepository;
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
 * Test class for the SupplyTypeAttrResource REST controller.
 *
 * @see SupplyTypeAttrResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MMSApp.class)
public class SupplyTypeAttrResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private SupplyTypeAttrRepository supplyTypeAttrRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSupplyTypeAttrMockMvc;

    private SupplyTypeAttr supplyTypeAttr;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SupplyTypeAttrResource supplyTypeAttrResource = new SupplyTypeAttrResource(supplyTypeAttrRepository);
        this.restSupplyTypeAttrMockMvc = MockMvcBuilders.standaloneSetup(supplyTypeAttrResource)
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
    public static SupplyTypeAttr createEntity(EntityManager em) {
        SupplyTypeAttr supplyTypeAttr = new SupplyTypeAttr()
            .name(DEFAULT_NAME);
        return supplyTypeAttr;
    }

    @Before
    public void initTest() {
        supplyTypeAttr = createEntity(em);
    }

    @Test
    @Transactional
    public void createSupplyTypeAttr() throws Exception {
        int databaseSizeBeforeCreate = supplyTypeAttrRepository.findAll().size();

        // Create the SupplyTypeAttr
        restSupplyTypeAttrMockMvc.perform(post("/api/supply-type-attrs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(supplyTypeAttr)))
            .andExpect(status().isCreated());

        // Validate the SupplyTypeAttr in the database
        List<SupplyTypeAttr> supplyTypeAttrList = supplyTypeAttrRepository.findAll();
        assertThat(supplyTypeAttrList).hasSize(databaseSizeBeforeCreate + 1);
        SupplyTypeAttr testSupplyTypeAttr = supplyTypeAttrList.get(supplyTypeAttrList.size() - 1);
        assertThat(testSupplyTypeAttr.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createSupplyTypeAttrWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = supplyTypeAttrRepository.findAll().size();

        // Create the SupplyTypeAttr with an existing ID
        supplyTypeAttr.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSupplyTypeAttrMockMvc.perform(post("/api/supply-type-attrs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(supplyTypeAttr)))
            .andExpect(status().isBadRequest());

        // Validate the SupplyTypeAttr in the database
        List<SupplyTypeAttr> supplyTypeAttrList = supplyTypeAttrRepository.findAll();
        assertThat(supplyTypeAttrList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = supplyTypeAttrRepository.findAll().size();
        // set the field null
        supplyTypeAttr.setName(null);

        // Create the SupplyTypeAttr, which fails.

        restSupplyTypeAttrMockMvc.perform(post("/api/supply-type-attrs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(supplyTypeAttr)))
            .andExpect(status().isBadRequest());

        List<SupplyTypeAttr> supplyTypeAttrList = supplyTypeAttrRepository.findAll();
        assertThat(supplyTypeAttrList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSupplyTypeAttrs() throws Exception {
        // Initialize the database
        supplyTypeAttrRepository.saveAndFlush(supplyTypeAttr);

        // Get all the supplyTypeAttrList
        restSupplyTypeAttrMockMvc.perform(get("/api/supply-type-attrs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(supplyTypeAttr.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getSupplyTypeAttr() throws Exception {
        // Initialize the database
        supplyTypeAttrRepository.saveAndFlush(supplyTypeAttr);

        // Get the supplyTypeAttr
        restSupplyTypeAttrMockMvc.perform(get("/api/supply-type-attrs/{id}", supplyTypeAttr.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(supplyTypeAttr.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSupplyTypeAttr() throws Exception {
        // Get the supplyTypeAttr
        restSupplyTypeAttrMockMvc.perform(get("/api/supply-type-attrs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSupplyTypeAttr() throws Exception {
        // Initialize the database
        supplyTypeAttrRepository.saveAndFlush(supplyTypeAttr);
        int databaseSizeBeforeUpdate = supplyTypeAttrRepository.findAll().size();

        // Update the supplyTypeAttr
        SupplyTypeAttr updatedSupplyTypeAttr = supplyTypeAttrRepository.findOne(supplyTypeAttr.getId());
        // Disconnect from session so that the updates on updatedSupplyTypeAttr are not directly saved in db
        em.detach(updatedSupplyTypeAttr);
        updatedSupplyTypeAttr
            .name(UPDATED_NAME);

        restSupplyTypeAttrMockMvc.perform(put("/api/supply-type-attrs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSupplyTypeAttr)))
            .andExpect(status().isOk());

        // Validate the SupplyTypeAttr in the database
        List<SupplyTypeAttr> supplyTypeAttrList = supplyTypeAttrRepository.findAll();
        assertThat(supplyTypeAttrList).hasSize(databaseSizeBeforeUpdate);
        SupplyTypeAttr testSupplyTypeAttr = supplyTypeAttrList.get(supplyTypeAttrList.size() - 1);
        assertThat(testSupplyTypeAttr.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingSupplyTypeAttr() throws Exception {
        int databaseSizeBeforeUpdate = supplyTypeAttrRepository.findAll().size();

        // Create the SupplyTypeAttr

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSupplyTypeAttrMockMvc.perform(put("/api/supply-type-attrs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(supplyTypeAttr)))
            .andExpect(status().isCreated());

        // Validate the SupplyTypeAttr in the database
        List<SupplyTypeAttr> supplyTypeAttrList = supplyTypeAttrRepository.findAll();
        assertThat(supplyTypeAttrList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteSupplyTypeAttr() throws Exception {
        // Initialize the database
        supplyTypeAttrRepository.saveAndFlush(supplyTypeAttr);
        int databaseSizeBeforeDelete = supplyTypeAttrRepository.findAll().size();

        // Get the supplyTypeAttr
        restSupplyTypeAttrMockMvc.perform(delete("/api/supply-type-attrs/{id}", supplyTypeAttr.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<SupplyTypeAttr> supplyTypeAttrList = supplyTypeAttrRepository.findAll();
        assertThat(supplyTypeAttrList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SupplyTypeAttr.class);
        SupplyTypeAttr supplyTypeAttr1 = new SupplyTypeAttr();
        supplyTypeAttr1.setId(1L);
        SupplyTypeAttr supplyTypeAttr2 = new SupplyTypeAttr();
        supplyTypeAttr2.setId(supplyTypeAttr1.getId());
        assertThat(supplyTypeAttr1).isEqualTo(supplyTypeAttr2);
        supplyTypeAttr2.setId(2L);
        assertThat(supplyTypeAttr1).isNotEqualTo(supplyTypeAttr2);
        supplyTypeAttr1.setId(null);
        assertThat(supplyTypeAttr1).isNotEqualTo(supplyTypeAttr2);
    }
}
