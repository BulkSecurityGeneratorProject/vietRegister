package ma.kayass.viet.register.repository.search;

import ma.kayass.viet.register.domain.Ville;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Ville entity.
 */
public interface VilleSearchRepository extends ElasticsearchRepository<Ville, Long> {
}
