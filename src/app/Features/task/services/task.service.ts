import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ITask } from '../interface/task';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'https://localhost:7059/api/TaskItems'; 

  constructor(private http: HttpClient) { }

  getAllTasks(): Observable<ITask[]> {
    console.log('Making API call to:', this.apiUrl);
    return this.http.get<ITask[]>(this.apiUrl).pipe(
      tap(tasks => {
        console.log('Raw API response:', tasks);
        if (!tasks || tasks.length === 0) {
          console.log('No tasks returned from API');
        }
      }),
      catchError(error => {
        console.error('API Error:', error);
        return throwError(() => error);
      })
    );
  }


  getTaskById(id: number): Observable<ITask> {
    return this.http.get<ITask>(`${this.apiUrl}/${id}`).pipe(
      tap(task => console.log('Task retrieved:', task)),
      catchError(this.handleError)
    );
  }


  createTask(taskDto: any): Observable<ITask> {
    const url = `${this.apiUrl}`;
    console.log('Creating task at URL:', url);
    console.log('Task data:', taskDto);
    
    return this.http.post<ITask>(url, taskDto).pipe(
      tap(response => console.log('Create task response:', response)),
      catchError(error => {
        console.error('Create task error:', error);
        if (error.error) {
          console.error('Error details:', error.error);
        }
        return throwError(() => error);
      })
    );
  }
  
  updateTask(id: number, task: Partial<ITask>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, task).pipe(
      tap(response => console.log('Update task response:', response)),
      catchError(error => {
        console.error('Update task error details:', {
          status: error.status,
          message: error.message,
          error: error.error
        });
        return throwError(() => new Error(`Failed to update task: ${error.status} ${error.message}`));
      })
    );
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(response => console.log('Delete task response:', response)),
      catchError(this.handleError)
    );
  }

  
assignUserToTask(userId: number, taskId: number): Observable<any> {
  return this.http.post(
    `${this.apiUrl}/assign-user?userId=${userId}&taskId=${taskId}`, 
    {}
  ).pipe(
    tap(response => console.log('Assign user response:', response)),
    catchError(this.handleError)
  );
}



  unassignUserFromTask(taskId: number, userId: number): Observable<any> {
    
    return this.http.delete(
      `${this.apiUrl}/unassign-user?userId=${userId}&taskId=${taskId}`
    ).pipe(
      tap(response => console.log('Unassign user response:', response)),
      catchError(this.handleError)
    );
  }
  
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
    
      errorMessage = `Server-side error: ${error.status} - ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  getProjectTasksBoard(projectId: number): Observable<Record<string, ITask[]>> {
    return this.http.get<Record<string, ITask[]>>(`${this.apiUrl}/project/${projectId}/board`)
      .pipe(
        tap(board => console.log('Board data:', board)),
        catchError(this.handleError)
      );
  }
  
  
  updateTaskStatus(taskId: number, newStatus: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${taskId}/status`, JSON.stringify(newStatus), {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      tap(response => console.log('Update status response:', response)),
      catchError(error => {
        console.error('Update status error details:', {
          status: error.status,
          message: error.message,
          error: error.error
        });
        return throwError(() => new Error(`Failed to update task status: ${error.status} ${error.message}`));
      })
    );
  }

}