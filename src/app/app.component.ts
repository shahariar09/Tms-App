

import { RouterModule, RouterOutlet } from '@angular/router';
import { Component } from '@angular/core'; 
import { CommonModule } from '@angular/common'; 
import { TaskModule } from './Features/task/task.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterOutlet,CommonModule,RouterModule,TaskModule], // Import RouterOutlet
})
export class AppComponent {
  userMenuOpen: boolean = false;
  taskMenuOpen: boolean = false;

  toggleUserMenu() {
    this.userMenuOpen = !this.userMenuOpen;
  }

  toggleTaskMenu() {
    this.taskMenuOpen = !this.taskMenuOpen;  // Toggle the task menu
  }

  logClick(link: string): void {
    console.log(`${link} clicked`);
  }
  
  
}
