import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectListComponent } from './pages/Project-list/Project-list.component';
import { ProjectCreateComponent } from './pages/project-create/project-create.component';

const routes: Routes = [
  {
    path: 'Project-list',
    component:ProjectListComponent
  },
  {
    path: 'project-create',
    component:ProjectCreateComponent
  },
  {
    path: 'project-create/:Id',
  component:ProjectCreateComponent
  }
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectModuleRoutingModule { }
