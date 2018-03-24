package ma.kayass.viet.register.service;

import ma.kayass.viet.register.service.dto.PratiquantDTO;
import java.util.List;

/**
 * Service Interface for managing Pratiquant.
 */
public interface PratiquantService {

    /**
     * Save a pratiquant.
     *
     * @param pratiquantDTO the entity to save
     * @return the persisted entity
     */
    PratiquantDTO save(PratiquantDTO pratiquantDTO);

    /**
     * Get all the pratiquants.
     *
     * @return the list of entities
     */
    List<PratiquantDTO> findAll();

    /**
     * Get the "id" pratiquant.
     *
     * @param id the id of the entity
     * @return the entity
     */
    PratiquantDTO findOne(Long id);

    /**
     * Delete the "id" pratiquant.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the pratiquant corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<PratiquantDTO> search(String query);
}
