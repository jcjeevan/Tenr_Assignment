import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public loggedInStatus = true;

  private http: HttpClient;

  constructor(handler: HttpBackend) {
    this.http = new HttpClient(handler);
  }

  
  SetRole(role){
    return localStorage.setItem('role', role);
  }

  getRole() {
    return localStorage.getItem('role'); 
  }

  SetName(name:string){
    return localStorage.setItem('username', name);
  }

  getName(){
    return localStorage.getItem('username');
  }
}
