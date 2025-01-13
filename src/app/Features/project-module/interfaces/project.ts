import { IUser } from "../../user/interfaces/user";

export interface IProject {
    Id?: number;
    Name: string;
    Description: string;
    DueDate: Date;
    AssignedUsers?: IUser[];
    
  }