import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectModuleRoutingModule } from './project-module-routing.module';
import { ProjectCreateComponent } from './pages/project-create/project-create.component';
import { ProjectListComponent } from './pages/Project-list/Project-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { ProjectDetailComponent } from './pages/project-detail/project-detail.component';


@NgModule({
  declarations: [ProjectCreateComponent,ProjectListComponent,ProjectDetailComponent],
  imports: [
    CommonModule,
    ProjectModuleRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ProjectModuleModule { }
