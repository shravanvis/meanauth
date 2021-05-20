import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
currentUser: Object = {};
  constructor(public authService: AuthService, public activatedRoute: ActivatedRoute) {
    let id = this.activatedRoute.snapshot.params.get('id')
    this.authService.getUserProfile(id).subscribe(res=>{
      this.currentUser = res.msg;
    })
   }

  ngOnInit(): void {
  }

}
