import * as abstracts from "@razomy/abstracts";

export interface Domain extends abstracts.patterns.IEntity {
  name: string;
  type: string;
  company: abstracts.patterns.IdRef<Company>;
}

export interface Company extends abstracts.patterns.IEntity{
  name: string;
}
