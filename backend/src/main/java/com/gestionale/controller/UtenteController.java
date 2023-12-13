package com.gestionale.controller;

import com.gestionale.model.Utente;
import com.gestionale.service.UtenteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
public class UtenteController {

    @Autowired
    private UtenteService utenteService;

    //l'id richiesto nella query string è quello dell'utente che esegue la richiesta
    //della registrazione, permessa solo se è un admin
    @PostMapping("/register/{id}")
    public Utente registraUtente(@RequestBody Utente u, @PathVariable Integer id){
        return utenteService.inserisciOAggiornaUtente(u, id);
    }

    //endpoint per la login di un utente
    @GetMapping("/login")
    public Utente loginUtente(@RequestParam String email, @RequestParam String password){
        return utenteService.getUtente(email, password);
    }


    //endpoint per vedere la lista degli utenti
    //richiedo l'id dell'utente che esegue l'operazione
    //così da permettere solo all'admin di vedere la lista completa
    @GetMapping("/utenti/{id}")
    public List<Utente> utentiList(@PathVariable Integer id){
        return utenteService.getUtenti(id);
    }

    @PutMapping("/abilitaDisabilita/{id}")
    public Utente loginUtente(@PathVariable Integer id, @RequestBody Utente utente){
        return utenteService.abilitaDisabilita(id,utente);
    }

}
