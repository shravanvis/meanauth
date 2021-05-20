import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  allPost: Object = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // this.authService.getAllPost().subscribe(post=>{
    //   this.allPost = post;
    // })
    this.authService.getAllPost().subscribe(post=>{
      this.allPost = post
    });
  }

}
