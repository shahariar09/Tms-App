import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskItem, CreateTaskItem } from '../interface/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'add this later :) '; 
  constructor(private http: HttpClient) {}


  
  getTasks(): Observable<TaskItem[]> {
    return this.http.get<TaskItem[]>(this.apiUrl);
  }

  getTask(id: number): Observable<TaskItem> {
    return this.http.get<TaskItem>(`${this.apiUrl}/${id}`);}

    createTask(task: CreateTaskItem): Observable<TaskItem> {
      return this.http.post<TaskItem>(this.apiUrl, task);
    }
  
    updateTask(id: number, task: CreateTaskItem): Observable<TaskItem> {
      return this.http.put<TaskItem>(`${this.apiUrl}/${id}`, task);
    }
  
    deleteTask(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
    getProjects(): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/projects`);
    }
    getStatuses(): Observable<string[]> {
      return this.http.get<string[]>(`${this.apiUrl}/task-statuses`);
    }

  }