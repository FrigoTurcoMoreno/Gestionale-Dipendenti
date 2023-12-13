package com.gestionale.service;

import com.gestionale.model.Utente;

import java.util.List;

public interface UtenteService {

    public Utente inserisciOAggiornaUtente(Utente u, Integer id);

    public Utente getUtente(String email, String password);

    public List<Utente> getUtenti(Integer id);

    Utente abilitaDisabilita(Integer idAdmin, Utente utente);
}
