package com.gestionale.service;

import com.gestionale.model.Utente;
import com.gestionale.repository.UtenteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UtenteServiceImpl implements UtenteService{

    @Autowired
    private UtenteRepository utenteRepository;

    //metodo per l'inserimento di un utente
    //per aumentare la sicurezza, si richiede nella query string
    //l'id dell'utente che esegue la richiesta, così da permetterla solo se è un admin
    @Override
    public Utente inserisciOAggiornaUtente(Utente u, Integer id) {

        Utente registratore = utenteRepository.findById(id).orElse(null);

        if (registratore != null && registratore.isAdmin()) return utenteRepository.save(u);
        else return null;
    }


    //metodo per il recupero di un utente tramite l'email e la password
    //così da fargli fare la login
    @Override
    public Utente getUtente(String email, String password) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String hashedPassword = encoder.encode(password);
        System.out.print("HASHED"+hashedPassword);
        Utente utente= utenteRepository.findByEmailAndPassword(email, password).orElse(null);
        if(utente.isAbilitato()){
            return utente;
        }else{
            return null;
        }
    }

    //metodo per il recupero di tutti gli utenti
    //richiedo l'id per controllare se a richiedere l'operazione
    //è un admin, così da decidere se permetterglielo o meno
    @Override
    public List<Utente> getUtenti(Integer id) {
        Utente u = utenteRepository.findById(id).orElse(null);

        if (u != null && u.isAdmin()) return (List<Utente>) utenteRepository.findAll();
        else return null;
    }

    @Override
    public Utente abilitaDisabilita(Integer idAdmin, Utente utente) {
        Utente admin = utenteRepository.findById(idAdmin).orElse(null);
        System.out.print(admin.getEmail());
        if(admin!=null && admin.isAdmin()){
            utente.setAbilitato(!utente.isAbilitato());
            utenteRepository.save(utente);
            return utente;
        }else{
            return null;
        }
    }


}
