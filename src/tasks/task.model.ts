export interface Task {
  id: string;
  description: string;
  title: string;
  status: TasksStatus;
  createdAt: EpochTimeStamp;
}

export enum TasksStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
