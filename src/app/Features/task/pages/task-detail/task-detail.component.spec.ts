
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TaskDetailComponent } from './task-detail.component';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { HttpService } from '../../../user/services/user.service';
import { of } from 'rxjs';

describe('TaskDetailComponent', () => {
  let component: TaskDetailComponent;
  let fixture: ComponentFixture<TaskDetailComponent>;
  
  const mockTaskService = jasmine.createSpyObj(['getTaskById', 'assignMultipleUsersToTask']);
  const mockUserService = jasmine.createSpyObj(['getAllUsers']);
  
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskDetailComponent ],
      providers: [
        { provide: TaskService, useValue: mockTaskService },
        { provide: HttpService, useValue: mockUserService },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: new Map([['Id', '1']]) }}}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDetailComponent);
    component = fixture.componentInstance;
    
    mockTaskService.getTaskById.and.returnValue(of({ Id: 1, Title: 'Test Task', Description: 'Test Description', Priority: 'Medium', Status: 'Open', DueDate: new Date(), AssignedUsers: [] }));
    
    fixture.detectChanges();
    
    component.ngOnInit(); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load task details on init', () => {
    expect(component.task).toBeTruthy();
    expect(component.task?.Title).toBe('Test Task');
  });

  it('should load users', () => {
    mockUserService.getAllUsers.and.returnValue(of([{ UserId: 1, UserName: 'User One' }, { UserId: 2, UserName: 'User Two' }]));
    
    component.loadUsers();

    expect(component.users.length).toBe(2);
    expect(component.users[0].UserName).toBe('User One');
  });

});
