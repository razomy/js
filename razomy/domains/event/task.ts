import * as abstractions from "@razomy/abstractions";

export interface Task{
  taskKey:string,
  status:string,
  payload:abstractions.patterns.Json,
}
