// task-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { ITask } from '../../interface/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: ITask[] = [];
  filteredTasks: ITask[] = [];

  constructor(
    private taskService: TaskService,
    private router: Router
  ) { }

  ngOnInit() {
    console.log('TaskList Component initialized');
    this.loadTasks();
  }
  
  loadTasks() {
    console.log('Starting loadTasks()');
    this.taskService.getAllTasks().subscribe({
      next: (data) => {
        console.log('Tasks received in component:', data);
        console.log('Data type:', typeof data);
        console.log('Is Array?', Array.isArray(data));
        this.tasks = data;
        this.filteredTasks = data;
        console.log('Updated tasks array:', this.tasks);
        console.log('Updated filteredTasks array:', this.filteredTasks);
      },
      error: (error) => {
        console.error('Component error handling:', error);
      },
      complete: () => {
        console.log('Task loading completed');
      }
    });
  }

  filterTasks(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredTasks = this.tasks.filter(task => 
      task.Title.toLowerCase().includes(searchTerm) ||
      task.Description.toLowerCase().includes(searchTerm)
    );
  }

  viewDetail(id: number) {
    this.router.navigate(['/task-module/task-detail', id]);
  }

  edit(id: number) {
    this.router.navigate(['/task-module/task-create', id]);
  }

  delete(id: number) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          this.loadTasks();
        },
        error: (error) => {
          console.error('Error deleting task:', error);
        }
      });
    }
  }
}