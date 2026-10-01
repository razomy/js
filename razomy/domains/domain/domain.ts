import * as abstracts from "@razomy/abstracts";

export interface Domain {
  name: string;
  type: string;
  company: abstracts.patterns.IdRef<Company>;
}

export interface Company {
  name: string;
}
