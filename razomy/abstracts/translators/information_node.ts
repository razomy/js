import * as abstracts from "@razomy/abstracts";

export type Text = string;

export interface InformationNode extends abstracts.meta.IHas {
  kind: string;
}

export interface HasText extends InformationNode {
  text: Text;
}

export type TextType = 'thinking' | 'text' | 'channel' | 'example';

export interface HasTextType extends InformationNode {
  textType: TextType;
}

export type CodeLanguage = 'ts' | 'py' | 'js' | 'sh';

export interface HasCodeLanguage extends InformationNode {
  codeLanguage: CodeLanguage;
}

export interface HasEntityRef extends InformationNode, abstracts.domains.IHasRef {
  entity: abstracts.domains.IdRef<abstracts.domains.IEntity>;
}

export interface HasTask extends InformationNode {
  task: Text;
}

export interface HasTasksRef extends InformationNode, abstracts.domains.IHasRef {
  tasks: abstracts.domains.IdRefArray<TaskIn>;
}

export type TaskType = 'do' | 'goto' | 'task' | 'loop' | 'task_done' | 'subtask';

export interface HasTaskType extends InformationNode {
  taskType: TaskType;
}

export interface HasCallRef extends abstracts.domains.IHasRef {
  call: abstracts.domains.CallRef;
}

export interface HasArguments extends InformationNode {
  arguments_: any[];
}

export interface HasResult extends InformationNode {
  result: any;
}

export type InteractionTurnSender = 'SYSTEM' | 'USER' | 'MODEL' | 'TOOL';

export interface HasSender extends InformationNode {
  sender: InteractionTurnSender;
}

export interface HasInteractionInsRef extends InformationNode, abstracts.domains.IHasRef {
  interactionIns: abstracts.domains.IdRefArray<AnyIn>;
}

export interface InteractionIn extends abstracts.domains.IEntity {
}

export type TextIn = InteractionIn & HasText & HasTextType & { kind: 'TextIn' };
export type CodeIn = InteractionIn & HasText & HasCodeLanguage & { kind: 'CodeIn' };
export type EntityIn = InteractionIn & HasEntityRef & { kind: 'EntityIn' };
export type TaskIn = InteractionIn & HasTaskType & HasTask & HasTasksRef & { kind: 'TaskIn' };
export type CallIn = InteractionIn & HasCallRef & HasArguments & { kind: 'CallIn' };
export type ResultIn = InteractionIn & HasCallRef & HasResult & { kind: 'ResultIn' };
export type ToolIn = InteractionIn & HasCallRef & { kind: 'ToolIn' };

export type InteractionTurnIn = InteractionIn & HasSender & HasInteractionInsRef & {
  kind: 'InteractionTurnIn'
};

export type AnyIn = TextIn
  | CodeIn
  | EntityIn
  | TaskIn
  | CallIn
  | ResultIn
  | ToolIn
  | InteractionTurnIn;

export interface HasInteractionTurns extends InformationNode {
  interactionTurns: abstracts.domains.IdRefArray<InteractionTurnIn>,
}

export type InteractionEntity = abstracts.domains.IEntity & HasInteractionTurns;

export interface HasInteractionEntityRef extends InformationNode, abstracts.domains.IHasRef {
  interactionEntity: abstracts.domains.IdRef<InteractionEntity>;
}
