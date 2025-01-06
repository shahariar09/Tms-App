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
  displayedColumns: string[] = ['Id', 'Name', 'Description','DueDate','Action'];

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

}
