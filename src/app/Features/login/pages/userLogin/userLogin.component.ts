import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service'; // Update the path to your service as needed
import { Router } from '@angular/router';

interface LoginResponse {
  message: string;
  token: string;
}

@Component({
  selector: 'app-user-login',
  templateUrl: './userLogin.component.html',
  styleUrls: ['./userLogin.component.css']
})
export class UserLoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, 
    private loginService: LoginService, 
    private router: Router) {  

this.loginForm = this.fb.group({
email: ['', [Validators.required, Validators.email]],
password: ['', Validators.required]
});
}

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value; // { Email: "string", Password: "string" }
  
      this.loginService.login(loginData).subscribe(
        (response: LoginResponse) => {
          if (response && response.token) {
            // Login successful
            alert(response.message);
            console.log('Token:', response.token);
            
            // Example: Store the token and navigate to a new route
            localStorage.setItem('authToken', response.token);
            this.router.navigate(['/project-module/project-create']);
          } else {
            // Handle unexpected response format
            alert('Unexpected response from the server.');
          }
        },
        // (error) => {
        //   // Handle errors (e.g., network issues, server errors)
        //   console.error('Error during login:', error);
        //   alert('An error occurred during login. Please try again.');
        // }
      );
    } else {
      alert('Please fill in all required fields.');
    }
  }
  
  }

