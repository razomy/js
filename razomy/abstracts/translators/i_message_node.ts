import * as abstracts from '@razomy/abstracts';
import type { IdRef } from '@razomy/abstracts/patterns';

export type IMessageNode = abstracts.patterns.IEntity;

// ui
export type TextMn = IMessageNode &
  abstracts.components.HasText &
  abstracts.components.HasTextType & { kind: 'TextMn' };
export type CodeMn = IMessageNode &
  abstracts.components.HasText &
  abstracts.components.HasCodeLanguage & { kind: 'CodeMn' };

// data
export type EntityMn = IMessageNode &
  abstracts.components.HasEntity & { kind: 'EntityMn' };

// process
export type TaskMn = IMessageNode &
  abstracts.components.HasTaskType &
  abstracts.components.HasTask &{tasks: IdRef<TaskMn>[]} & { kind: 'TaskMn' };
export type SenderMn = IMessageNode &
  abstracts.components.HasSenderType & { kind: 'SenderMs' };

// tool
export type ITool<A extends any[] = any[], R = void> = IMessageNode & abstracts.components.HasFunctionHirn &
  abstracts.components.HasFn<A, R>;

export type RequestMn = ITool & abstracts.functions.HasArgs<any> & { kind: 'RequestMn' };
export type ResultMn = ITool & abstracts.components.HasResult & { kind: 'ResultMn' };
export type ToolMn = ITool  & { kind: 'ToolMn' };

// ui
export type AnyMn = TextMn | CodeMn | EntityMn | TaskMn | RequestMn | ResultMn | ToolMn | InteractionTurn;

export type HasMessages = {
  messages: abstracts.patterns.IdRefArray<AnyMn>;
};
export type InteractionTurn = abstracts.patterns.IEntity &
  abstracts.components.HasSender<SenderMn> &
  abstracts.patterns.IHasRef &
  HasMessages & { kind: 'InteractionTurn' };
export type InteractionEntity = abstracts.patterns.IEntity &
  abstracts.patterns.IHasRef & {
    interactionTurns: InteractionTurn[];
  };

export type HasInteractionEntity = {
  interactionEntity: IdRef<InteractionEntity>;
};
