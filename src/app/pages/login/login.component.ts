import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserModel } from 'src/app/models/user.model';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service'
import Swal from 'sweetalert2'
import { SweetAlertOptions } from 'sweetalert2'
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input()
  user: UserModel = new UserModel();

  rememberMe: boolean = false;

  constructor(library: FaIconLibrary,private auth: AuthService, private router: Router) { 
    library.addIcons(faCheckSquare, faSquare);
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if(form.invalid) return
    Swal.fire(<SweetAlertOptions>{
      allowOutsideClick: false,
      title: 'login...'
    })
    Swal.showLoading()
    this.auth.login(this.user)
             .subscribe(logged=> {
               Swal.close()
               this.router.navigate(['/home'])
              },error=> Swal.fire(<SweetAlertOptions>{
                icon: 'error',
                allowOutsideClick: false,
                type: 'error',
                title: 'invalid login'
              }))
  }

  onChange(form: NgForm){
  }
}
