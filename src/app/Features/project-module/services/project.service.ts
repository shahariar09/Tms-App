import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  apiUrl ="https://localhost:7059"

constructor(private http: HttpClient) { }

  getAllProjects(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+"/api/Projects");
  }
  createProjects(project:any){
    return this.http.post(this.apiUrl+"/api/Projects",project);

  }
  getProjectById(ProjectId: number): Observable<any> {
    //return this.http.get<any>(`${this.apiUrl}/api/User/GetUserById/${userId}`);
    return this.http.get<any[]>(this.apiUrl + '/api/Projects/'+ProjectId);
  }
  updateProject(ProjectId: number, project: any): Observable<any> {
    //return this.http.put(`${this.apiUrl}/api/User/UpdateUser/${userId}`, user);
    return this.http.put<any[]>(this.apiUrl +'/api/Projects/'+ ProjectId,project);
  }
  deleteProject(ProjectId: number){
    //return this.http.put(`${this.apiUrl}/api/User/UpdateUser/${userId}`, user);
    return this.http.delete(this.apiUrl +'/api/Projects/'+ ProjectId);
  }




}
