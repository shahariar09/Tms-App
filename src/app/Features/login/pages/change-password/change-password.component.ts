import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service'; // Update the path as necessary
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent {
  changePasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private loginService: LoginService,
    private router: Router
  ) {
    this.changePasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      currentPassword: ['', Validators.required],
      newPassword: [
        '',
        [Validators.required, Validators.minLength(6)],
      ],
      confirmPassword: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.changePasswordForm.valid) {
      const {
        email,
        currentPassword,
        newPassword,
        confirmPassword,
      } = this.changePasswordForm.value;

      if (newPassword !== confirmPassword) {
        alert('New password and confirm password do not match!');
        return;
      }

      this.loginService
        .changePassword({
          email,
          currentPassword,
          newPassword,
          confirmPassword
        })
        .subscribe(
          (response) => {
            alert('Password changed successfully!');
            console.log('Response:', response);
            this.router.navigate(['/login/userLogin']);
          },
          // (error) => {
          //   console.error('Error changing password:', error);
          //   alert(
          //     error?.error?.message || 'An error occurred. Please try again.'
          //   );
          // }
        );
    } else {
      alert('Please fill out the form correctly.');
    }
  }
}
