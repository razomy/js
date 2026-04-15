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

// --
// 1. Task (has a reference to the parent)
interface ITask {
  id: string;
  parentId: string | null;
  handlerKey: string;
  payload: any;
}

// 2. Flow control directive (what the engine should do)
type StackDirective =
  | { action: 'POP_SUCCESS'; result: any }
  | { action: 'PUSH_SUBTASKS'; tasks: ITask[] }
  | { action: 'POP_ERROR'; error: Error };

// 3. Handler (Executor)
interface ITaskHandler {
  handle(task: ITask): Promise<StackDirective>;
}

// 4. Engine (Works on the LIFO principle - Last In, First Out)
interface IStackMachine {
  callStack: ITask[]; // The main difference from FSM is an array instead of a single state
  handlers: Map<string, ITaskHandler>;

  tick(): Promise<void>; // Takes the top task and executes
}

// --
// 1. Data packet (Graph edge)
interface IMessage {
  messageId: string;
  senderId: string;
  receiverId: string;
  topic: string; // For example: "NEED_CODE_REVIEW"
  payload: any;
}

// 2. Node (Actor). Has its own mailbox and isolated memory.
interface IActor {
  actorId: string;
  mailbox: IMessage[]; // Incoming message queue

  // The actor decides when to read mail and who to reply to
  processNextMessage(): Promise<IMessage | null>; // Can return a new message to send
}

// 3. Infrastructure (Data bus, delivers messages)
interface IMessageBroker {
  actors: Map<string, IActor>;

  dispatch(msg: IMessage): void; // Finds the receiverId and puts it in the mailbox
}

// --
// 1. Contract (Task, thrown into the shared space)
interface IJobContract {
  jobId: string;
  requiredTags: string[]; // For example: ["database", "sql"]
  budget: number; // Resource (token/time) limit
  payload: any;
}

// 2. Bid (Worker response: "I'm ready to do this")
interface IJobBid {
  jobId: string;
  workerId: string;
  estimatedCost: number;
}

// 3. Executor (Listens to the bus, evaluates its capabilities)
interface IWorker {
  workerId: string;
  capabilities: string[]; // For example: ["sql", "python"]

  evaluateJob(job: IJobContract): Promise<IJobBid | null>;

  executeJob(job: IJobContract): Promise<any>;
}

// 4. Job Board (Matcher)
interface IJobMarket {
  publishJob(job: IJobContract): void;

  // Collects bids from workers whose capabilities match requiredTags,
  // selects a winner and assigns the task to them.
  assignJob(jobId: string): Promise<void>;
}
