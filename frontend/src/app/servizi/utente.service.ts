import { Injectable } from '@angular/core';
import { Utente } from '../interfacce/Utente';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

const url = 'http://localhost:8080';


@Injectable({
  providedIn: 'root'
})
export class UtenteService {
  constructor( private http: HttpClient ) {}
  httpOptions = {
    headers: new HttpHeaders({ 
      'Access-Control-Allow-Origin':'*'
    })
  };
  private utente?:Utente;
  is_logged:boolean=false;
  UserToUpdate!: Utente;
  

  register( user:any ): Observable<any> {
    
    return this.http.post(url + '/register/'+this.getId(), user,this.httpOptions)
  }

  login(utente:{email:string,password:string}): Observable<any>{
    const params={
      email:utente.email,
      password:utente.password
    }
    return this.http.get<Utente>( url + '/login',{params} ).pipe(
      tap(data => {
        if(data){
          this.utente=data;
          this.is_logged=true;
        }
      })
    );
  }

  getUtenti(): Observable<any> {
    return this.http.get(url + "/utenti/" + this.getId());
  }
  isAbilitato(): boolean {
    return this.utente!.abilitato;
  }

  isAdmin(): boolean {
    return this.utente!.admin;
  }
  setUtente(utente: Utente){
    this.utente=utente;
  }
  getId(){
    return this.utente!.id;
  }
  getUtente() {
    return this.utente;
  }

  modificaUtente() {}

  updateUtente(user: any): Observable<any> {
    return this.http.put(
      url + "/update/" + this.getId(),
      user,
      this.httpOptions
    );
  }
  abilitaDisabilitaUtente(user: Utente): Observable<any> {
    console.log("dis")
    return this.http.put(
      url + "/abilitaDisabilita/" + this.getId(),
      user,
      this.httpOptions
    );
  }

  logout(){
    this.utente = undefined
    this.is_logged = false
  }
}
