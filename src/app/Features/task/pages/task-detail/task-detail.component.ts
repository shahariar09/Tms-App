import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { HttpService } from '../../../user/services/user.service';
import { ITask, IUserTask } from '../../interface/task';
import { IUser } from '../../interface/task';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  task: ITask | null = null;
  //users: any[] = []; 
  assignedUsers: number[] = [];
  activeTab: string = 'info';
  isSubmitting = false;
  isLoading = true;
  users: IUser[] = [];
  showSuccessMessage: boolean = false;
  showUnassignConfirm: boolean = false;
  showUnassignSuccess: boolean = false;
  selectedUserToUnassign: IUserTask | null = null;
  isUnassigning = false;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private userService: HttpService
  ) {}

  ngOnInit(): void {
    console.log('Task Detail Component initialized');
    const taskId = Number(this.route.snapshot.paramMap.get('Id'));
    this.loadTaskDetails(taskId);
    this.loadUsers();
  }

  private loadUsers(): void {
    console.log('Starting to load users from:', this.userService.apiUrl + "/api/User/GetAllUsers");
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        console.log('Raw API response:', users);
        if (!users) {
          console.error('Received null or undefined from API');
          return;
        }
        this.users = users;
        console.log('Users array after assignment:', this.users);
        console.log('Number of users loaded:', this.users.length);
      },
      error: (error) => {
        console.error('Error loading users:', error);
        console.error('Error details:', {
          status: error?.status,
          message: error?.message,
          error: error?.error
        });
      },
      complete: () => {
        console.log('User loading complete');
      }
    });
  }
  
  loadTaskDetails(taskId: number): void {
    this.isLoading = true;
    this.taskService.getTaskById(taskId).subscribe({
      next: (data: ITask) => {
        console.log('Task details received:', data);
        this.task = data;
        this.assignedUsers = data.AssignedUsers?.map(user => user.UserId) || [];
        this.isLoading = false;
      },
      error: (err: Error) => {
        console.error('Error fetching task details:', err);
        this.isLoading = false;
      }
    });
  }

  toggleUserSelection(userId: number): void {
    console.log('Toggling user:', userId);
    if (!userId) {
      console.error('Invalid user ID');
      return;
    }

    const index = this.assignedUsers.indexOf(userId);
    if (index > -1) {
      this.assignedUsers.splice(index, 1);
    } else {
      this.assignedUsers.push(userId);
    }
    console.log('Updated assigned users:', this.assignedUsers);
  }


assignUsers(): void {
  if (!this.task?.Id) {
    console.error('No task ID available');
    return;
  }

  this.isSubmitting = true;
  
  // Create an array of observables for each user assignment
  const assignmentObservables = this.assignedUsers.map(userId => 
    this.taskService.assignUserToTask(userId, this.task!.Id!)
  );

  // Use forkJoin to execute all assignments in parallel
  forkJoin(assignmentObservables)
    .subscribe({
      next: () => {
        console.log('Users assigned successfully');
        //this.loadTaskDetails(this.task!.Id!);
        this.showSuccessMessage = true;
        this.isSubmitting = false;
      },
      error: (error) => {
        console.error('Failed to assign users:', error);
        this.isSubmitting = false;
      }
    });
}
closeSuccessMessage(): void {
  this.showSuccessMessage = false;
  this.activeTab = 'info'; // Switch to task info tab
  this.loadTaskDetails(this.task!.Id!); // Reload task details
}


  setActiveTab(tab: string): void {
    this.activeTab = tab;
    if (tab === 'assign' && this.users.length === 0) {
      this.loadUsers();
    }
  }

  confirmUnassign(user: any): void {
    this.selectedUserToUnassign = user;
    this.showUnassignConfirm = true;
  }

  cancelUnassign(): void {
    this.showUnassignConfirm = false;
    this.selectedUserToUnassign = null;
  }

  unassignUser(): void {
    if (!this.task?.Id || !this.selectedUserToUnassign) {
      return;
    }

    this.taskService.unassignUserFromTask(this.task.Id, this.selectedUserToUnassign.UserId)
      .subscribe({
        next: () => {
          this.showUnassignConfirm = false;
          this.showUnassignSuccess = true;
          this.loadTaskDetails(this.task!.Id!); // Reload task details
        },
        error: (error) => {
          console.error('Failed to unassign user:', error);
          // Handle error case
        }
      });
  }

  closeUnassignSuccess(): void {
    this.showUnassignSuccess = false;
    this.selectedUserToUnassign = null;
  }

}