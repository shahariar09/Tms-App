
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BoardComponent } from './pages/board/board.component';
import { TaskBoardRoutingModule } from './task-board-routing.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [BoardComponent],
  imports: [
    CommonModule,
    TaskBoardRoutingModule,
    DragDropModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class TaskBoardModule {}