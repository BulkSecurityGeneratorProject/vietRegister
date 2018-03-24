package ma.kayass.viet.register.service.dto;


import java.time.Instant;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import ma.kayass.viet.register.domain.enumeration.Grade;

/**
 * A DTO for the Pratiquant entity.
 */
public class PratiquantDTO implements Serializable {

    private Long id;

    private String nom;

    private String prenom;

    private Instant dateNaissance;

    private String email;

    private String telephone;

    private Grade grade;

    private Long salleId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public Instant getDateNaissance() {
        return dateNaissance;
    }

    public void setDateNaissance(Instant dateNaissance) {
        this.dateNaissance = dateNaissance;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public Grade getGrade() {
        return grade;
    }

    public void setGrade(Grade grade) {
        this.grade = grade;
    }

    public Long getSalleId() {
        return salleId;
    }

    public void setSalleId(Long salleId) {
        this.salleId = salleId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        PratiquantDTO pratiquantDTO = (PratiquantDTO) o;
        if(pratiquantDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), pratiquantDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PratiquantDTO{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", prenom='" + getPrenom() + "'" +
            ", dateNaissance='" + getDateNaissance() + "'" +
            ", email='" + getEmail() + "'" +
            ", telephone='" + getTelephone() + "'" +
            ", grade='" + getGrade() + "'" +
            "}";
    }
}
