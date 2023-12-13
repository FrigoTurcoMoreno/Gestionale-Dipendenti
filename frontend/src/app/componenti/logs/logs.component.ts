import { Component } from '@angular/core';
import { Logs } from 'src/app/interfacce/Logs';
import { LogsService } from 'src/app/servizi/logs.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent {
  logs!: Logs[];
  constructor(private logsService: LogsService){
    
  }

  ngOnInit(): void {
    this.logs=this.logsService.logs;
  }

}
