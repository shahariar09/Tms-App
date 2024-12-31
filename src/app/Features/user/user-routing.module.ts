import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserCreateComponent } from './pages/user-create/user-create.component';

const routes: Routes = [
  {
    path: 'user-list',
    component: UserListComponent
  },
  {
    path: 'user-create',
    component: UserCreateComponent
  },
  //edit
  {
    path: 'user-create/:Id',
    component: UserCreateComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }




