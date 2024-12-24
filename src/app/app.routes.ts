import { Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { AddUserComponent } from './add-user/add-user.component';

export const routes: Routes = [
    { path: '', redirectTo: '/user/user-list', pathMatch: 'full' },
    { path: 'user/user-list', component: UserListComponent },
    { path: 'user/add-user', component: AddUserComponent },
  ];