import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtenteService } from 'src/app/servizi/utente.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private utenteService:UtenteService, private router:Router) {}


  formReattivo !:FormGroup;
  showError:string="email o password errati";
  errors:boolean=false;
  ngOnInit(): void {
    this.formReattivo= new FormGroup({
      email: new FormControl(null,[Validators.email,Validators.required]),
      password: new FormControl(null,[Validators.minLength(6),Validators.required])
    })
    
  }
  
  
  onSubmit(){
    console.log(this.formReattivo.value)
    this.utenteService.login(this.formReattivo.value).subscribe((utente)=>{
      if(utente){
        // console.log('logged');
        // this.utenteService.setUtente(utente);
        // this.utenteService.is_logged=true;
        // console.log(utente.id)
        this.router.navigate(['home']);
      }else{
        this.errors=true;
      }
    })
    }
}
