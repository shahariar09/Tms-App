// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-user-create',
//   templateUrl: './user-create.component.html',
//   styleUrls: ['./user-create.component.css']
// })
// export class UserCreateComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }


// import { Component, inject } from '@angular/core';
// import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
// import { MatButtonModule } from '@angular/material/button';
// import { MatInputModule } from '@angular/material/input';
// import { RouterLink } from '@angular/router';


import { Component, inject } from '@angular/core';
import { FormsModule, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpService } from '../../services/user.service';
import { IUser } from '../../interfaces/user';
@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, RouterLink, FormsModule, ReactiveFormsModule,CommonModule],
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
})
export class UserCreateComponent {
  formBuilder = inject(FormBuilder);
  httpService = inject(HttpService);
  userForm = this.formBuilder.group({
    Name: ['', [Validators.required]],
    Email: ['', [Validators.required,Validators.email]],
    RoleId: [0, [Validators.required]],
  });

  save() {
    console.log(this.userForm.value);
    // const user: IUser={
    //   Name:this.userForm.value.Name!,
    //   Email:this.userForm.value.Email!,
    //   RoleId:this.userForm.value.Id!,
    // }
    // console.log('Submitting user:', user);
    this.httpService.createUser(this.userForm.value).subscribe(()=>{
      console.log("success");
    });

  }
  
}
