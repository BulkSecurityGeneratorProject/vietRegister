package ma.kayass.viet.register.service.mapper;

import ma.kayass.viet.register.domain.*;
import ma.kayass.viet.register.service.dto.PratiquantDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Pratiquant and its DTO PratiquantDTO.
 */
@Mapper(componentModel = "spring", uses = {SalleMapper.class})
public interface PratiquantMapper extends EntityMapper<PratiquantDTO, Pratiquant> {

    @Mapping(source = "salle.id", target = "salleId")
    PratiquantDTO toDto(Pratiquant pratiquant);

    @Mapping(source = "salleId", target = "salle")
    Pratiquant toEntity(PratiquantDTO pratiquantDTO);

    default Pratiquant fromId(Long id) {
        if (id == null) {
            return null;
        }
        Pratiquant pratiquant = new Pratiquant();
        pratiquant.setId(id);
        return pratiquant;
    }
}
