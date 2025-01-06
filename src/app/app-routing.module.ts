import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  {
    path: 'user',
    loadChildren: () =>
      import('./Features/user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'tasks',
    loadChildren: () =>
      import('./Features/task/task.module').then((m) => m.TaskModule),
  },
  { path: '**', redirectTo: 'tasks' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
