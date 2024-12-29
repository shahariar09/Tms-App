import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// const routes: Routes = [
//   {
//     path: 'user',
//     loadChildren: () =>
//       import('../app/Features/user/user.module').then((m) => m.UserModule),
//   },
// ];

const routes: Routes = [
  { path: '', redirectTo: 'user/user-list', pathMatch: 'full' },
  {
    path: 'user',
    loadChildren: () =>
      import('../app/Features/user/user.module').then((m) => m.UserModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
