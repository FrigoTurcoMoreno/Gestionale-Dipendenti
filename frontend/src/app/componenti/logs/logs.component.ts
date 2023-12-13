import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Logs } from 'src/app/interfacce/Logs';
import { LogsService } from 'src/app/servizi/logs.service';
import { UtenteService } from 'src/app/servizi/utente.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent {
  logs!: Logs[];
  idLogToUpdate?:number;
  oraDataUscitaModificata?:string;
  oraDataEntrataModificata?:string;
  constructor(private logsService: LogsService,private utenteService:UtenteService,private router:Router){
    
  }

  ngOnInit(): void {
    this.logs=this.logsService.logs;
    for(let i=0;i<this.logs.length;i++){
      this.logs[i].entrata=new Date(this.logs[0].entrata);
      this.logs[i].uscita=new Date(this.logs[0].uscita);
      
    }
  }
  isAdmin():boolean{
    return this.utenteService.isAdmin();
  }
  cancellaLog(id_log:number){
    this.logsService.cancellaLog(id_log).subscribe((result)=>{
      if(result){
        console.log("eliminato correttamente")
        this.router.navigate(['/logsAdminPanel'])
      }else{
        console.log("non eliminato correttamente")
      }
    })
  }
  updateHour(id_log:number){
    this.idLogToUpdate=id_log;
    let log = this.logs.find((element) => element.id === this.idLogToUpdate);
    if(log){
    this.oraDataUscitaModificata=this.formatOra(log?.uscita);
    this.oraDataEntrataModificata=this.formatOra(log.entrata);
    }
 
  }


  formatOra(date:Date):string{
    let hour=""+date.getHours();
      if(date.getHours()<10){
        hour="0"+hour;
      }
      let minutes=""+date.getMinutes();
      if(date.getMinutes()<10){
        minutes="0"+minutes;
      }
      return hour+":"+minutes;
  }
  updateDate(){
    console.log(this.oraDataUscitaModificata)
    console.log(this.oraDataEntrataModificata)
    let savedLog=this.logs.find((element) => element.id === this.idLogToUpdate)
    let savedDateEntrata;
    let savedDateUscita;
    if(savedLog){
      savedDateEntrata=new Date(savedLog?.entrata);
      savedDateUscita=new Date(savedLog?.uscita);
    }
    let log = this.logs.find((element) => element.id === this.idLogToUpdate);
    if(log){
      log.entrata.setHours(Number(this.oraDataEntrataModificata?.substring(0,2)));
      log.entrata.setMinutes(Number(this.oraDataEntrataModificata?.substring(3)));
      log.uscita.setHours(Number(this.oraDataUscitaModificata?.substring(0,2)));
      log.uscita.setMinutes(Number(this.oraDataUscitaModificata?.substring(3)));
      if(log.entrata<log.uscita){
        this.logsService.cambiaData(log).subscribe((data)=>{
          console.log(data);
        })

      }else if(savedDateEntrata && savedDateUscita){
        log.entrata=savedDateEntrata;
        log.uscita=savedDateUscita;
      }
      this.idLogToUpdate=undefined;
      this.oraDataEntrataModificata=undefined;
      this.oraDataUscitaModificata=undefined;
      
  }

  }
}
