import { IUser } from './user';

export interface TaskItem {
    id: number;
    title: string;
    description: string;
    priority: 'Low' | 'Medium' | 'High';
    status: 'To-Do' | 'In Progress' | 'Completed';
    dueDate: Date;
    assignedUsers: IUser[];
}
