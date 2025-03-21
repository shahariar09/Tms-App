import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProject } from '../interfaces/project';

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

  assignUserToProject(projectId: number, userId: number): Observable<void> {
    return this.http.post<void>(
      `${this.apiUrl}/api/Projects/assign-user?userId=${userId}&projectId=${projectId}`,
      {}
    );
  }

  assignMultipleUsersToProject(ProjectId: number, UserIds: number[]): Observable<void> {
    var assignMultipleUsersToProjectDto  = {
      UserIds: UserIds,
       ProjectId:ProjectId
    }
    
    return this.http.post<void>(
      `${this.apiUrl}/api/Projects/assign-user`, assignMultipleUsersToProjectDto
 
    );
  }

  unassignUserFromProject(projectId: number, userId: number): Observable<void> {
    const url = `https://localhost:7059/api/Projects/unassign-user?projectId=${projectId}&userId=${userId}`;
    return this.http.delete<void>(url);
  }
  
  

  
  
  
  
}



