// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-user-list',
//   templateUrl: './user-list.component.html',
//   styleUrls: ['./user-list.component.css']
// })
// export class UserListComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

import { Component, OnInit } from '@angular/core';
//import { HttpService } from '../services/http.service';
import { HttpService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
//import { IUser } from '../interfaces/user';
import { IUser } from '../../interfaces/user';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, MatTableModule,MatButtonModule,RouterLink],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  userList: IUser[] = [];

  constructor(private httpService: HttpService) {}
  displayedColumns: string[] = ['Id', 'Name', 'Email','RoleName'];

  ngOnInit(): void {
    this.httpService.getAllUsers().subscribe({
      next: (result) => {
        this.userList = result;
        console.log('Fetched Users:', this.userList);
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      },
    });
  }
}
