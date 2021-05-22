import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

//const AUTH_API='http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  login(credentials:any): Observable<any> {
    //console.log("i am here in auth service.");
    return this.http.post(environment.apiUrls + 'auth/signin', {

      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  register(user:any): Observable<any> {
    return this.http.post(environment.apiUrls + 'auth/signup', {
     // fullname:user.fullname,
      username: user.username,
      email: user.email,
      password: user.password
     // institution:user.institution,
      // course:user.course,
      // phone:user.phone,
      // gender:user.gender,
      // address:user.address
    }, httpOptions);
  }
}
