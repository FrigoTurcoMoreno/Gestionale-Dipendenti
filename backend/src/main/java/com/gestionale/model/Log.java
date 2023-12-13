package com.gestionale.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = "logs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Log {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private int id;

    @Column
    private Date entrata;

    @Column
    private Date uscita;

    @ManyToOne
    @JoinColumn(name = "id_utente")
    private Utente u;

    public Log(Date entrata,Date uscita,Utente u){
        this.entrata=entrata;
        this.uscita=uscita;
        this.u=u;
    }
}
