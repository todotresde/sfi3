package com.todotresde.mms.web.rest;

import com.todotresde.mms.MMSApp;

import com.todotresde.mms.domain.Supply;
import com.todotresde.mms.domain.SupplyType;
import com.todotresde.mms.repository.SupplyRepository;
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
 * Test class for the SupplyResource REST controller.
 *
 * @see SupplyResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MMSApp.class)
public class SupplyResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private SupplyRepository supplyRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSupplyMockMvc;

    private Supply supply;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SupplyResource supplyResource = new SupplyResource(supplyRepository);
        this.restSupplyMockMvc = MockMvcBuilders.standaloneSetup(supplyResource)
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
    public static Supply createEntity(EntityManager em) {
        Supply supply = new Supply()
            .name(DEFAULT_NAME);
        // Add required entity
        SupplyType supplyType = SupplyTypeResourceIntTest.createEntity(em);
        em.persist(supplyType);
        em.flush();
        supply.setSupplyType(supplyType);
        return supply;
    }

    @Before
    public void initTest() {
        supply = createEntity(em);
    }

    @Test
    @Transactional
    public void createSupply() throws Exception {
        int databaseSizeBeforeCreate = supplyRepository.findAll().size();

        // Create the Supply
        restSupplyMockMvc.perform(post("/api/supplies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(supply)))
            .andExpect(status().isCreated());

        // Validate the Supply in the database
        List<Supply> supplyList = supplyRepository.findAll();
        assertThat(supplyList).hasSize(databaseSizeBeforeCreate + 1);
        Supply testSupply = supplyList.get(supplyList.size() - 1);
        assertThat(testSupply.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createSupplyWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = supplyRepository.findAll().size();

        // Create the Supply with an existing ID
        supply.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSupplyMockMvc.perform(post("/api/supplies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(supply)))
            .andExpect(status().isBadRequest());

        // Validate the Supply in the database
        List<Supply> supplyList = supplyRepository.findAll();
        assertThat(supplyList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = supplyRepository.findAll().size();
        // set the field null
        supply.setName(null);

        // Create the Supply, which fails.

        restSupplyMockMvc.perform(post("/api/supplies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(supply)))
            .andExpect(status().isBadRequest());

        List<Supply> supplyList = supplyRepository.findAll();
        assertThat(supplyList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSupplies() throws Exception {
        // Initialize the database
        supplyRepository.saveAndFlush(supply);

        // Get all the supplyList
        restSupplyMockMvc.perform(get("/api/supplies?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(supply.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getSupply() throws Exception {
        // Initialize the database
        supplyRepository.saveAndFlush(supply);

        // Get the supply
        restSupplyMockMvc.perform(get("/api/supplies/{id}", supply.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(supply.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSupply() throws Exception {
        // Get the supply
        restSupplyMockMvc.perform(get("/api/supplies/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSupply() throws Exception {
        // Initialize the database
        supplyRepository.saveAndFlush(supply);
        int databaseSizeBeforeUpdate = supplyRepository.findAll().size();

        // Update the supply
        Supply updatedSupply = supplyRepository.findOne(supply.getId());
        // Disconnect from session so that the updates on updatedSupply are not directly saved in db
        em.detach(updatedSupply);
        updatedSupply
            .name(UPDATED_NAME);

        restSupplyMockMvc.perform(put("/api/supplies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSupply)))
            .andExpect(status().isOk());

        // Validate the Supply in the database
        List<Supply> supplyList = supplyRepository.findAll();
        assertThat(supplyList).hasSize(databaseSizeBeforeUpdate);
        Supply testSupply = supplyList.get(supplyList.size() - 1);
        assertThat(testSupply.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingSupply() throws Exception {
        int databaseSizeBeforeUpdate = supplyRepository.findAll().size();

        // Create the Supply

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSupplyMockMvc.perform(put("/api/supplies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(supply)))
            .andExpect(status().isCreated());

        // Validate the Supply in the database
        List<Supply> supplyList = supplyRepository.findAll();
        assertThat(supplyList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteSupply() throws Exception {
        // Initialize the database
        supplyRepository.saveAndFlush(supply);
        int databaseSizeBeforeDelete = supplyRepository.findAll().size();

        // Get the supply
        restSupplyMockMvc.perform(delete("/api/supplies/{id}", supply.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Supply> supplyList = supplyRepository.findAll();
        assertThat(supplyList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Supply.class);
        Supply supply1 = new Supply();
        supply1.setId(1L);
        Supply supply2 = new Supply();
        supply2.setId(supply1.getId());
        assertThat(supply1).isEqualTo(supply2);
        supply2.setId(2L);
        assertThat(supply1).isNotEqualTo(supply2);
        supply1.setId(null);
        assertThat(supply1).isNotEqualTo(supply2);
    }
}
