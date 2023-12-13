import { Utente } from "./Utente";

export interface Logs{
  id:number;
  entrata:Date;
  uscita:Date;
  u:Utente;
}
