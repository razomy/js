import * as abstractions from "@razomy/abstractions";

// import * as serializable from '@razomy/abstractions';
// todo:remove

export interface RollbackCancelValidateTask<C extends abstractions.patterns.Context>
  extends abstractions.patterns.HasC<C>,
    abstractions.patterns.HasValidate<[C]>,
    abstractions.patterns.HasExecute<[C]>,
    abstractions.patterns.HasCancel<[C]>,
    abstractions.patterns.HasRollback<[C]> {
}
