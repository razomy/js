import * as abstractions from "@razomy/abstractions";

export interface Domain extends abstractions.patterns.IEntity {
  name: string;
  type: string;
  company: abstractions.patterns.IdRef<Company>;
}

export interface Company extends abstractions.patterns.IEntity{
  name: string;
}
