import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ITask } from '../interface/task';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'https://localhost:7059/api/TaskItems'; // Updated to match controller route

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
  updateTask(id: number, task: ITask): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, task).pipe(
      tap(response => console.log('Update task response:', response)),
      catchError(this.handleError)
    );
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(response => console.log('Delete task response:', response)),
      catchError(this.handleError)
    );
  }

  // assignMultipleUsersToTask(taskId: number, userIds: number[]): Observable<void> {
  //   const assignMultipleUsersToTaskDto = {
  //     UserIds: userIds,
  //     TaskId: taskId
  //   };
    
  //   return this.http.post<void>(
  //     `${this.apiUrl}/assign-users`,  
  //     assignMultipleUsersToTaskDto
  //   ).pipe(
  //     tap(response => console.log('Assign users response:', response)),
  //     catchError(this.handleError)
  //   );
  // }
 
// task.service.ts
assignUserToTask(userId: number, taskId: number): Observable<any> {
  return this.http.post(
    `${this.apiUrl}/assign-user?userId=${userId}&taskId=${taskId}`, 
    {}
  ).pipe(
    tap(response => console.log('Assign user response:', response)),
    catchError(this.handleError)
  );
}
  // unassignUserFromTask(taskId: number, userId: number): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/unassign-user`, {
  //     params: { userId: userId.toString(), taskId: taskId.toString() }
  //   }).pipe(
  //     tap(response => console.log('Unassign user response:', response)),
  //     catchError(this.handleError)
  //   );
  // }


  unassignUserFromTask(taskId: number, userId: number): Observable<any> {
    // Try using DELETE method instead of POST
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
      // Client-side or network error
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server-side error: ${error.status} - ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}