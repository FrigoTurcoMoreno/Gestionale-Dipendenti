import { Component, OnInit } from "@angular/core";
import { LogsService } from "src/app/servizi/logs.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  constructor(private logService: LogsService) {}
  entrato?: boolean;
  oreLavorate!: number;
  ngOnInit(): void {
    this.getLog();
    this.logService.getOreMensili().subscribe((data) => {
      this.oreLavorate = data;
    });
  }
  getLog() {
    this.logService.getLogBE().subscribe((data) => {
      if (data) {
        this.entrato = true;
      } else {
        this.entrato = false;
      }
    });
  }
  accedi() {
    this.logService.entra().subscribe((data) => {
      this.entrato = true;
    });
  }
  exit() {
    this.logService.esci().subscribe((data) => {
      if (data) {
        this.getLog();
        this.entrato = false;
      }
    });
  }
}
