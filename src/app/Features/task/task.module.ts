import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskRoutingModule } from './task-routing.module';
import { TaskCreateComponent } from './pages/task-create/task-create.component';
import { TaskListComponent } from './pages/task-list/task-list.component';

@NgModule({
  declarations: [
    TaskCreateComponent,
    TaskListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TaskRoutingModule
  ]
})
export class TaskModule { }