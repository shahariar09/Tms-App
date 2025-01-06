import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TaskCreateComponent } from './task-create.component';
import { TaskService } from '../../services/task.service';
import { UserService } from '../../../user/services/user.service';
import { of } from 'rxjs';

describe('TaskCreateComponent', () => {
  let component: TaskCreateComponent;
  let fixture: ComponentFixture<TaskCreateComponent>;
  let taskServiceSpy: jasmine.SpyObj<TaskService>;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    taskServiceSpy = jasmine.createSpyObj('TaskService', ['createTask']);
    userServiceSpy = jasmine.createSpyObj('UserService', ['getUsers']);
    
    userServiceSpy.getUsers.and.returnValue(of([]));
    taskServiceSpy.createTask.and.returnValue(of({}));

    await TestBed.configureTestingModule({
      declarations: [ TaskCreateComponent ],
      imports: [ 
        ReactiveFormsModule,
        RouterTestingModule 
      ],
      providers: [
        { provide: TaskService, useValue: taskServiceSpy },
        { provide: UserService, useValue: userServiceSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    expect(component.taskForm.get('title')?.value).toBe('');
    expect(component.taskForm.get('description')?.value).toBe('');
    expect(component.taskForm.get('priority')?.value).toBe('');
    expect(component.taskForm.get('status')?.value).toBe('');
    expect(component.taskForm.get('dueDate')?.value).toBe('');
    expect(component.taskForm.get('assignedUserIds')?.value).toEqual([]);
  });

  it('should load users on init', () => {
    expect(userServiceSpy.getUsers).toHaveBeenCalled();
  });

  it('should call createTask when form is valid and submitted', () => {
    const mockTask = {
      title: 'Test Task',
      description: 'Test Description',
      priority: 'High',
      status: 'New',
      dueDate: new Date(),
      assignedUserIds: []
    };

    component.taskForm.patchValue(mockTask);
    component.onSubmit();

    expect(taskServiceSpy.createTask).toHaveBeenCalled();
  });
});