import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Logs } from 'src/app/interfacce/Logs';
import { LogsService } from 'src/app/servizi/logs.service';
import { UtenteService } from 'src/app/servizi/utente.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  constructor(private utenteService: UtenteService,private logsService: LogsService, private router:Router){
    
  }

  isAdmin(){
    return this.utenteService.isAdmin();
  }
  visualizzaLogUtente(){
    this.logsService.getMyLogs().subscribe((data) => {
      this.logsService.logs = data;
      this.router.navigate(['/logs']);
    })
  }
  isLogged(){
    return this.utenteService.is_logged;
  }

  logout(){
    this.utenteService.logout()
    this.router.navigate(['/login']);
  }
}
