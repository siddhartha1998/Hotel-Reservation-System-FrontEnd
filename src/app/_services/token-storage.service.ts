import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
    // window.localStorage.clear();
    window.location.reload();
  }

  public saveToken(token: string): void {
    // window.localStorage.removeItem(TOKEN_KEY);
    // window.localStorage.setItem(TOKEN_KEY, token);
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
    
   
  }

  public getToken(): any {
    // return localStorage.getItem(TOKEN_KEY);
   return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user:any): void {
    // window.localStorage.removeItem(USER_KEY);
    // window.localStorage.setItem(USER_KEY, JSON.stringify(user));
   window.sessionStorage.removeItem(USER_KEY);
   window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): string {
    // return JSON.parse(localStorage.getItem(USER_KEY)||'{}');
    return JSON.parse(sessionStorage.getItem(USER_KEY)|| '{}');
  }
}
