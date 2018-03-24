package ma.kayass.viet.register.service.impl;

import ma.kayass.viet.register.service.SalleService;
import ma.kayass.viet.register.domain.Salle;
import ma.kayass.viet.register.repository.SalleRepository;
import ma.kayass.viet.register.repository.search.SalleSearchRepository;
import ma.kayass.viet.register.service.dto.SalleDTO;
import ma.kayass.viet.register.service.mapper.SalleMapper;
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
 * Service Implementation for managing Salle.
 */
@Service
@Transactional
public class SalleServiceImpl implements SalleService {

    private final Logger log = LoggerFactory.getLogger(SalleServiceImpl.class);

    private final SalleRepository salleRepository;

    private final SalleMapper salleMapper;

    private final SalleSearchRepository salleSearchRepository;

    public SalleServiceImpl(SalleRepository salleRepository, SalleMapper salleMapper, SalleSearchRepository salleSearchRepository) {
        this.salleRepository = salleRepository;
        this.salleMapper = salleMapper;
        this.salleSearchRepository = salleSearchRepository;
    }

    /**
     * Save a salle.
     *
     * @param salleDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public SalleDTO save(SalleDTO salleDTO) {
        log.debug("Request to save Salle : {}", salleDTO);
        Salle salle = salleMapper.toEntity(salleDTO);
        salle = salleRepository.save(salle);
        SalleDTO result = salleMapper.toDto(salle);
        salleSearchRepository.save(salle);
        return result;
    }

    /**
     * Get all the salles.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<SalleDTO> findAll() {
        log.debug("Request to get all Salles");
        return salleRepository.findAll().stream()
            .map(salleMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one salle by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public SalleDTO findOne(Long id) {
        log.debug("Request to get Salle : {}", id);
        Salle salle = salleRepository.findOne(id);
        return salleMapper.toDto(salle);
    }

    /**
     * Delete the salle by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Salle : {}", id);
        salleRepository.delete(id);
        salleSearchRepository.delete(id);
    }

    /**
     * Search for the salle corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<SalleDTO> search(String query) {
        log.debug("Request to search Salles for query {}", query);
        return StreamSupport
            .stream(salleSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(salleMapper::toDto)
            .collect(Collectors.toList());
    }
}
