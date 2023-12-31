package com.gestionale.repository;

import com.gestionale.model.Log;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LogRepository extends CrudRepository<Log, Integer> {

    @Query(value = "select * from logs  where id_utente= ?1  AND (entrata IS NOT NULL AND uscita IS NULL) LIMIT 1", nativeQuery = true)
    public Optional<Log> logAttivo(Integer id_utente);

    @Query(value = "SELECT * FROM logs WHERE uscita IS NOT NULL", nativeQuery = true)
    public List<Log> getStoryLogs();

    @Query(value = "SELECT * FROM logs WHERE id_utente = ?1 AND uscita IS NOT NULL", nativeQuery = true)
    public List<Log> getMyLogs(Integer id_utente);

    @Query(value="SELECT SUM(TIME_TO_SEC(TIMEDIFF(uscita, entrata))) / 3600 AS ore_lavorate FROM logs WHERE id_utente = ?1  AND YEAR(uscita) = YEAR(CURDATE()) AND MONTH(uscita) = MONTH(CURDATE()) GROUP BY id_utente, MONTH(uscita);",nativeQuery = true)
    public Integer getHourInMonth(Integer id_utente);
}
