import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  { path: '', redirectTo: 'login/userLogin', pathMatch: 'full' },
  
  {
    path: 'user',
    loadChildren: () =>
      import('../app/Features/user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'project-module',
    loadChildren: () =>
      import('../app/Features/project-module/project-module.module').then((m) => m.ProjectModuleModule),
  },
  
  {
    path: 'task',
    loadChildren: () =>
      import('../app/Features/task/task.module').then((m) => m.TaskModule),
  },
  {
    path: 'task-board',
    loadChildren: () => import('./Features/task-board/task-board.module')
      .then(m => m.TaskBoardModule)
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
