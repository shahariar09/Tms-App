import { Component, OnInit,inject } from '@angular/core';
import { IProject } from '../../interfaces/project';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Project-list',
  templateUrl: './Project-list.component.html',
  styleUrls: ['./Project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  router=inject(Router);
    ProjectList: IProject[] = [];

  constructor(private projectService: ProjectService) { }
  displayedColumns: string[] = ['Name', 'Description','DueDate','Action'];

  ngOnInit():void {
    this.projectService.getAllProjects().subscribe({
      next: (result) => {
        this.ProjectList = result;
        console.log('Fetched Projects:', this.ProjectList);
      },
      error: (err) => {
        console.error('Error fetching projects:', err);
      },
    });
  }

  edit(Id: number | undefined): void { 
    if (Id !== undefined && Id !== null) {
        console.log("Editing project with Id:", Id);
        this.router.navigateByUrl(`project-module/project-create/${Id}`);
    } else {
        console.error("Invalid Id provided for edit:", Id);
    }
}

delete(Id: number | undefined): void {
  if (Id !== undefined && Id !== null) {
      this.projectService.deleteProject(Id).subscribe(
          () => {
              console.log("Deleted user with Id:", Id);
              this.ProjectList = this.ProjectList?.filter(project => project.Id !== Id);
          },
          // error => {
          //     console.error("Failed to delete user with Id:", Id, "Error:", error);
          // }
      );
  } else {
      console.error("Invalid Id provided for delete:", Id);
  }
}

viewDetail(projectId: number | undefined): void {
  if (projectId == null) {
    console.error("Invalid projectId provided for viewDetail:", projectId);
    return; // Avoid navigation if projectId is invalid
  }
  //this.router.navigate(['/project-module/project-detail', projectId]);
  this.router.navigateByUrl(`project-module/project-detail/${projectId}`);
}

onSearch(event: Event): void {
  const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();

  // Filter projects by name or description
  this.ProjectList = this.ProjectList.filter(
    (project) =>
      project.Name.toLowerCase().includes(searchTerm) 
      // project.Description.toLowerCase().includes(searchTerm)
  );
}




}
