export interface Task {
  id: string;
  description: string;
  title: string;
  status: TasksStatus;
}

export enum TasksStatus {
  OPEN,
  IN_PROGRESS,
  DONE,
}
