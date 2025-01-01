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
//import { IUser } from '../interfaces/user';

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

  //create user
  createUser(user:any){
    return this.http.post(this.apiUrl+"/api/User/AddUser",user);

  }
  //update user
  // getUsers(userId:number): Observable<any[]> {
  //   return this.http.get<any[]>(this.apiUrl+"/api/User/UpdateUser/"+userId);
  // }
  getUserById(userId: number): Observable<any> {
    //return this.http.get<any>(`${this.apiUrl}/api/User/GetUserById/${userId}`);
    return this.http.get<any[]>(this.apiUrl + '/api/User/GetUserById/'+userId);
  }

  updateUser(userId: number, user: any): Observable<any> {
    //return this.http.put(`${this.apiUrl}/api/User/UpdateUser/${userId}`, user);
    return this.http.put<any[]>(this.apiUrl +'/api/User/UpdateUser/'+ userId,user);
  }


  
  
  

}
