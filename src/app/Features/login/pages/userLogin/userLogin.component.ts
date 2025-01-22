import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service'; 
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
      const loginData = this.loginForm.value; 
  
      this.loginService.login(loginData).subscribe(
        (response: LoginResponse) => {
          if (response && response.token) {
            
            alert(response.message);
            console.log('Token:', response.token);
            localStorage.setItem('authToken', response.token);
            this.router.navigate(['/project-module/project-create']);
          } else {
            
            alert('Unexpected response from the server.');
          }
        },
       
      );
    } else {
      alert('Please fill in all required fields.');
    }
  }
  
  }

