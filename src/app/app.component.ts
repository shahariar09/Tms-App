// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.scss'
// })
// export class AppComponent {
//   title = 'Tms-App';
// }


import { RouterModule, RouterOutlet } from '@angular/router';
import { Component } from '@angular/core'; 
import { CommonModule } from '@angular/common'; 


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterOutlet,CommonModule,RouterModule], // Import RouterOutlet
})
export class AppComponent {
  userMenuOpen: boolean = false;
  projectMenuOpen: boolean = false;;
  

  toggleUserMenu() {
    this.userMenuOpen = !this.userMenuOpen;
  }
  toggleProjectMenu(){
    this.projectMenuOpen = !this.projectMenuOpen;
  }

  logClick(link: string): void {
    console.log(`${link} clicked`);
  }
  
}
