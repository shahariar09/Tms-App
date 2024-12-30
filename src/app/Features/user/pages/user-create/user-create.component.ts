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
@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, RouterLink, FormsModule, ReactiveFormsModule,CommonModule],
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
})
export class UserCreateComponent {
  formBuilder = inject(FormBuilder);
  userForm = this.formBuilder.group({
    Name: ['', [Validators.required]],
    Email: ['', [Validators.required]],
    RoleName: ['User', [Validators.required]],
  });

  save() {
    console.log(this.userForm.value);
  }
}
