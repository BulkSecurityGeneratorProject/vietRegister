package ma.kayass.viet.register.repository.search;

import ma.kayass.viet.register.domain.Pratiquant;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Pratiquant entity.
 */
public interface PratiquantSearchRepository extends ElasticsearchRepository<Pratiquant, Long> {
}
