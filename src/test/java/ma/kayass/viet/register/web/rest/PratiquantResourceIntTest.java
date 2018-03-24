package ma.kayass.viet.register.web.rest;

import ma.kayass.viet.register.VietRegisterApp;

import ma.kayass.viet.register.domain.Pratiquant;
import ma.kayass.viet.register.repository.PratiquantRepository;
import ma.kayass.viet.register.service.PratiquantService;
import ma.kayass.viet.register.repository.search.PratiquantSearchRepository;
import ma.kayass.viet.register.service.dto.PratiquantDTO;
import ma.kayass.viet.register.service.mapper.PratiquantMapper;
import ma.kayass.viet.register.web.rest.errors.ExceptionTranslator;

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

import static ma.kayass.viet.register.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import ma.kayass.viet.register.domain.enumeration.Grade;
/**
 * Test class for the PratiquantResource REST controller.
 *
 * @see PratiquantResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = VietRegisterApp.class)
public class PratiquantResourceIntTest {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final String DEFAULT_PRENOM = "AAAAAAAAAA";
    private static final String UPDATED_PRENOM = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATE_NAISSANCE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_NAISSANCE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_TELEPHONE = "AAAAAAAAAA";
    private static final String UPDATED_TELEPHONE = "BBBBBBBBBB";

    private static final Grade DEFAULT_GRADE = Grade.CAP0;
    private static final Grade UPDATED_GRADE = Grade.CAP1;

    @Autowired
    private PratiquantRepository pratiquantRepository;

    @Autowired
    private PratiquantMapper pratiquantMapper;

    @Autowired
    private PratiquantService pratiquantService;

    @Autowired
    private PratiquantSearchRepository pratiquantSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPratiquantMockMvc;

    private Pratiquant pratiquant;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PratiquantResource pratiquantResource = new PratiquantResource(pratiquantService);
        this.restPratiquantMockMvc = MockMvcBuilders.standaloneSetup(pratiquantResource)
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
    public static Pratiquant createEntity(EntityManager em) {
        Pratiquant pratiquant = new Pratiquant()
            .nom(DEFAULT_NOM)
            .prenom(DEFAULT_PRENOM)
            .dateNaissance(DEFAULT_DATE_NAISSANCE)
            .email(DEFAULT_EMAIL)
            .telephone(DEFAULT_TELEPHONE)
            .grade(DEFAULT_GRADE);
        return pratiquant;
    }

    @Before
    public void initTest() {
        pratiquantSearchRepository.deleteAll();
        pratiquant = createEntity(em);
    }

    @Test
    @Transactional
    public void createPratiquant() throws Exception {
        int databaseSizeBeforeCreate = pratiquantRepository.findAll().size();

        // Create the Pratiquant
        PratiquantDTO pratiquantDTO = pratiquantMapper.toDto(pratiquant);
        restPratiquantMockMvc.perform(post("/api/pratiquants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pratiquantDTO)))
            .andExpect(status().isCreated());

        // Validate the Pratiquant in the database
        List<Pratiquant> pratiquantList = pratiquantRepository.findAll();
        assertThat(pratiquantList).hasSize(databaseSizeBeforeCreate + 1);
        Pratiquant testPratiquant = pratiquantList.get(pratiquantList.size() - 1);
        assertThat(testPratiquant.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testPratiquant.getPrenom()).isEqualTo(DEFAULT_PRENOM);
        assertThat(testPratiquant.getDateNaissance()).isEqualTo(DEFAULT_DATE_NAISSANCE);
        assertThat(testPratiquant.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testPratiquant.getTelephone()).isEqualTo(DEFAULT_TELEPHONE);
        assertThat(testPratiquant.getGrade()).isEqualTo(DEFAULT_GRADE);

        // Validate the Pratiquant in Elasticsearch
        Pratiquant pratiquantEs = pratiquantSearchRepository.findOne(testPratiquant.getId());
        assertThat(pratiquantEs).isEqualToIgnoringGivenFields(testPratiquant);
    }

    @Test
    @Transactional
    public void createPratiquantWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = pratiquantRepository.findAll().size();

        // Create the Pratiquant with an existing ID
        pratiquant.setId(1L);
        PratiquantDTO pratiquantDTO = pratiquantMapper.toDto(pratiquant);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPratiquantMockMvc.perform(post("/api/pratiquants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pratiquantDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Pratiquant in the database
        List<Pratiquant> pratiquantList = pratiquantRepository.findAll();
        assertThat(pratiquantList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPratiquants() throws Exception {
        // Initialize the database
        pratiquantRepository.saveAndFlush(pratiquant);

        // Get all the pratiquantList
        restPratiquantMockMvc.perform(get("/api/pratiquants?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pratiquant.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM.toString())))
            .andExpect(jsonPath("$.[*].prenom").value(hasItem(DEFAULT_PRENOM.toString())))
            .andExpect(jsonPath("$.[*].dateNaissance").value(hasItem(DEFAULT_DATE_NAISSANCE.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].telephone").value(hasItem(DEFAULT_TELEPHONE.toString())))
            .andExpect(jsonPath("$.[*].grade").value(hasItem(DEFAULT_GRADE.toString())));
    }

    @Test
    @Transactional
    public void getPratiquant() throws Exception {
        // Initialize the database
        pratiquantRepository.saveAndFlush(pratiquant);

        // Get the pratiquant
        restPratiquantMockMvc.perform(get("/api/pratiquants/{id}", pratiquant.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(pratiquant.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM.toString()))
            .andExpect(jsonPath("$.prenom").value(DEFAULT_PRENOM.toString()))
            .andExpect(jsonPath("$.dateNaissance").value(DEFAULT_DATE_NAISSANCE.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.telephone").value(DEFAULT_TELEPHONE.toString()))
            .andExpect(jsonPath("$.grade").value(DEFAULT_GRADE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPratiquant() throws Exception {
        // Get the pratiquant
        restPratiquantMockMvc.perform(get("/api/pratiquants/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePratiquant() throws Exception {
        // Initialize the database
        pratiquantRepository.saveAndFlush(pratiquant);
        pratiquantSearchRepository.save(pratiquant);
        int databaseSizeBeforeUpdate = pratiquantRepository.findAll().size();

        // Update the pratiquant
        Pratiquant updatedPratiquant = pratiquantRepository.findOne(pratiquant.getId());
        // Disconnect from session so that the updates on updatedPratiquant are not directly saved in db
        em.detach(updatedPratiquant);
        updatedPratiquant
            .nom(UPDATED_NOM)
            .prenom(UPDATED_PRENOM)
            .dateNaissance(UPDATED_DATE_NAISSANCE)
            .email(UPDATED_EMAIL)
            .telephone(UPDATED_TELEPHONE)
            .grade(UPDATED_GRADE);
        PratiquantDTO pratiquantDTO = pratiquantMapper.toDto(updatedPratiquant);

        restPratiquantMockMvc.perform(put("/api/pratiquants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pratiquantDTO)))
            .andExpect(status().isOk());

        // Validate the Pratiquant in the database
        List<Pratiquant> pratiquantList = pratiquantRepository.findAll();
        assertThat(pratiquantList).hasSize(databaseSizeBeforeUpdate);
        Pratiquant testPratiquant = pratiquantList.get(pratiquantList.size() - 1);
        assertThat(testPratiquant.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testPratiquant.getPrenom()).isEqualTo(UPDATED_PRENOM);
        assertThat(testPratiquant.getDateNaissance()).isEqualTo(UPDATED_DATE_NAISSANCE);
        assertThat(testPratiquant.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testPratiquant.getTelephone()).isEqualTo(UPDATED_TELEPHONE);
        assertThat(testPratiquant.getGrade()).isEqualTo(UPDATED_GRADE);

        // Validate the Pratiquant in Elasticsearch
        Pratiquant pratiquantEs = pratiquantSearchRepository.findOne(testPratiquant.getId());
        assertThat(pratiquantEs).isEqualToIgnoringGivenFields(testPratiquant);
    }

    @Test
    @Transactional
    public void updateNonExistingPratiquant() throws Exception {
        int databaseSizeBeforeUpdate = pratiquantRepository.findAll().size();

        // Create the Pratiquant
        PratiquantDTO pratiquantDTO = pratiquantMapper.toDto(pratiquant);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPratiquantMockMvc.perform(put("/api/pratiquants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pratiquantDTO)))
            .andExpect(status().isCreated());

        // Validate the Pratiquant in the database
        List<Pratiquant> pratiquantList = pratiquantRepository.findAll();
        assertThat(pratiquantList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deletePratiquant() throws Exception {
        // Initialize the database
        pratiquantRepository.saveAndFlush(pratiquant);
        pratiquantSearchRepository.save(pratiquant);
        int databaseSizeBeforeDelete = pratiquantRepository.findAll().size();

        // Get the pratiquant
        restPratiquantMockMvc.perform(delete("/api/pratiquants/{id}", pratiquant.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean pratiquantExistsInEs = pratiquantSearchRepository.exists(pratiquant.getId());
        assertThat(pratiquantExistsInEs).isFalse();

        // Validate the database is empty
        List<Pratiquant> pratiquantList = pratiquantRepository.findAll();
        assertThat(pratiquantList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchPratiquant() throws Exception {
        // Initialize the database
        pratiquantRepository.saveAndFlush(pratiquant);
        pratiquantSearchRepository.save(pratiquant);

        // Search the pratiquant
        restPratiquantMockMvc.perform(get("/api/_search/pratiquants?query=id:" + pratiquant.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pratiquant.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM.toString())))
            .andExpect(jsonPath("$.[*].prenom").value(hasItem(DEFAULT_PRENOM.toString())))
            .andExpect(jsonPath("$.[*].dateNaissance").value(hasItem(DEFAULT_DATE_NAISSANCE.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].telephone").value(hasItem(DEFAULT_TELEPHONE.toString())))
            .andExpect(jsonPath("$.[*].grade").value(hasItem(DEFAULT_GRADE.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Pratiquant.class);
        Pratiquant pratiquant1 = new Pratiquant();
        pratiquant1.setId(1L);
        Pratiquant pratiquant2 = new Pratiquant();
        pratiquant2.setId(pratiquant1.getId());
        assertThat(pratiquant1).isEqualTo(pratiquant2);
        pratiquant2.setId(2L);
        assertThat(pratiquant1).isNotEqualTo(pratiquant2);
        pratiquant1.setId(null);
        assertThat(pratiquant1).isNotEqualTo(pratiquant2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PratiquantDTO.class);
        PratiquantDTO pratiquantDTO1 = new PratiquantDTO();
        pratiquantDTO1.setId(1L);
        PratiquantDTO pratiquantDTO2 = new PratiquantDTO();
        assertThat(pratiquantDTO1).isNotEqualTo(pratiquantDTO2);
        pratiquantDTO2.setId(pratiquantDTO1.getId());
        assertThat(pratiquantDTO1).isEqualTo(pratiquantDTO2);
        pratiquantDTO2.setId(2L);
        assertThat(pratiquantDTO1).isNotEqualTo(pratiquantDTO2);
        pratiquantDTO1.setId(null);
        assertThat(pratiquantDTO1).isNotEqualTo(pratiquantDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(pratiquantMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(pratiquantMapper.fromId(null)).isNull();
    }
}
