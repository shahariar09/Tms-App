// task-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './pages/task-list/task-list.component';
import { TaskCreateComponent } from './pages/task-create/task-create.component';
import { TaskDetailComponent } from './pages/task-detail/task-detail.component';

const routes: Routes = [
  {
    path: 'task-list',
    component: TaskListComponent
  },
  {
    path: 'task-create',
    component: TaskCreateComponent
  },
  {
    path: 'task-create/:Id',
    component: TaskCreateComponent
  },
  {
    path: 'task-detail/:Id',
    component: TaskDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
