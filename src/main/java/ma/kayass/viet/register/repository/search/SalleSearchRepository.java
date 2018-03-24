package ma.kayass.viet.register.repository.search;

import ma.kayass.viet.register.domain.Salle;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Salle entity.
 */
public interface SalleSearchRepository extends ElasticsearchRepository<Salle, Long> {
}
