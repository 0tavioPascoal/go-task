import { ITask } from './../interfaces/tasks/task.interface';
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import type { ITaskFormControls } from "../interfaces/task-form-controls.interface";
import { StatusTask } from '../enums/status-task.enum';

@Injectable({
  providedIn: 'root'
})
export class TaskService{
  //tarefas em a fazer
  private todoTask$ = new BehaviorSubject<ITask[]>([]);
  readonly todoTask = this.todoTask$.asObservable(); 
  //tarefas em fazendo
private doingTask$ = new BehaviorSubject<ITask[]>([]);
  readonly doingTask = this.todoTask$.asObservable(); 
  //tarefas em concluído
  private doneTask$ = new BehaviorSubject<ITask[]>([]);
  readonly doneTask = this.todoTask$.asObservable(); 

  addTask(taskInfos: ITaskFormControls){
    const newTask:ITask = {
      ...taskInfos,
      status: StatusTask.TODO,
      id: 'aksojfoajf',
      comments: []
    }
    const currentList = this.todoTask$.value
    this.todoTask$.next([...currentList, newTask])
  }
}