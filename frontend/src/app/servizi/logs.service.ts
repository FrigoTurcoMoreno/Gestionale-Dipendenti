import { Injectable, OnInit } from '@angular/core';
import { Logs } from '../interfacce/Logs';
import { HttpClient } from '@angular/common/http';
import { UtenteService } from './utente.service';
import { Observable, tap } from 'rxjs';

const url = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class LogsService{
  constructor( private http: HttpClient ,private utenteService:UtenteService) {}
  private log?:Logs;
  logs!:Logs[];

  getSaveLog(){
    return this.log;
  }

  getLogBE():Observable<any>{
    const params={
      id_utente:this.utenteService.getId()
    }
    return this.http.get<Logs>(url+'/log',{params}).pipe( //se non ha log attivo mi da null
      tap(data => {
        console.log(data)
        if(data){
          this.log=data;
        }
      })
    );
  }

  getLogs():Observable<any>{
    return this.http.get<Logs>(url+'/logs/'+this.utenteService.getId())
  }

  getLogsUser(id_utente:number):Observable<any>{
    const params={
      id_utente:id_utente
    }
    return this.http.get<Logs[]>(url+'/logsUser/'+this.utenteService.getId(),{params});
  }

  entra():Observable<any>{
    return this.http.post<Logs>(url+'/log',this.utenteService.getId()).pipe( 
    tap(data => {
      console.log(data)
      this.log=data;
    })
    )
  }
  esci():Observable<any>{
    return this.http.put<Logs>(url+'/log',this.log?.id).pipe( 
    tap(data => {
      if(data){
        this.log=undefined;
      }
    })
    )
  }
  getMyLogs():Observable<any>{
    return this.http.get<Logs>(url+'/myLogs/'+this.utenteService.getId());
  }
  getOreMensili():Observable<number>{
    const params={
      id_utente:this.utenteService.getId()
    }
    return this.http.get<number>(url+'/oreLavorate',{params});
  }


}
