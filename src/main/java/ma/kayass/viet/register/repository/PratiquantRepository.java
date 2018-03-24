package ma.kayass.viet.register.repository;

import ma.kayass.viet.register.domain.Pratiquant;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Pratiquant entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PratiquantRepository extends JpaRepository<Pratiquant, Long> {

}
