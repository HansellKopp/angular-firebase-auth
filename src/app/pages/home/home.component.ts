import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.auth.loadUser()
    if(!this.auth.isLogged) {
      this.router.navigate(['/login'])
    }
  }

  logout() {
    this.auth.logout()
    this.router.navigate(['/login'])
  }
}
