package ma.kayass.viet.register.service.impl;

import ma.kayass.viet.register.service.VilleService;
import ma.kayass.viet.register.domain.Ville;
import ma.kayass.viet.register.repository.VilleRepository;
import ma.kayass.viet.register.repository.search.VilleSearchRepository;
import ma.kayass.viet.register.service.dto.VilleDTO;
import ma.kayass.viet.register.service.mapper.VilleMapper;
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
 * Service Implementation for managing Ville.
 */
@Service
@Transactional
public class VilleServiceImpl implements VilleService {

    private final Logger log = LoggerFactory.getLogger(VilleServiceImpl.class);

    private final VilleRepository villeRepository;

    private final VilleMapper villeMapper;

    private final VilleSearchRepository villeSearchRepository;

    public VilleServiceImpl(VilleRepository villeRepository, VilleMapper villeMapper, VilleSearchRepository villeSearchRepository) {
        this.villeRepository = villeRepository;
        this.villeMapper = villeMapper;
        this.villeSearchRepository = villeSearchRepository;
    }

    /**
     * Save a ville.
     *
     * @param villeDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public VilleDTO save(VilleDTO villeDTO) {
        log.debug("Request to save Ville : {}", villeDTO);
        Ville ville = villeMapper.toEntity(villeDTO);
        ville = villeRepository.save(ville);
        VilleDTO result = villeMapper.toDto(ville);
        villeSearchRepository.save(ville);
        return result;
    }

    /**
     * Get all the villes.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<VilleDTO> findAll() {
        log.debug("Request to get all Villes");
        return villeRepository.findAll().stream()
            .map(villeMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one ville by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public VilleDTO findOne(Long id) {
        log.debug("Request to get Ville : {}", id);
        Ville ville = villeRepository.findOne(id);
        return villeMapper.toDto(ville);
    }

    /**
     * Delete the ville by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Ville : {}", id);
        villeRepository.delete(id);
        villeSearchRepository.delete(id);
    }

    /**
     * Search for the ville corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<VilleDTO> search(String query) {
        log.debug("Request to search Villes for query {}", query);
        return StreamSupport
            .stream(villeSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(villeMapper::toDto)
            .collect(Collectors.toList());
    }
}
