import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators'

import { UserModel } from '../models/user.model';
import { LoggedUserModel } from 'src/app/models/logged-user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user?: LoggedUserModel
  url = 'https://identitytoolkit.googleapis.com/v1/accounts:'
  constructor(private http: HttpClient) {     
    this.loadUser()
  }

  signUp(user: UserModel) {
    const data = {
      ...user,
      returnSecureToken: true
    }
    return this.http.post(`${this.url}signUp?key=${environment.firebaseApiKey}`, data)
    .pipe(map((response: any) =>
        this.saveUser(new LoggedUserModel(
          response['email'],response['idToken'],response['refreshToken'],response['displayName'], response['expiresIn']
        )))
      )
  }

  login(user: UserModel) {
    const data = {
      ...user,
      returnSecureToken: true
    }
    return this.http.post(`${this.url}signInWithPassword?key=${environment.firebaseApiKey}`, data)
      .pipe(map((response: any) => 
        this.saveUser(new LoggedUserModel(
          response['email'],response['idToken'],response['refreshToken'],response['displayName'], response['expiresIn']
        )))
      )
  }

  saveUser(logged: LoggedUserModel) {
    localStorage.setItem('user', JSON.stringify(logged))
    this.user = logged
    return logged
  }

  loadUser() {
    const item = localStorage.getItem('user') || ''
    if(item) {
      const data = JSON.parse(item)
      this.user = new LoggedUserModel(data.email, data.idToken, data.refreshToken, data.displayName)
    } 
  }

  isLogged() {
    if(this.user?.expire && this.user?.expire <new Date().getTime()) {
      this.logout()
      return false
    }
    return ((this.user?.idToken?.length || 0) > 0)
  }

  logout() {
    localStorage.removeItem('user')
  }
}
