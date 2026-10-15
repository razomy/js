import * as abstractions from '@razomy/abstractions';
export type IMessageNode = abstractions.patterns.IEntity;

// ui
export type TextMn = IMessageNode &
  abstractions.components.HasText &
  abstractions.components.HasTextType & { kind: 'TextMn' };
export type CodeMn = IMessageNode &
  abstractions.components.HasText &
  abstractions.components.HasCodeLanguage & { kind: 'CodeMn' };

// data
export type EntityMn = IMessageNode &
  abstractions.components.HasEntity & { kind: 'EntityMn' };

// process
export type TaskMn = IMessageNode &
  abstractions.components.HasTaskType &
  abstractions.components.HasTask &{tasks: abstractions.patterns.IdRef<TaskMn>[]} & { kind: 'TaskMn' };
export type SenderMn = IMessageNode &
  abstractions.components.HasSenderType & { kind: 'SenderMs' };

// tool
export type ITool<A extends any[] = any[], R = void> = IMessageNode & abstractions.components.HasFunctionHirn &
  abstractions.components.HasFn<A, R>;

export type RequestMn = ITool & abstractions.functions.HasArgs<any> & { kind: 'RequestMn' };
export type ResultMn = ITool & abstractions.components.HasResult & { kind: 'ResultMn' };
export type ToolMn = ITool  & { kind: 'ToolMn' };

// ui
export type AnyMn = TextMn | CodeMn | EntityMn | TaskMn | RequestMn | ResultMn | ToolMn | InteractionTurn;

export type HasMessages = {
  messages: abstractions.patterns.IdRefArray<AnyMn>;
};
export type InteractionTurn = abstractions.patterns.IEntity &
  abstractions.components.HasSender<SenderMn> &
  abstractions.patterns.IHasRef &
  HasMessages & { kind: 'InteractionTurn' };
export type InteractionEntity = abstractions.patterns.IEntity &
  abstractions.patterns.IHasRef & {
    interactionTurns: InteractionTurn[];
  };

export type HasInteractionEntity = {
  interactionEntity: abstractions.patterns.IdRef<InteractionEntity>;
};
