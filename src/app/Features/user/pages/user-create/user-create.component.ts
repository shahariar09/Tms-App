import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { HttpService } from '../../services/user.service';
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngIf
import { IUserCreateResponse } from '../../interfaces/IUserCreateResponse';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],  // Ensure CommonModule is here
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
})
export class UserCreateComponent {
  formBuilder = inject(FormBuilder);
  httpService = inject(HttpService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  userForm = this.formBuilder.group({
    Id: 0,
    Name: ['', [Validators.required]],
    Email: ['', [Validators.required, Validators.email]],
    RoleId: [null, [Validators.required]],
  });

  tempPassword: string | null = null;  // New variable to store the temporary password

  userId!: number;
  isEdit = false;

  ngOnInit() {
    this.userId = this.route.snapshot.params['Id'];
    if (this.userId) {
      this.isEdit = true;
      this.httpService.getUserById(this.userId).subscribe((result) => {
        console.log('Fetched user data for edit:', result);
        this.userForm.patchValue({
          Id: result.Id,
          Name: result.Name,
          Email: result.Email,
          RoleId: result.RoleId,
        });
      });
    }
  }

  save() {
    console.log('User form value:', this.userForm.value); // Log form value to inspect data

    if (this.userForm.invalid) {
      return; // Prevent submission if the form is invalid
    }

    if (this.isEdit) {
      this.httpService.updateUser(this.userId, this.userForm.value).subscribe(
        (response) => {
          console.log('User updated successfully:', response);
          this.router.navigateByUrl('/user/user-list');
        },
        (error) => {
          console.error('Error updating user:', error);
        }
      );
    } else {
      this.httpService.createUser(this.userForm.value).subscribe(
        (response: IUserCreateResponse) => {
          console.log('User created successfully:', response);
          this.tempPassword = response.TempPassword; // Assign the temporary password

          // Optionally redirect after some delay
          setTimeout(() => {
            this.router.navigateByUrl('/user/user-list');
          }, 5000); // Redirect after 5 seconds
        },
        (error) => {
          console.error('Error creating user:', error);
        }
      );
    }
  }
}
