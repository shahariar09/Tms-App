
import { Component, inject, OnInit } from '@angular/core';
import { HttpService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { IUser } from '../../interfaces/user';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, MatTableModule,MatButtonModule,RouterLink],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  router=inject(Router);
  userList: IUser[] = [];

  constructor(private httpService: HttpService) {}
  displayedColumns: string[] = ['Id', 'Name', 'Email','RoleName','Action'];

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
  //edit
  edit(Id:number){
    console.log(Id);
    this.router.navigateByUrl("user/user-create/"+Id);
  }

  delete(Id:number){
    this.httpService.deleteUser(Id).subscribe(()=>{
      console.log("delete");
      this.userList=this.userList.filter(x=>x.Id!=Id);
    })

  }

}
