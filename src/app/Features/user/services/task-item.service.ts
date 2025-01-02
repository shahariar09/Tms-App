import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskItem } from '../interfaces/task-item';  

@Injectable({
  providedIn: 'root'
})
export class TaskItemService {
  private apiUrl = 'https://localhost:7059/api/TaskItems';  

  constructor(private http: HttpClient) { }

  getTasks(): Observable<TaskItem[]> {
    return this.http.get<TaskItem[]>(this.apiUrl);
  }

  addTask(task: TaskItem): Observable<TaskItem> {
    return this.http.post<TaskItem>(this.apiUrl, task);
  }

  getTaskById(id: number): Observable<TaskItem> {
    return this.http.get<TaskItem>(`${this.apiUrl}/${id}`);
  }

  updateTask(id: number, task: TaskItem): Observable<TaskItem> {
    return this.http.put<TaskItem>(`${this.apiUrl}/${id}`, task);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
}