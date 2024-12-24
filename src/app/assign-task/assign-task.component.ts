import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-assign-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './assign-task.component.html',
  styleUrl: './assign-task.component.scss'
})
export class AssignTaskComponent {
  taskForm: FormGroup;
  priorityLevels = ['HIGH', 'MEDIUM', 'LOW'];
  users = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Williams']; // Example users

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      dueDate: ['', [Validators.required]],
      priority: ['', [Validators.required]],
      user: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      console.log(this.taskForm.value);
      // Add your submission logic here
    } else {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.taskForm.controls).forEach(key => {
        const control = this.taskForm.get(key);
        control?.markAsTouched();
      });
    }
  }
}
