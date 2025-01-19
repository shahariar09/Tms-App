
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
    Id?: number; 
    Title: string; 
    Description: string; 
    Priority: string; 
    Status: string; // Open, Pending, InProgress, Done, Closed
    DueDate: Date; 
    ProjectId?: number; 
    AssignedUsers?: IUserTask[]; 
  }
  