import { Component, inject } from '@angular/core';
import { FormsModule, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpService } from '../../services/user.service';



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
  router=inject(Router);
  route=inject(ActivatedRoute);

  userForm = this.formBuilder.group({
    Id: 0,
    Name: ['', [Validators.required]],
    Email: ['', [Validators.required,Validators.email]],
    RoleId: [0, [Validators.required]],
  });

//edit
userId!:number;
isEdit=false;
ngOnInit(){
  this.userId=this.route.snapshot.params["Id"];
  if(this.userId){
    this.isEdit=true;
    this.httpService.getUserById(this.userId).subscribe( 
      (result) => {
        console.log(result);

        this.userForm.patchValue({
          Id: result.Id,
          Name: result.Name,
          Email: result.Email,
          RoleId: result.RoleId,
        });
        //this.userForm.controls.Email.disable(); //disable to change the email
      },
      // (error) => {
      //   console.error('Error fetching user details:', error);
      // }
    );
  }
}


save() {
  console.log(this.userForm.value);
  


  if(this.isEdit) {
    this.httpService.updateUser(this.userId, this.userForm.value).subscribe((response) => {
        console.log('User updated successfully',response);
        this.router.navigateByUrl('/user/user-list');
      },
      // (error) => {
      //   console.error('Error updating user:', error);
      // }
    );
  } else {
    this.httpService.createUser(this.userForm.value).subscribe((response) => {
      

        console.log('User created successfully',response);
        this.router.navigateByUrl('/user/user-list');
      },
      // (error) => {
      //   console.error('Error creating user:', error);
      // }
    );
  }
}

}



  



  
