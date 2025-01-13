import { Component, OnInit } from '@angular/core';
import { IProject } from '../../interfaces/project';
import { IUser } from '../../../user/interfaces/user';
import { ProjectService } from '../../services/project.service';
import { HttpService } from '../../../user/services/user.service';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-project-assign',
  templateUrl: './project-assign.component.html',
  styleUrls: ['./project-assign.component.css']
})
export class ProjectAssignComponent implements OnInit {

  projects: IProject[] = []; // All available projects
  users: IUser[] = []; // All available users
  selectedProjectId: number | null = null; // Currently selected project
  assignedUsers: number[] = []; // User IDs to assign to the selected project
  isSubmitting = false;

  constructor(
    private projectService: ProjectService,
    private userService: HttpService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getAllProjects().subscribe({
      next: (data: IProject[]) => {
        this.projects = data;
      },
      error: (err) => {
        console.error('Error fetching projects:', err);
      }
    });
  }

  // loadUsers(): void {
  //   this.userService.getAllUsers().subscribe({
  //     next: (data: IUser[]) => {
  //       this.users = data;
  //     },
  //     error: (err) => {
  //       console.error('Error fetching users:', err);
  //     }
  //   });
  // }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (data: IUser[]) => {
        console.log('All users:', data); // Log all users for debugging
        // Filter only users with RoleName 'User'
        this.users = data.filter((user) => user.RoleName === 'User');
        console.log('Filtered users (RoleName=User):', this.users);
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      }
    });
  }
  
  

  assignUsers(): void {
    if (!this.selectedProjectId || this.assignedUsers.length === 0) {
      alert('Please select a project and at least one user.');
      return;
    }

    this.isSubmitting = true;

    const assignmentRequests = this.assignedUsers.map((userId) =>
      firstValueFrom(this.projectService.assignUserToProject(this.selectedProjectId!, userId))
    );

    Promise.all(assignmentRequests)
      .then(() => {
        alert('Users assigned successfully!');
        this.isSubmitting = false;
        this.router.navigate(['project-module/Project-list']);
      })
      .catch((err) => {
        console.error('Error assigning users:', err);
        this.isSubmitting = false;
      });
  }

  selectProject(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const projectId = selectElement.value ? parseInt(selectElement.value, 10) : null;
    if (projectId !== null) {
      this.selectedProjectId = projectId;
      this.assignedUsers = []; // Clear previously selected users
    }
  }

  toggleUserSelection(userId: number | undefined): void {
    if (userId === undefined) {
      console.error('Invalid user ID');
      return;
    }
  
    if (this.assignedUsers.includes(userId)) {
      this.assignedUsers = this.assignedUsers.filter((id) => id !== userId);
    } else {
      this.assignedUsers.push(userId);
    }
  }
  

  getUserName(userId: number): string {
    const user = this.users.find((user) => user.Id === userId);
    return user ? user.Name : 'Unknown User';
  }

  getSelectedProjectName(): string {
    const selectedProject = this.projects.find(
      (project) => project.Id === this.selectedProjectId
    );
    return selectedProject ? selectedProject.Name : '';
  }
} 
