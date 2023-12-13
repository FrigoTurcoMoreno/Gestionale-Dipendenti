package com.gestionale.service;

import com.gestionale.model.Log;

import java.util.List;

public interface LogService {

    public Integer oreLavorate(Integer id_utente);

    public Log getLogAttivi(Integer id_utente);

    public Log creaLog(Integer id_utente);
    public Log aggiungiUscitalog(Integer id_log);

    public List<Log> getStoryLogs(Integer id);

    public List<Log> getMyLogs(Integer id_utente);

    List<Log> getUserLogs(Integer idAdmin, Integer idUtente);
}
