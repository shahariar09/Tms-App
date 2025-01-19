
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITask } from '../../task/interface/task';
@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private apiUrl = 'https://localhost:7059/api/TaskItems';

  constructor(private http: HttpClient) {}

  getTasksByStatus(): Observable<{ [key: string]: ITask[] }> {
    return this.http.get<{ [key: string]: ITask[] }>(`${this.apiUrl}/board`);
  }

  updateTaskStatus(taskId: number, newStatus: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${taskId}/status`, { status: newStatus });
  }
}