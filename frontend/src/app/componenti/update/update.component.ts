import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Utente } from "src/app/interfacce/Utente";
import { UtenteService } from "src/app/servizi/utente.service";

@Component({
  selector: "app-update",
  templateUrl: "./update.component.html",
  styleUrls: ["./update.component.css"],
})
export class UpdateComponent {
  constructor(private utenteService: UtenteService, private router: Router) {}

  formReattivoUpdate!: FormGroup;
  userToUpdate!: Utente;

  ngOnInit(): void {
    this.userToUpdate = this.utenteService.UserToUpdate;
    console.log(this.userToUpdate);
    this.formReattivoUpdate = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [
        Validators.minLength(6),
        Validators.required,
      ]),
      nome: new FormControl(null, [
        Validators.minLength(2),
        Validators.required,
      ]),
      cognome: new FormControl(null, [
        Validators.minLength(2),
        Validators.required,
      ]),
      isAdmin: new FormControl(false),
    });
  }

  onUpdate() {
    console.log(this.formReattivoUpdate.value);
    this.utenteService.register(this.userToUpdate).subscribe((utente) => {
      if (utente) {
        this.router.navigate(["logsAdminPanel"]);
      }
    });
  }
}
