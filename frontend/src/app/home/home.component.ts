import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username: Object = '';
  allPost: Object = '';
  getUser: Object = '';

  constructor(private authService: AuthService, public router: Router) {
    // this.authService.getAllPost().subscribe(
    //   data => this.username = JSON.stringify(data),
    //   error => this.router.navigate(['login'])
    // )
   }

  ngOnInit(): void {
    this.authService.getUserById().subscribe(user => {
      this.getUser = user
    })
  }

  logout(){
    this.authService.logout1();
    this.router.navigate(['login'])
    // return false;
  }
}
