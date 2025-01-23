import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../../task/services/task.service';
import { ProjectService } from '../../../project-module/services/project.service';
import { ITask,IUserTask } from '../../../task/interface/task';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html'
})
export class BoardComponent implements OnInit {
  isProcessingDrop = false;
  boardColumns: { [key: string]: ITask[] } = { 
    'Open': [], 'Pending': [], 'InProgress': [], 'Done': [], 'Closed': [] 
  };
  taskForm: FormGroup;
  projects: any[] = [];
  currentStatus: string = 'Open';

  constructor(
    private taskService: TaskService,
    private projectService: ProjectService,
    private fb: FormBuilder
  ) {
    this.taskForm = this.fb.group({
      Title: ['', Validators.required],
      Description: ['', Validators.required],
      Priority: ['Medium', Validators.required],
      Status: ['', Validators.required],
      DueDate: ['', Validators.required],
      ProjectId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadTasks();
    this.loadProjects();
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

  loadProjects() {
    this.projectService.getAllProjects().subscribe({
      next: (projects) => {
        this.projects = projects;
      },
      error: (error) => {
        console.error('Error loading projects:', error);
      }
    });
  }

  openTaskModal(status: string) {
    this.currentStatus = status;
    this.taskForm.patchValue({ Status: status });
    const modalElement = document.getElementById('taskCreateModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  createTask() {
    if (this.taskForm.valid) {
      const taskData = {
        ...this.taskForm.value,
        Status: this.currentStatus,
        DueDate: new Date(this.taskForm.value.DueDate).toISOString(),
        AssignedUserIds: []
      };

      this.taskService.createTask(taskData).subscribe({
        next: (response) => {
          this.loadTasks();
          const modalElement = document.getElementById('taskCreateModal');
          if (modalElement) {
            const modal = bootstrap.Modal.getInstance(modalElement);
            modal?.hide();
          }
        },
        error: (error) => {
          console.error('Create task error:', error);
        }
      });
    }
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


formatDate(date: Date): string {
  return new Date(date).toLocaleDateString();
}

getAssignedUserNames(users?: IUserTask[]): string {
  if (!users || users.length === 0) return 'No assignees';
  return users.map(user => user.UserName).join(', ');
}
}