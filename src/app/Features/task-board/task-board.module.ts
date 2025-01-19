
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BoardComponent } from './pages/board/board.component';
import { TaskBoardRoutingModule } from './task-board-routing.module';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [BoardComponent],
  imports: [
    CommonModule,
    TaskBoardRoutingModule,
    DragDropModule,
    RouterModule
  ]
})
export class TaskBoardModule {}