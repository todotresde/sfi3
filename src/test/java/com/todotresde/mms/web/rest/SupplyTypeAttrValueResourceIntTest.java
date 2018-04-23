package com.todotresde.mms.web.rest;

import com.todotresde.mms.MMSApp;

import com.todotresde.mms.domain.SupplyTypeAttrValue;
import com.todotresde.mms.domain.Product;
import com.todotresde.mms.domain.Supply;
import com.todotresde.mms.domain.SupplyType;
import com.todotresde.mms.domain.SupplyTypeAttr;
import com.todotresde.mms.domain.ManufacturingOrder;
import com.todotresde.mms.repository.SupplyTypeAttrValueRepository;
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
 * Test class for the SupplyTypeAttrValueResource REST controller.
 *
 * @see SupplyTypeAttrValueResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MMSApp.class)
public class SupplyTypeAttrValueResourceIntTest {

    private static final String DEFAULT_VALUE = "AAAAAAAAAA";
    private static final String UPDATED_VALUE = "BBBBBBBBBB";

    @Autowired
    private SupplyTypeAttrValueRepository supplyTypeAttrValueRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSupplyTypeAttrValueMockMvc;

    private SupplyTypeAttrValue supplyTypeAttrValue;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SupplyTypeAttrValueResource supplyTypeAttrValueResource = new SupplyTypeAttrValueResource(supplyTypeAttrValueRepository);
        this.restSupplyTypeAttrValueMockMvc = MockMvcBuilders.standaloneSetup(supplyTypeAttrValueResource)
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
    public static SupplyTypeAttrValue createEntity(EntityManager em) {
        SupplyTypeAttrValue supplyTypeAttrValue = new SupplyTypeAttrValue()
            .value(DEFAULT_VALUE);
        // Add required entity
        Product product = ProductResourceIntTest.createEntity(em);
        em.persist(product);
        em.flush();
        supplyTypeAttrValue.setProduct(product);
        // Add required entity
        Supply supply = SupplyResourceIntTest.createEntity(em);
        em.persist(supply);
        em.flush();
        supplyTypeAttrValue.setSupply(supply);
        // Add required entity
        SupplyType supplyType = SupplyTypeResourceIntTest.createEntity(em);
        em.persist(supplyType);
        em.flush();
        supplyTypeAttrValue.setSupplyType(supplyType);
        // Add required entity
        SupplyTypeAttr supplyTypeAttr = SupplyTypeAttrResourceIntTest.createEntity(em);
        em.persist(supplyTypeAttr);
        em.flush();
        supplyTypeAttrValue.setSupplyTypeAttr(supplyTypeAttr);
        // Add required entity
        ManufacturingOrder manufacturingOrder = ManufacturingOrderResourceIntTest.createEntity(em);
        em.persist(manufacturingOrder);
        em.flush();
        supplyTypeAttrValue.setManufacturingOrder(manufacturingOrder);
        return supplyTypeAttrValue;
    }

    @Before
    public void initTest() {
        supplyTypeAttrValue = createEntity(em);
    }

    @Test
    @Transactional
    public void createSupplyTypeAttrValue() throws Exception {
        int databaseSizeBeforeCreate = supplyTypeAttrValueRepository.findAll().size();

        // Create the SupplyTypeAttrValue
        restSupplyTypeAttrValueMockMvc.perform(post("/api/supply-type-attr-values")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(supplyTypeAttrValue)))
            .andExpect(status().isCreated());

