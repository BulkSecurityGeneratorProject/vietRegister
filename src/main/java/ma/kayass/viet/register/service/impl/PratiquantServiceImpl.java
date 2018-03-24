package ma.kayass.viet.register.service.impl;

import ma.kayass.viet.register.service.PratiquantService;
import ma.kayass.viet.register.domain.Pratiquant;
import ma.kayass.viet.register.repository.PratiquantRepository;
import ma.kayass.viet.register.repository.search.PratiquantSearchRepository;
import ma.kayass.viet.register.service.dto.PratiquantDTO;
import ma.kayass.viet.register.service.mapper.PratiquantMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Pratiquant.
 */
@Service
@Transactional
public class PratiquantServiceImpl implements PratiquantService {

    private final Logger log = LoggerFactory.getLogger(PratiquantServiceImpl.class);

    private final PratiquantRepository pratiquantRepository;

    private final PratiquantMapper pratiquantMapper;

    private final PratiquantSearchRepository pratiquantSearchRepository;

    public PratiquantServiceImpl(PratiquantRepository pratiquantRepository, PratiquantMapper pratiquantMapper, PratiquantSearchRepository pratiquantSearchRepository) {
        this.pratiquantRepository = pratiquantRepository;
        this.pratiquantMapper = pratiquantMapper;
        this.pratiquantSearchRepository = pratiquantSearchRepository;
    }

    /**
     * Save a pratiquant.
     *
     * @param pratiquantDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public PratiquantDTO save(PratiquantDTO pratiquantDTO) {
        log.debug("Request to save Pratiquant : {}", pratiquantDTO);
        Pratiquant pratiquant = pratiquantMapper.toEntity(pratiquantDTO);
        pratiquant = pratiquantRepository.save(pratiquant);
        PratiquantDTO result = pratiquantMapper.toDto(pratiquant);
        pratiquantSearchRepository.save(pratiquant);
        return result;
    }

    /**
     * Get all the pratiquants.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<PratiquantDTO> findAll() {
        log.debug("Request to get all Pratiquants");
        return pratiquantRepository.findAll().stream()
            .map(pratiquantMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one pratiquant by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public PratiquantDTO findOne(Long id) {
        log.debug("Request to get Pratiquant : {}", id);
        Pratiquant pratiquant = pratiquantRepository.findOne(id);
        return pratiquantMapper.toDto(pratiquant);
    }

    /**
     * Delete the pratiquant by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Pratiquant : {}", id);
        pratiquantRepository.delete(id);
        pratiquantSearchRepository.delete(id);
    }

    /**
     * Search for the pratiquant corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<PratiquantDTO> search(String query) {
        log.debug("Request to search Pratiquants for query {}", query);
        return StreamSupport
            .stream(pratiquantSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(pratiquantMapper::toDto)
            .collect(Collectors.toList());
    }
}
