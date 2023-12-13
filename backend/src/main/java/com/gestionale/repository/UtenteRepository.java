package com.gestionale.repository;

import com.gestionale.model.Utente;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UtenteRepository extends CrudRepository<Utente, Integer> {

    public Optional<Utente> findByEmail(String email);
}