        // Validate the SupplyTypeAttrValue in the database
        List<SupplyTypeAttrValue> supplyTypeAttrValueList = supplyTypeAttrValueRepository.findAll();
        assertThat(supplyTypeAttrValueList).hasSize(databaseSizeBeforeCreate + 1);
        SupplyTypeAttrValue testSupplyTypeAttrValue = supplyTypeAttrValueList.get(supplyTypeAttrValueList.size() - 1);
        assertThat(testSupplyTypeAttrValue.getValue()).isEqualTo(DEFAULT_VALUE);
    }

    @Test
    @Transactional
    public void createSupplyTypeAttrValueWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = supplyTypeAttrValueRepository.findAll().size();

        // Create the SupplyTypeAttrValue with an existing ID
        supplyTypeAttrValue.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSupplyTypeAttrValueMockMvc.perform(post("/api/supply-type-attr-values")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(supplyTypeAttrValue)))
            .andExpect(status().isBadRequest());

        // Validate the SupplyTypeAttrValue in the database
        List<SupplyTypeAttrValue> supplyTypeAttrValueList = supplyTypeAttrValueRepository.findAll();
        assertThat(supplyTypeAttrValueList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkValueIsRequired() throws Exception {
        int databaseSizeBeforeTest = supplyTypeAttrValueRepository.findAll().size();
        // set the field null
        supplyTypeAttrValue.setValue(null);

        // Create the SupplyTypeAttrValue, which fails.

        restSupplyTypeAttrValueMockMvc.perform(post("/api/supply-type-attr-values")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(supplyTypeAttrValue)))
            .andExpect(status().isBadRequest());

        List<SupplyTypeAttrValue> supplyTypeAttrValueList = supplyTypeAttrValueRepository.findAll();
        assertThat(supplyTypeAttrValueList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSupplyTypeAttrValues() throws Exception {
        // Initialize the database
        supplyTypeAttrValueRepository.saveAndFlush(supplyTypeAttrValue);

        // Get all the supplyTypeAttrValueList
        restSupplyTypeAttrValueMockMvc.perform(get("/api/supply-type-attr-values?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(supplyTypeAttrValue.getId().intValue())))
            .andExpect(jsonPath("$.[*].value").value(hasItem(DEFAULT_VALUE.toString())));
    }

    @Test
    @Transactional
    public void getSupplyTypeAttrValue() throws Exception {
        // Initialize the database
        supplyTypeAttrValueRepository.saveAndFlush(supplyTypeAttrValue);

        // Get the supplyTypeAttrValue
        restSupplyTypeAttrValueMockMvc.perform(get("/api/supply-type-attr-values/{id}", supplyTypeAttrValue.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(supplyTypeAttrValue.getId().intValue()))
            .andExpect(jsonPath("$.value").value(DEFAULT_VALUE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSupplyTypeAttrValue() throws Exception {
        // Get the supplyTypeAttrValue
        restSupplyTypeAttrValueMockMvc.perform(get("/api/supply-type-attr-values/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSupplyTypeAttrValue() throws Exception {
        // Initialize the database
        supplyTypeAttrValueRepository.saveAndFlush(supplyTypeAttrValue);
        int databaseSizeBeforeUpdate = supplyTypeAttrValueRepository.findAll().size();

        // Update the supplyTypeAttrValue
        SupplyTypeAttrValue updatedSupplyTypeAttrValue = supplyTypeAttrValueRepository.findOne(supplyTypeAttrValue.getId());
        // Disconnect from session so that the updates on updatedSupplyTypeAttrValue are not directly saved in db
        em.detach(updatedSupplyTypeAttrValue);
        updatedSupplyTypeAttrValue
            .value(UPDATED_VALUE);

        restSupplyTypeAttrValueMockMvc.perform(put("/api/supply-type-attr-values")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSupplyTypeAttrValue)))
            .andExpect(status().isOk());

        // Validate the SupplyTypeAttrValue in the database
        List<SupplyTypeAttrValue> supplyTypeAttrValueList = supplyTypeAttrValueRepository.findAll();
        assertThat(supplyTypeAttrValueList).hasSize(databaseSizeBeforeUpdate);
        SupplyTypeAttrValue testSupplyTypeAttrValue = supplyTypeAttrValueList.get(supplyTypeAttrValueList.size() - 1);
        assertThat(testSupplyTypeAttrValue.getValue()).isEqualTo(UPDATED_VALUE);
    }

    @Test
    @Transactional
    public void updateNonExistingSupplyTypeAttrValue() throws Exception {
        int databaseSizeBeforeUpdate = supplyTypeAttrValueRepository.findAll().size();

        // Create the SupplyTypeAttrValue

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSupplyTypeAttrValueMockMvc.perform(put("/api/supply-type-attr-values")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(supplyTypeAttrValue)))
            .andExpect(status().isCreated());

        // Validate the SupplyTypeAttrValue in the database
        List<SupplyTypeAttrValue> supplyTypeAttrValueList = supplyTypeAttrValueRepository.findAll();
        assertThat(supplyTypeAttrValueList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteSupplyTypeAttrValue() throws Exception {
        // Initialize the database
        supplyTypeAttrValueRepository.saveAndFlush(supplyTypeAttrValue);
        int databaseSizeBeforeDelete = supplyTypeAttrValueRepository.findAll().size();

        // Get the supplyTypeAttrValue
        restSupplyTypeAttrValueMockMvc.perform(delete("/api/supply-type-attr-values/{id}", supplyTypeAttrValue.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<SupplyTypeAttrValue> supplyTypeAttrValueList = supplyTypeAttrValueRepository.findAll();
        assertThat(supplyTypeAttrValueList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SupplyTypeAttrValue.class);
        SupplyTypeAttrValue supplyTypeAttrValue1 = new SupplyTypeAttrValue();
        supplyTypeAttrValue1.setId(1L);
        SupplyTypeAttrValue supplyTypeAttrValue2 = new SupplyTypeAttrValue();
        supplyTypeAttrValue2.setId(supplyTypeAttrValue1.getId());
        assertThat(supplyTypeAttrValue1).isEqualTo(supplyTypeAttrValue2);
        supplyTypeAttrValue2.setId(2L);
        assertThat(supplyTypeAttrValue1).isNotEqualTo(supplyTypeAttrValue2);
        supplyTypeAttrValue1.setId(null);
        assertThat(supplyTypeAttrValue1).isNotEqualTo(supplyTypeAttrValue2);
    }
}
