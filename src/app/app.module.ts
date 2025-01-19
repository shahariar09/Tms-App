
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
