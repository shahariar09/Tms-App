import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { ITask } from '../../interface/task';
import { ProjectService } from '../../../project-module/services/project.service';
@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent implements OnInit {
  taskForm!: FormGroup;
  isEdit = false;
  taskId: number | null = null;
  projects: any[] = [];

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute
  ) {}


  ngOnInit(): void {
    console.log('Component initialized');
    
    this.initializeForm(); 
    this.loadProjects();   
  
    
    this.taskId = this.getTaskIdFromRoute();
    if (this.taskId) {
      this.isEdit = true;
      this.loadTaskForEdit(); 
    }
  
    
    this.route.queryParams.subscribe(params => {
      if (params['defaultStatus']) {
        this.taskForm.patchValue({
          Status: params['defaultStatus']
        });
      }
    });
  }
  

  private loadProjects(): void {
    console.log('Starting to load projects...');
    this.projectService.getAllProjects().subscribe({
      next: (projects) => {
        console.log('Received projects:', projects);
        this.projects = projects;
        
       
        if (!this.isEdit && projects.length > 0) {
          console.log('Setting default project:', projects[0]);
          this.taskForm.patchValue({
            ProjectId: projects[0].Id  
          });
        }
      },
      error: (error) => {
        console.error('Error loading projects:', error);
        
      }
    });
  }
  private initializeForm(): void {
    this.taskForm = this.fb.group({
      Title: ['', Validators.required],
      Description: ['', Validators.required],
      Priority: ['Medium', Validators.required],
      Status: ['Open', Validators.required],
      DueDate: ['', Validators.required],
      ProjectId: [null, Validators.required]
    });
  
    this.taskForm.valueChanges.subscribe(value => {
      console.log('Form values changed:', value);
      console.log('Form valid:', this.taskForm.valid);
    });
    this.taskForm.get('ProjectId')?.valueChanges.subscribe(value => {
      console.log('ProjectId changed:', value);
    });
  }

  private getTaskIdFromRoute(): number | null {
    const id = this.route.snapshot.params['Id'];
    return id ? Number(id) : null;
  }

  private loadTaskForEdit(): void {
    if (!this.taskId) return;

    this.taskService.getTaskById(this.taskId).subscribe({
      next: (task: ITask) => {
        this.taskForm.patchValue({
          Title: task.Title,
          Description: task.Description,
          Priority: task.Priority,
          Status: task.Status,
          DueDate: this.formatDate(task.DueDate),
          ProjectId: task.ProjectId
        });
      },
      error: (error) => {
        console.error('Error loading task:', error);
      }
    });
  }

  private formatDate(date: any): string {
    if (!date) return '';
    return new Date(date).toISOString().split('T')[0];
  }

  
  onSubmit(): void {
    console.log('Submit triggered');
    console.log('Form status:', this.taskForm.status);
    console.log('Form values:', this.taskForm.value);
  
    if (this.taskForm.invalid) {
      console.warn('Form is invalid. Highlighting errors:');
      Object.keys(this.taskForm.controls).forEach(key => {
        const control = this.taskForm.get(key);
        if (control?.invalid) {
          console.warn(`${key} is invalid:`, control.errors);
        }
        control?.markAsTouched();
      });
      return;
    }
  
    const taskData: ITask = {
      ...this.taskForm.value,
      DueDate: new Date(this.taskForm.value.DueDate),
      ProjectId: this.taskForm.value.ProjectId || 0
    };
  
    console.log('Prepared task data:', taskData);
  
    if (this.isEdit && this.taskId) {
      this.updateTask(taskData);
    } else {
      this.createTask(taskData);
    }
  }
  private updateTask(taskData: ITask): void {
    this.taskService.updateTask(this.taskId!, taskData).subscribe({
      next: () => {
        console.log('Task updated successfully');
        this.router.navigate(['/task/task-list']);  
      },
      error: (error) => {
        console.error('Error updating task:', error);
      }
    });
  }

  
  private createTask(taskData: ITask): void {
    if (!taskData.ProjectId) {
      alert('Please select a project');
      return;
    }
  
    const createTaskDto = {
      Title: taskData.Title,
      Description: taskData.Description,
      Priority: taskData.Priority,
      Status: taskData.Status,
      DueDate: new Date(taskData.DueDate).toISOString(),
      ProjectId: Number(taskData.ProjectId), 
      AssignedUserIds: []
    };
  
    console.log('Sending task data:', createTaskDto);
  
    this.taskService.createTask(createTaskDto).subscribe({
      next: (response) => {
        console.log('Task created successfully:', response);
        this.router.navigate(['/task/task-list']);
      },
      error: (error) => {
        console.error('Create task error:', error);
        console.error('Error details:', error.error);
        alert('Failed to create task. Please ensure all fields are valid.');
      }
    });
  }
}
