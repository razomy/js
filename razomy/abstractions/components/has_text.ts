import * as abstractions from '@razomy/abstractions';
export type Text = string;

export interface HasText extends abstractions.patterns.IComponent {
  text: Text;
}

export type TextType = 'thinking' | 'text' | 'example';

export interface HasTextType extends abstractions.patterns.IComponent {
  textType: TextType;
}

export type CodeLanguageType = 'ts' | 'py' | 'js' | 'sh';

export interface HasCodeLanguage extends abstractions.patterns.IComponent {
  codeLanguageType: CodeLanguageType;
}

export interface HasEntity extends abstractions.patterns.IComponent, abstractions.patterns.IHasRef {
  entity: abstractions.patterns.IdRef<abstractions.patterns.IEntity>;
}

export interface HasTask<T = Text> extends abstractions.patterns.IComponent {
  task: T;
}

export type TaskType = 'do' | 'goto' | 'repeat' | 'subtask';

export interface HasTaskType extends abstractions.patterns.IComponent {
  taskType: TaskType;
  isDone:boolean;
}

export interface HasResult extends abstractions.patterns.IComponent {
  result: any;
}

export type SenderType = 'SYSTEM' | 'USER' | 'MODEL' | 'TOOL';

export interface HasSenderType extends abstractions.patterns.IComponent {
  senderType: SenderType;
}

export interface HasSender<T extends abstractions.patterns.HasId<string>> extends abstractions.patterns.IComponent {
  sender: abstractions.patterns.IdRef<T>;
}

export interface HasFunctionHirn extends abstractions.patterns.IComponent {
  functionHirn: abstractions.translators.FunctionHirn;
}

export interface HasFn<TA extends any[], TR> extends abstractions.patterns.IComponent,abstractions.functions.HasFnHashId, abstractions.functions.HasFn<TA, TR> {
}
