import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  successMessage = ''
  constructor(public formBuilder: FormBuilder, public authService: AuthService, public router: Router) {
    this.registerForm = this.formBuilder.group({
      name: [''],
      email: [''],
      password: ['']
    })
   }

   registerUser(){
     this.authService.register(this.registerForm.value).subscribe(res=>
       this.successMessage = 'Registration success',
       error => this.successMessage = 'Some Error'
     )
     console.log(this.successMessage);
   }

  ngOnInit(): void {
  }

}
