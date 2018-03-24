package ma.kayass.viet.register.repository.search;

import ma.kayass.viet.register.domain.Country;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Country entity.
 */
public interface CountrySearchRepository extends ElasticsearchRepository<Country, Long> {
}
