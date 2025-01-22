import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserCreateComponent } from './pages/user-create/user-create.component';
import { authGuard } from '../auth.guard';

const routes: Routes = [
  {
    path: 'user-list',
    component: UserListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'user-create',
    component: UserCreateComponent,
    canActivate: [authGuard],
  },
  //edit
  {
    path: 'user-create/:Id',
    component: UserCreateComponent,
    canActivate: [authGuard],
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }




