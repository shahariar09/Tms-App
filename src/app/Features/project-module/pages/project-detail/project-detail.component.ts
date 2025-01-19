import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProject } from '../../interfaces/project';
import { ProjectService } from '../../services/project.service';
import { IUser } from '../../../user/interfaces/user';
import { HttpService } from '../../../user/services/user.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  project: IProject | null = null; // Selected project details
  users: IUser[] = []; // List of users
  assignedUsers: number[] = []; // IDs of selected users
  activeTab: string = 'info'; // Default active tab
  isSubmitting = false;
  filteredUsers: any[] = []; // Users displayed after filtering

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private userService: HttpService
  ) {}

  ngOnInit(): void {
    const projectId = Number(this.route.snapshot.paramMap.get('Id'));
    this.loadProjectDetails(projectId);
    this.loadUsers();
    this.filteredUsers = [...this.users];
  }

  loadProjectDetails(projectId: number): void {
    this.projectService.getProjectById(projectId).subscribe({
      next: (data: IProject) => {
        this.project = {
          ...data,
          ProjectUsers: data.ProjectUsers || [] // Ensure ProjectUsers is initialized as an empty array
        };
        console.log('Loaded project details:', this.project);
      },
      error: (err) => {
        console.error('Error fetching project details:', err);
      }
    });
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (data: IUser[]) => {
        this.users = data;
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      }
    });
  }

  toggleUserSelection(userId: number | undefined): void {
    if (userId === undefined || userId === null) {
      console.error('Invalid user ID');
      return;
    }

    if (this.assignedUsers.includes(userId)) {
      this.assignedUsers = this.assignedUsers.filter((Id) => Id !== userId);
    } else {
      this.assignedUsers.push(userId);
    }

    console.log('Currently assigned users:', this.assignedUsers);
  }

  assignUsers(): void {
    if (!this.project?.Id || this.assignedUsers.length === 0) {
      alert('Please select at least one user.');
      return;
    }

    console.log('Payload:', { projectId: this.project.Id, userIds: this.assignedUsers });

    this.isSubmitting = true;

    this.projectService.assignMultipleUsersToProject(this.project.Id, this.assignedUsers).subscribe({
      next: (response) => {
        console.log('Users successfully assigned:', response);
        alert('Users successfully assigned to the project!');
        this.setActiveTab('info');
        this.isSubmitting = false;
      },
      error: (err) => {
        console.error('Error assigning users:', err);
        alert('An error occurred while assigning users. Please try again later.');
        this.isSubmitting = false;
      }
    });
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  get hasAssignedUsers(): boolean {
    return !!(this.project?.ProjectUsers && this.project.ProjectUsers.length > 0);
  }

  unassignUser(userId: number): void {
    if (!this.project?.Id) {
      console.error('Project ID is not available');
      return;
    }
  
    if (!confirm('Are you sure you want to unassign this user?')) {
      return;
    }
  
    console.log('Unassigning user:', userId, 'from project:', this.project.Id);
  
    this.projectService.unassignUserFromProject(this.project.Id, userId).subscribe({
      next: () => {
        // Remove the user from the local list after successful unassignment
        this.project!.ProjectUsers = this.project!.ProjectUsers?.filter(user => user.UserId !== userId);
        alert('User successfully unassigned from the project.');
      },
      error: (err) => {
        console.error('Error unassigning user:', err);
        alert('An error occurred while unassigning the user. Please try again later.');
      }
    });
  }

  
  
}
