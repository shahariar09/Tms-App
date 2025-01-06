import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectModuleRoutingModule } from './project-module-routing.module';
import { ProjectCreateComponent } from './pages/project-create/project-create.component';
import { ProjectListComponent } from './pages/Project-list/Project-list.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [ProjectCreateComponent,ProjectListComponent],
  imports: [
    CommonModule,
    ProjectModuleRoutingModule,
    ReactiveFormsModule
  ]
})
export class ProjectModuleModule { }
