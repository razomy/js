import * as abstracts from "@razomy/abstracts";

// import * as serializable from '@razomy/abstracts';
// todo:remove

export interface RollbackCancelValidateTask<C extends abstracts.patterns.Context>
  extends abstracts.patterns.HasC<C>,
    abstracts.patterns.HasValidate<[C]>,
    abstracts.patterns.HasExecute<[C]>,
    abstracts.patterns.HasCancel<[C]>,
    abstracts.patterns.HasRollback<[C]> {
}
