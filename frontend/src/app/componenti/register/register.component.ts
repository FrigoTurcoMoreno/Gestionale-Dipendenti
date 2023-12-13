import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtenteService } from 'src/app/servizi/utente.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private utenteService:UtenteService, private router:Router) {}


  formReattivo !:FormGroup;
  
  ngOnInit(): void {
    this.formReattivo= new FormGroup({
      email: new FormControl(null,[Validators.email,Validators.required]),
      password: new FormControl(null,[Validators.minLength(6),Validators.required]),
      nome: new FormControl(null,[Validators.minLength(2),Validators.required]),
      cognome: new FormControl(null,[Validators.minLength(2),Validators.required]),
      admin: new FormControl(false), 
    })
    
  }
  
  onSubmit(){
    console.log(this.formReattivo.value)
    this.utenteService.register(this.formReattivo.value).subscribe((utente)=>{
      if(utente){
        this.router.navigate(['home'])
      }
    })
    console.log(this.formReattivo.value)
    }
}
