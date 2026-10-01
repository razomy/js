import * as abstracts from "@razomy/abstracts";

export interface Task{
  taskKey:string,
  status:string,
  payload:abstracts.patterns.Json,
}
