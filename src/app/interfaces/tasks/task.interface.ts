import type { IComment } from "../comment/comment.interface";
import type { StatusTask } from "../../enums/status-task.enum";

type TaskStatus = StatusTask.DOING | StatusTask.DONE | StatusTask.TODO

export interface ITask{
  id: string,
  name: string,
  description: string,
  comments: IComment[]
  status: TaskStatus
}