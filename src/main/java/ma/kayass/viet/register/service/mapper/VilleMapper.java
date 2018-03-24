package ma.kayass.viet.register.service.mapper;

import ma.kayass.viet.register.domain.*;
import ma.kayass.viet.register.service.dto.VilleDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Ville and its DTO VilleDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface VilleMapper extends EntityMapper<VilleDTO, Ville> {


    @Mapping(target = "salles", ignore = true)
    Ville toEntity(VilleDTO villeDTO);

    default Ville fromId(Long id) {
        if (id == null) {
            return null;
        }
        Ville ville = new Ville();
        ville.setId(id);
        return ville;
    }
}
