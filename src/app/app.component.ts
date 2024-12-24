import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterOutlet,CommonModule,RouterModule], // Import RouterOutlet
})
export class AppComponent {
  userMenuOpen: boolean = false;
  title = 'Tms-App';

  toggleUserMenu() {
    this.userMenuOpen = !this.userMenuOpen;
  }

  logClick(link: string): void {
    console.log(`${link} clicked`);
  }
  
}
