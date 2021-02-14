import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserModel } from 'src/app/models/user.model';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service'
import Swal from 'sweetalert2'
import { SweetAlertOptions } from 'sweetalert2'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Input()
  user: UserModel = new UserModel();

  rememberMe: boolean = false;

  constructor(public library: FaIconLibrary, private auth: AuthService) { 
    library.addIcons(faCheckSquare, faSquare);
  }

  ngOnInit() {    
  }

  onSubmit(form: NgForm) {
    if(form.invalid) return
    Swal.fire(<SweetAlertOptions>{
      allowOutsideClick: false,
      type: 'info',
      title: 'login...'
    })
    Swal.showLoading()
    this.auth.signUp(this.user).subscribe(
      ()=> Swal.close(),
      error=> console.log(error))
  }
}
