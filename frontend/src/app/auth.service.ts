import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
// import { User } from './user';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api_url = 'http://localhost:3000';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
currentUser = {};

  constructor(private httpclient: HttpClient, public router: Router) { }

  register(body: any){
    return this.httpclient.post('user/signup', body, {
      observe: 'body'
    })
  }

  login(body: any):Observable<any>{
    return this.httpclient.post('user/login',
    body, {
      observe: 'body'
    }
    )
    // .subscribe((res: any)=>{
    //   localStorage.setItem('access_token', res.token)
    //   this.getUserProfile(res._id).subscribe((res)=>{
    //     this.currentUser = res;
    //     this.router.navigate(['profile' + res.msg._id])
    //   })
    // })
  }
  
  authToken: any;
  user: any;

  storeUserData(token:any, user_id:any){
    localStorage.setItem('id_token', token)
    localStorage.setItem('user', JSON.stringify(user_id));
    this.authToken = token
    this.user = user_id;
  }

  loadToken(){
    const token = localStorage.getItem('id_token')
    this.authToken = token
  }

  getUserById(){
    return this.httpclient.get('user/'+ this.user)
  }
  

  getAllPost(){
    const httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `bearer ${this.authToken}`
      })
  };


    return this.httpclient.get('post',httpOptions)
    
  }

  logout1(){
    this.authToken == null;
    this.user = null;
    localStorage.clear();
  }

  getAccessToken(){
    return localStorage.getItem('access_token')
  }

  get isLoggedIn(): boolean{
    let authToken = localStorage.getItem('id_token');
    return (authToken !== null) ? true : false;
  }

  logout(){
    if(localStorage.removeItem('access_token') == null)
    this.router.navigate(['login'])
  }

  getUserProfile(id: any): Observable<any>{
    return this.httpclient.get('user/:' + id, { headers: this.headers })
    .pipe(
      map((res) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  handleError(error: HttpErrorResponse){
    let msg = '';
    if(error.error instanceof ErrorEvent){
      // client error
      msg = error.error.message;
    }
    else{
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}


interface User{
  _id: String;
  name: String;
  email: String;
  password: String;
}