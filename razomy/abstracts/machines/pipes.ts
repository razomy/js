// 1. Single-step interface
interface IPipelineStep<TInput, TOutput> {
  process(data: TInput): Promise<TOutput>;
}

// 2. Engine (simply an array of steps executed in sequence)
interface IPipeline<TInitial, TFinal> {
  steps: IPipelineStep<any, any>[];

  execute(initialData: TInitial): Promise<TFinal>;
}

// --
// 1. Global process memory (mutates at each step)
interface IWorkflowContext {
  sharedData: Record<string, any>;
  errors: string[];
}

// 2. State interface. Returns the ID of the *next* state.
interface IStateNode {
  nodeId: string;

  execute(context: IWorkflowContext): Promise<string>; // returns nextNodeId
}

// 3. Engine (Loops until it reaches the final state)
interface IStateMachine {
  currentStateId: string;
  nodes: Map<string, IStateNode>;
  context: IWorkflowContext;

  run(): Promise<void>;
}
