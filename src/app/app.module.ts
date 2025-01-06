

// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';

// @NgModule({
//   imports: [
//     BrowserModule,      // Include BrowserModule
//     AppRoutingModule,    // Include AppRoutingModule
//     AppComponent         // Import the standalone AppComponent
//   ],
//   providers: [],
//   //bootstrap: [AppComponent],  // Bootstrap the AppComponent
// })
// export class AppModule {}
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskModule } from './Features/task/task.module';  // Import TaskModule without HttpClientModule

@NgModule({
  declarations: [
    AppComponent  // Declare your main app component here
  ],
  imports: [
    BrowserModule,    // Include the BrowserModule
    TaskModule,       // Include TaskModule (task-related features)
    AppRoutingModule  // Include routing module for navigation
  ],
  providers: [],
  bootstrap: [AppComponent]  // Bootstrap the AppComponent
})
export class AppModule { }

