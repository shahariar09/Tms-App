// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';

// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';

// import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';

// @NgModule({
//   declarations: [
//     AppComponent
//   ],
//   imports: [
//     BrowserModule,
//     AppRoutingModule,
//     CommonModule,
//     RouterModule,
    
//   ],
//   providers: [],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }


// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';

// @NgModule({
//   // declarations: [
//   //   AppComponent, // Ensure AppComponent is declared here
//   // ],
//   imports: [
//     BrowserModule,
//     AppRoutingModule, // Make sure this is the routing module
//   ],
//   providers: [],
//   bootstrap: [AppComponent], // Ensure AppComponent is bootstrapped here
// })
// export class AppModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    BrowserModule,      // Include BrowserModule
    AppRoutingModule,    // Include AppRoutingModule
    AppComponent,         // Import the standalone AppComponent
    CommonModule,
    FormsModule

  ],
  providers: [],
  //bootstrap: [AppComponent],  // Bootstrap the AppComponent
})
export class AppModule {}
