import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/bd.service';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['./mi-cuenta.component.scss'],
})
export class MiCuentaComponent implements OnInit {

  username: string;
  fullname: string;
  email: string;
  phone: number;
  role: string;

  constructor(private storage: StorageService,
              private router: Router) { }

  ngOnInit() {}

  async ionViewWillEnter(){
    this.username = await this.storage.get("username")
    this.fullname = await this.storage.get("fullname")
    this.email = await this.storage.get("email")
    this.phone = await this.storage.get("phone")
    this.role = await this.storage.get("role")
  }

  salir(){
    this.storage.clear();
    this.router.navigate(['/login'])
  }
}
