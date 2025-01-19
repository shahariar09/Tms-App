// src/app/Features/task/interfaces/task.ts
export interface IUser{
  Id: number;
  Name: string;
  Email: string;
  RoleId: number;
  RoleName: string;
}
export interface IUserTask {
  UserId: number;
  UserName: string;
}
  export interface ITask {
    Id?: number; // Optional for new tasks
    Title: string; // Required
    Description: string; // Required
    Priority: string; // Low, Medium, High
    Status: string; // Open, Pending, InProgress, Done, Closed
    DueDate: Date; // Required
    ProjectId?: number; // Optional if not always needed
    AssignedUsers?: IUserTask[]; // Optional list of assigned users
  }
  