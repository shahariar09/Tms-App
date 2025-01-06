import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { HttpService } from '../../../user/services/user.service';
import { CreateTaskItem } from '../../interface/task';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
 
})
export class TaskCreateComponent implements OnInit {
  taskForm: FormGroup;
  users: any[] = [];
  projects: any[] = [];
  priorities = ['Low', 'Medium', 'High'];
  statuses = [
    { id: 1, name: 'New' },
    { id: 2, name: 'In Progress' },
    { id: 3, name: 'Completed' }
  ];

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private userService: HttpService,
    private router: Router
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      priority: ['', Validators.required],
      statusId: ['', Validators.required],
      status: ['', Validators.required],
      projectId: ['', Validators.required],
      dueDate: ['', Validators.required],
      assignedUserIds: [[]]
    });
  }

  ngOnInit(): void {
    this.loadUsers();
    this.loadProjects();
    this.loadStatuses();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (users: any[]) => {
        this.users = users; 
      },
      error: (err) => {
        console.error('Failed to load users:', err);
      }
    });
  }
  
  loadProjects(): void {
    this.taskService.getProjects().subscribe({
      next: (projects: any[]) => {
        this.projects = projects;
      },
      error: (err) => console.error('Failed to load projects:', err)
    });
  }

  loadStatuses(): void {
    this.taskService.getStatuses().subscribe({
      next: (statuses: any[]) => {
        this.statuses = statuses.map(status => ({
          id: status.id || status.name, // Fallback to name if id is missing
          name: status.name
        }));
      },
      error: err => {
        console.error('Error fetching statuses:', err);
      }
    });
  }
  
  onSubmit(): void {
    if (this.taskForm.valid) {
      const taskData: CreateTaskItem = {
        ...this.taskForm.value,
        dueDate: new Date(this.taskForm.value.dueDate)
      };
      
      this.taskService.createTask(taskData).subscribe({
        next: () => {
          this.router.navigate(['/tasks']);
        },
        error: (error) => {
          console.error('Error creating task:', error);
        }
      });
    }
  }
}