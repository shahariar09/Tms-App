
export interface TaskItem {
    id?: number;
    title: string;
    description: string;
    priority: string;
    status: string;
    dueDate: Date;
    assignedUsers: UserTask[];
    projectId: number;     
    statusId: number;
  }
  
  export interface UserTask {
    userId: number;
    userName: string;
  }
  
  export interface CreateTaskItem {
    title: string;
    description: string;
    priority: string;
    status: string;
    dueDate: Date;
    assignedUserIds: number[];
    projectId: number;    
    statusId: number;
  }