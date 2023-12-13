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
  constructor(private logsService: LogsService,private utenteService:UtenteService,private router:Router){
    
  }

  ngOnInit(): void {
    this.logs=this.logsService.logs;
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

}
