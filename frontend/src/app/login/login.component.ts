import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 loginForm: FormGroup;
  message: any;
  token: any;
  constructor(public formBuilder: FormBuilder, public router: Router, public authService: AuthService) {
    this.loginForm = formBuilder.group({
      email: [''],
      password: ['']
    })
   }

  ngOnInit(): void {
  }

  username: string = '';
  password: string = '';

  login(){
    // let loginData = {
    //   usernamae: this.username,
    //   password: this.password
    // }
    // console.log(loginData)
    if(this.loginForm.valid){
      this.authService.login(this.loginForm.value).subscribe(result=>{
      //   localStorage.setItem('token', JSON.stringify(res));
      //   this.router.navigate(['home']);
      // },
      // error => {
      //   this.message = error.message
      // }
      if(result.success){
        console.log(result)
        alert(result.message)
        this.authService.storeUserData(result.token, result.user_id)
        this.router.navigate(['home'])
        this.token = result.token
      }
      else{
        alert(result.message)
      }
    })
      // alert('login successfull')

      // if(getItem == null){
      //   return alert('not found anything')
      // }
      // else{
      //   return console.log(Error)
      // }
  }
  }

  logout(){
    this.authService.logout();
  }
}
