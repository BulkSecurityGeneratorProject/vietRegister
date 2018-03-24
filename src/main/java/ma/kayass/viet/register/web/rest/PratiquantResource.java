package ma.kayass.viet.register.web.rest;

import com.codahale.metrics.annotation.Timed;
import ma.kayass.viet.register.service.PratiquantService;
import ma.kayass.viet.register.web.rest.errors.BadRequestAlertException;
import ma.kayass.viet.register.web.rest.util.HeaderUtil;
import ma.kayass.viet.register.service.dto.PratiquantDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Pratiquant.
 */
@RestController
@RequestMapping("/api")
public class PratiquantResource {

    private final Logger log = LoggerFactory.getLogger(PratiquantResource.class);

    private static final String ENTITY_NAME = "pratiquant";

    private final PratiquantService pratiquantService;

    public PratiquantResource(PratiquantService pratiquantService) {
        this.pratiquantService = pratiquantService;
    }

    /**
     * POST  /pratiquants : Create a new pratiquant.
     *
     * @param pratiquantDTO the pratiquantDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new pratiquantDTO, or with status 400 (Bad Request) if the pratiquant has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/pratiquants")
    @Timed
    public ResponseEntity<PratiquantDTO> createPratiquant(@RequestBody PratiquantDTO pratiquantDTO) throws URISyntaxException {
        log.debug("REST request to save Pratiquant : {}", pratiquantDTO);
        if (pratiquantDTO.getId() != null) {
            throw new BadRequestAlertException("A new pratiquant cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PratiquantDTO result = pratiquantService.save(pratiquantDTO);
        return ResponseEntity.created(new URI("/api/pratiquants/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /pratiquants : Updates an existing pratiquant.
     *
     * @param pratiquantDTO the pratiquantDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated pratiquantDTO,
     * or with status 400 (Bad Request) if the pratiquantDTO is not valid,
     * or with status 500 (Internal Server Error) if the pratiquantDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/pratiquants")
    @Timed
    public ResponseEntity<PratiquantDTO> updatePratiquant(@RequestBody PratiquantDTO pratiquantDTO) throws URISyntaxException {
        log.debug("REST request to update Pratiquant : {}", pratiquantDTO);
        if (pratiquantDTO.getId() == null) {
            return createPratiquant(pratiquantDTO);
        }
        PratiquantDTO result = pratiquantService.save(pratiquantDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, pratiquantDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /pratiquants : get all the pratiquants.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of pratiquants in body
     */
    @GetMapping("/pratiquants")
    @Timed
    public List<PratiquantDTO> getAllPratiquants() {
        log.debug("REST request to get all Pratiquants");
        return pratiquantService.findAll();
        }

    /**
     * GET  /pratiquants/:id : get the "id" pratiquant.
     *
     * @param id the id of the pratiquantDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the pratiquantDTO, or with status 404 (Not Found)
     */
    @GetMapping("/pratiquants/{id}")
    @Timed
    public ResponseEntity<PratiquantDTO> getPratiquant(@PathVariable Long id) {
        log.debug("REST request to get Pratiquant : {}", id);
        PratiquantDTO pratiquantDTO = pratiquantService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(pratiquantDTO));
    }

    /**
     * DELETE  /pratiquants/:id : delete the "id" pratiquant.
     *
     * @param id the id of the pratiquantDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/pratiquants/{id}")
    @Timed
    public ResponseEntity<Void> deletePratiquant(@PathVariable Long id) {
        log.debug("REST request to delete Pratiquant : {}", id);
        pratiquantService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/pratiquants?query=:query : search for the pratiquant corresponding
     * to the query.
     *
     * @param query the query of the pratiquant search
     * @return the result of the search
     */
    @GetMapping("/_search/pratiquants")
    @Timed
    public List<PratiquantDTO> searchPratiquants(@RequestParam String query) {
        log.debug("REST request to search Pratiquants for query {}", query);
        return pratiquantService.search(query);
    }

}
