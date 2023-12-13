package com.gestionale.service;

import com.gestionale.model.Log;

import com.gestionale.model.Utente;
import com.gestionale.repository.LogRepository;

import com.gestionale.repository.UtenteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class LogServiceImpl implements LogService{

    @Autowired
    private LogRepository logRepository;
    @Autowired
    private UtenteRepository utenteRepository;

    @Override
    public Log getLogAttivi(Integer id_utente) {
        Optional<Log> logAttivo= logRepository.logAttivo(id_utente);
        if(logAttivo.isPresent()){
            return logAttivo.get();
        }else{
            return null;
        }
    }

    @Override
    public Log creaLog(Integer id_utente) {
        if(utenteRepository.findById(id_utente).isPresent()){
            Log log= new Log(new Date(),null,utenteRepository.findById(id_utente).get());
            logRepository.save(log);
            return log;
        }else{
            return null;
        }
    }

    @Override
    public Log aggiungiUscitalog(Integer id_log) {
        Optional<Log> logToUpdate= logRepository.findById(id_log);
        if(logToUpdate.isPresent()){
            Log update=logToUpdate.get();
            update.setUscita(new Date());
            logRepository.save(update);
            return update;
        }
        return null;
    }

    @Override
    public List<Log> getStoryLogs(Integer id) {
        Utente u = utenteRepository.findById(id).orElse(null);
        if (u != null && u.isAdmin()) return logRepository.getStoryLogs();
        else return null;
    }

    @Override
    public List<Log> getMyLogs(Integer id_utente) {
        return logRepository.getMyLogs(id_utente);
    }

    @Override
    public List<Log> getUserLogs(Integer idAdmin, Integer idUtente) {
        if(utenteRepository.findById(idAdmin).isPresent() && utenteRepository.findById(idAdmin).get().isAdmin()){
            return logRepository.getMyLogs(idUtente);
        }else{
            return null;
        }
    }


}
