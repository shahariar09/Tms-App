import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectListComponent } from './pages/Project-list/Project-list.component';
import { ProjectCreateComponent } from './pages/project-create/project-create.component';

import { ProjectDetailComponent } from './pages/project-detail/project-detail.component';
import { authGuard } from '../auth.guard'; 


const routes: Routes = [
  {
    path: 'Project-list',
    component:ProjectListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'project-create',
    component:ProjectCreateComponent,
    canActivate: [authGuard],
  },
  {
    path: 'project-create/:Id',
  component:ProjectCreateComponent,
  canActivate: [authGuard],
  },
  {
    path: 'projecct-detail',
    component: ProjectDetailComponent,
    canActivate: [authGuard],
  },
  { 
    path: 'project-detail/:Id',
    component: ProjectDetailComponent,
    canActivate: [authGuard],
  },

  
 
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectModuleRoutingModule { }
