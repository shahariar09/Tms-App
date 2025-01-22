import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './Features/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: 'login/userLogin', pathMatch: 'full' },
  
  {
    path: 'user',
    loadChildren: () =>
      import('../app/Features/user/user.module').then((m) => m.UserModule),
      canActivate: [authGuard],
  },
  {
    path: 'project-module',
    loadChildren: () =>
      import('../app/Features/project-module/project-module.module').then((m) => m.ProjectModuleModule),
      canActivate: [authGuard],
  },
  
  {
    path: 'task',
    loadChildren: () =>
      import('../app/Features/task/task.module').then((m) => m.TaskModule),
      canActivate: [authGuard],
  },
  {
    path: 'task-board',
    loadChildren: () => import('./Features/task-board/task-board.module')
      .then(m => m.TaskBoardModule),
      canActivate: [authGuard],
  },
  {
    path: 'login',
    loadChildren: () => import('./Features/login/login.module')
      .then(m => m.LoginModule)
  }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
