import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TaskListComponent } from './task-list.component';
import { TaskService } from '../../services/task.service';
import { of } from 'rxjs';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskServiceSpy: jasmine.SpyObj<TaskService>;

  beforeEach(async () => {
    taskServiceSpy = jasmine.createSpyObj('TaskService', ['getTasks', 'deleteTask']);
    taskServiceSpy.getTasks.and.returnValue(of([]));
    taskServiceSpy.deleteTask.and.returnValue(of(void 0));

    await TestBed.configureTestingModule({
      declarations: [ TaskListComponent ],
      imports: [ RouterTestingModule ],
      providers: [
        { provide: TaskService, useValue: taskServiceSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load tasks on init', () => {
    expect(taskServiceSpy.getTasks).toHaveBeenCalled();
  });

  it('should delete task when confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    component.deleteTask(1);
    expect(taskServiceSpy.deleteTask).toHaveBeenCalledWith(1);
  });

  it('should not delete task when not confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    component.deleteTask(1);
    expect(taskServiceSpy.deleteTask).not.toHaveBeenCalled();
  });
});