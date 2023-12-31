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
    public boolean eliminaLog(Integer id_log,Integer id_utente){
        Utente utenteAdmin= utenteRepository.findById(id_utente).orElse(null);
        if(utenteAdmin!=null && utenteAdmin.isAdmin() && utenteAdmin.isAbilitato() && logRepository.findById(id_log).isPresent()){
            logRepository.deleteById(id_log);
            return true;
        }else{
            return false;
        }
    }

    @Override
    public Integer oreLavorate(Integer id_utente) {
        return logRepository.getHourInMonth(id_utente);
    }

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

    @Override
    public Log updateHour(Log log,Integer id_admin) {
        if(utenteRepository.findById(id_admin).isPresent() && utenteRepository.findById(id_admin).get().isAdmin()) {
            Log updateLog = logRepository.findById(log.getId()).orElse(null);
            if (updateLog != null) {
                updateLog.setUscita(log.getUscita());
                updateLog.setEntrata(log.getEntrata());
                logRepository.save(updateLog);
            }
            return updateLog;
        }else{
            return null;
        }
    }
}
