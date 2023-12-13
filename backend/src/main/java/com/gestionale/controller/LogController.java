package com.gestionale.controller;

import com.gestionale.model.Log;
import com.gestionale.service.LogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
public class LogController {

    @Autowired
    private LogService logService;

    //endpoint per vedere se un utente ha un log in corso
    @GetMapping("/oreLavorate")
    public Integer oreLavorate(@RequestParam Integer id_utente){
        return logService.oreLavorate(id_utente);
    }

    @GetMapping("/log")
    public Log logAttivo(@RequestParam Integer id_utente){
        return logService.getLogAttivi(id_utente);
    }
    @PostMapping("/log")
    public Log crealog(@RequestBody Integer id_utente ){
        System.out.println(id_utente);
        return logService.creaLog(id_utente);
    }
    @PutMapping("/log")
    public Log aggiungiUscitaLog(@RequestBody Integer id_log){

        return logService.aggiungiUscitalog(id_log);
    }
    @DeleteMapping("/log/{id_utente}")
    public boolean eliminaLog(@PathVariable Integer id_utente,@RequestParam Integer id_log){

        return logService.eliminaLog(id_log,id_utente);
    }

    @GetMapping("/logs/{id}")
    public List<Log> getStoryLogs(@PathVariable Integer id){
        return logService.getStoryLogs(id);
    }

    @GetMapping("/myLogs/{id}")
    public List<Log> getMyLogs(@PathVariable Integer id) { return logService.getMyLogs(id); }

    @GetMapping("/logsUser/{id_admin}")
    public List<Log> getUserLogs(@PathVariable Integer id_admin,@RequestParam Integer id_utente){
        return logService.getUserLogs(id_admin,id_utente);
    }
    @PostMapping("/updateHour/{id_admin}")
    public Log updateHour(@RequestBody Log log,@PathVariable Integer id_admin){

        return logService.updateHour(log,id_admin);
    }

}
