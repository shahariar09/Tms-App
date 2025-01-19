
import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { TaskService } from '../../../task/services/task.service';
import { ITask } from '../../../task/interface/task';
import { IUserTask } from '../../../task/interface/task';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html'
})
export class BoardComponent implements OnInit {
  isProcessingDrop = false;
  boardColumns: { [key: string]: ITask[] } = {
    'Open': [],
    'Pending': [],
    'InProgress': [],
    'Done': [],
    'Closed': []
  };

  constructor(
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getAllTasks().subscribe({
      next: (tasks: ITask[]) => {
       
        Object.keys(this.boardColumns).forEach(key => {
          this.boardColumns[key] = [];
        });

      
        tasks.forEach(task => {
          if (this.boardColumns[task.Status]) {
            this.boardColumns[task.Status].push(task);
          }
        });
      },
      error: (error) => {
        console.error('Error loading tasks:', error);
      }
    });
  }


onDrop(event: CdkDragDrop<ITask[]>) {
  if (event.previousContainer === event.container) {
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  } else {
    const task = event.previousContainer.data[event.previousIndex];
    const newStatus = event.container.id;
    
    if (task.Id !== undefined) {
   
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

    
      this.taskService.updateTaskStatus(task.Id, newStatus).subscribe({
        next: () => {
          console.log('Task status updated successfully');
        },
        error: (error) => {
          console.error('Error updating task status:', error);
          
          transferArrayItem(
            event.container.data,
            event.previousContainer.data,
            event.currentIndex,
            event.previousIndex
          );
        }
      });
    }
  }
}


  navigateToCreateTask(status: string) {
    this.router.navigate(['/task/task-create'], {
      queryParams: { defaultStatus: status }
    });
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString();
  }

  getAssignedUserNames(users?: IUserTask[]): string {
    if (!users || users.length === 0) return 'No assignees';
    return users.map(user => user.UserName).join(', ');
  }
}