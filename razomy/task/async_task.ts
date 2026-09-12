import * as abstracts from "@razomy/abstracts";

// import * as serializable from '@razomy/abstracts';
// todo:remove

export interface RollbackCancelValidateTask<C extends abstracts.domains.Context>
  extends abstracts.domains.HasC<C>,
    abstracts.machines.HasValidate<[C]>,
    abstracts.patterns.HasExecute<[C]>,
    abstracts.machines.HasCancel<[C]>,
    abstracts.machines.HasRollback<[C]> {
}
