package ma.kayass.viet.register.repository;

import ma.kayass.viet.register.domain.Department;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Department entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {

}
