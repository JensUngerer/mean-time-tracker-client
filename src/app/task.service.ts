import { InMemoryDataService } from './in-memory-data.service';
import { Injectable } from '@angular/core';
import { ITask } from '../../../common/typescript/iTask';
import uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly tasksKey = 'tasks';

  constructor(private inMemoryDataService: InMemoryDataService) { }

  public addTask(taskName: string) {
    const newTask: ITask = {
      name: taskName,
      taskId: uuid.v4()
    };
    this.inMemoryDataService.push(this.tasksKey, newTask);
  }

  public getTasks(): ITask[] {
    return this.inMemoryDataService.get(this.tasksKey);
  }

}