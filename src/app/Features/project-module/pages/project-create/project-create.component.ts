import { Component,inject } from '@angular/core';
import { FormBuilder,Validators} from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { Router,ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
})
export class ProjectCreateComponent {
  formBuilder = inject(FormBuilder);
  projectService=inject(ProjectService);
  router=inject(Router);
  route=inject(ActivatedRoute);

  projectForm = this.formBuilder.group({
      Id: [null],
      Name: ['', [Validators.required]],
      Description: ['', [Validators.required]],
      DueDate: ['', [Validators.required]],
    });
    projectId!:number;
    isEdit=false;

    ngOnInit(){
      this.projectId=this.route.snapshot.params["Id"];
      if(this.projectId){
        this.isEdit=true;
        this.projectService.getProjectById(this.projectId).subscribe( 
          (result) => {
            console.log(result);
            this.projectForm.patchValue({
              Id: result.Id,
              Name: result.Name,
              Description: result.Description,
              DueDate:result.DueDate.split('T')[0]
            });
          },
          
        );
      }
    }
    save() {
      console.log(this.projectForm.value);
      
      if (this.projectForm.invalid) {
        return; // Prevent submission if form is invalid
      }
    
      if(this.isEdit) {
        this.projectService.updateProject(this.projectId, this.projectForm.value).subscribe((response) => {
            console.log('project updated successfully',response);
            this.router.navigateByUrl('/project-module/Project-list');
          },
          
        );
      } else {
        this.projectService.createProjects(this.projectForm.value).subscribe((response) => {
          
    
            console.log('project created successfully',response);
            this.router.navigateByUrl('/project-module/Project-list');
          },
          
        );
      }
    }


  

}
