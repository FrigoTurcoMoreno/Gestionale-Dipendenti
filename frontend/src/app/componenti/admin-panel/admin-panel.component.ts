import { Component, OnInit } from "@angular/core";
import { Utente } from "src/app/interfacce/Utente";
import { UtenteService } from "src/app/servizi/utente.service";
import { Router } from "@angular/router";
import { LogsService } from "src/app/servizi/logs.service";
import { NumberSymbol } from "@angular/common";

@Component({
  selector: "app-admin-panel",
  templateUrl: "./admin-panel.component.html",
  styleUrls: ["./admin-panel.component.css"],
})
export class AdminPanelComponent implements OnInit {
  constructor(private utenteService: UtenteService, private router: Router,private logsService: LogsService) {}

  utenti!: Utente[];

  ngOnInit() {
    this.getUtenti();
  }
  getUtenti() {
    this.utenteService.getUtenti().subscribe((dato) => {
      this.utenti = dato;
    });
  }
  toRegister() {
    this.router.navigate(["/register"]);
  }

  modifica(utente: Utente) {
    this.utenteService.UserToUpdate = utente;
    this.router.navigate(["/update"]);
  }

  visualizzaLogs(id_utente:number){
    
    this.logsService.getLogsUser(id_utente).subscribe((data)=>{
      this.logsService.logs=data;
      this.router.navigate(['/logs']);
    })
   
    
  };
  storicoLogs(){
    this.logsService.getLogs().subscribe((logs) => {
      this.logsService.logs=logs;
      this.router.navigate(['/logs']);
    })
  }
  disabilita(utente: Utente) {
    this.utenteService.abilitaDisabilitaUtente(utente).subscribe((data)=>{
      console.log(data)
      this.getUtenti();
    })
  }

  abilita(utente: Utente) {
    this.utenteService.abilitaDisabilitaUtente(utente).subscribe((data)=>{
      console.log(data)
      this.getUtenti();
    })
  }

  getIdAdmin():NumberSymbol{
    return this.utenteService.getId();
  }
  
}
