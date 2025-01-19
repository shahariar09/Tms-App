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
  taskMenuOpen: boolean = false;

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
  
}
