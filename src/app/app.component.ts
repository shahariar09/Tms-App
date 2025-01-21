import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { Component } from '@angular/core'; 
import { CommonModule } from '@angular/common'; 
import { LoginService } from './Features/login/services/login.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterOutlet,CommonModule,RouterModule], 
})
export class AppComponent {
  userMenuOpen: boolean = false;
  projectMenuOpen: boolean = false;;
  taskMenuOpen: boolean = false;

  constructor(private router: Router, private loginService: LoginService) {}

  toggleUserMenu() {
    this.userMenuOpen = !this.userMenuOpen;
  }
  toggleProjectMenu(){
    this.projectMenuOpen = !this.projectMenuOpen;
  }

  toggleTaskMenu(){
    this.taskMenuOpen = !this.taskMenuOpen;
  }


  logClick(link: string): void {
    console.log(`${link} clicked`);
  }

  isLoginPage(): boolean {
    return this.router.url.includes('/userLogin'); 
  }
  isChangePasswordPage(): boolean {
    return this.router.url.includes('change-password');
  }

  logout() {
    this.loginService.logout(); // Call the logout method from LoginService
  }
  
}
