package ma.kayass.viet.register.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

import ma.kayass.viet.register.domain.enumeration.Grade;

/**
 * A Pratiquant.
 */
@Entity
@Table(name = "pratiquant")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "pratiquant")
public class Pratiquant implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nom")
    private String nom;

    @Column(name = "prenom")
    private String prenom;

    @Column(name = "date_naissance")
    private Instant dateNaissance;

    @Column(name = "email")
    private String email;

    @Column(name = "telephone")
    private String telephone;

    @Enumerated(EnumType.STRING)
    @Column(name = "grade")
    private Grade grade;

    @ManyToOne
    private Salle salle;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public Pratiquant nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public Pratiquant prenom(String prenom) {
        this.prenom = prenom;
        return this;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public Instant getDateNaissance() {
        return dateNaissance;
    }

    public Pratiquant dateNaissance(Instant dateNaissance) {
        this.dateNaissance = dateNaissance;
        return this;
    }

    public void setDateNaissance(Instant dateNaissance) {
        this.dateNaissance = dateNaissance;
    }

    public String getEmail() {
        return email;
    }

    public Pratiquant email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelephone() {
        return telephone;
    }

    public Pratiquant telephone(String telephone) {
        this.telephone = telephone;
        return this;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public Grade getGrade() {
        return grade;
    }

    public Pratiquant grade(Grade grade) {
        this.grade = grade;
        return this;
    }

    public void setGrade(Grade grade) {
        this.grade = grade;
    }

    public Salle getSalle() {
        return salle;
    }

    public Pratiquant salle(Salle salle) {
        this.salle = salle;
        return this;
    }

    public void setSalle(Salle salle) {
        this.salle = salle;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Pratiquant pratiquant = (Pratiquant) o;
        if (pratiquant.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), pratiquant.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Pratiquant{" +
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
