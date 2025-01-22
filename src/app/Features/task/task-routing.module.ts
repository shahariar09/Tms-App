
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './pages/task-list/task-list.component';
import { TaskCreateComponent } from './pages/task-create/task-create.component';
import { TaskDetailComponent } from './pages/task-detail/task-detail.component';
import { authGuard } from '../auth.guard';

const routes: Routes = [
  {
    path: 'task-list',
    component: TaskListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'task-create',
    component: TaskCreateComponent,
    canActivate: [authGuard],
  },
  {
    path: 'task-create/:Id',
    component: TaskCreateComponent,
    canActivate: [authGuard],
  },
  {
    path: 'task-detail/:Id',
    component: TaskDetailComponent,
    canActivate: [authGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
