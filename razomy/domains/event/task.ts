import type {Json} from "../../abstracts/domains/serializable";

export interface Task{
  taskKey:string,
  status:string,
  payload:Json,
}
