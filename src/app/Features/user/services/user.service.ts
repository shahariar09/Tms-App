// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {

// constructor() { }

// }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  //public apiUrl = 'https://localhost:7078/api/User';
  //https://localhost:7059/api/User/GetAllUsers
  apiUrl ="https://localhost:7059"

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+"/api/User/GetAllUsers");
  }

  //post user
  createUser(user:any){
    return this.http.post(this.apiUrl+"/api/User/AddUser",user);

  }
}
