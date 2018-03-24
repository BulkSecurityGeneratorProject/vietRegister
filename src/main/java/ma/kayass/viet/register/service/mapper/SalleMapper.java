package ma.kayass.viet.register.service.mapper;

import ma.kayass.viet.register.domain.*;
import ma.kayass.viet.register.service.dto.SalleDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Salle and its DTO SalleDTO.
 */
@Mapper(componentModel = "spring", uses = {VilleMapper.class})
public interface SalleMapper extends EntityMapper<SalleDTO, Salle> {

    @Mapping(source = "ville.id", target = "villeId")
    SalleDTO toDto(Salle salle);

    @Mapping(source = "villeId", target = "ville")
    @Mapping(target = "pratiquants", ignore = true)
    Salle toEntity(SalleDTO salleDTO);

    default Salle fromId(Long id) {
        if (id == null) {
            return null;
        }
        Salle salle = new Salle();
        salle.setId(id);
        return salle;
    }
}
