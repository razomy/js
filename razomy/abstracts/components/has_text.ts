import * as abstracts from '@razomy/abstracts';
export type Text = string;

export interface HasText extends abstracts.patterns.IComponent {
  text: Text;
}

export type TextType = 'thinking' | 'text' | 'example';

export interface HasTextType extends abstracts.patterns.IComponent {
  textType: TextType;
}

export type CodeLanguageType = 'ts' | 'py' | 'js' | 'sh';

export interface HasCodeLanguage extends abstracts.patterns.IComponent {
  codeLanguageType: CodeLanguageType;
}

export interface HasEntity extends abstracts.patterns.IComponent, abstracts.patterns.IHasRef {
  entity: abstracts.patterns.IdRef<abstracts.patterns.IEntity>;
}

export interface HasTask<T = Text> extends abstracts.patterns.IComponent {
  task: T;
}

export type TaskType = 'do' | 'goto' | 'repeat' | 'subtask';

export interface HasTaskType extends abstracts.patterns.IComponent {
  taskType: TaskType;
  isDone:boolean;
}

export interface HasResult extends abstracts.patterns.IComponent {
  result: any;
}

export type SenderType = 'SYSTEM' | 'USER' | 'MODEL' | 'TOOL';

export interface HasSenderType extends abstracts.patterns.IComponent {
  senderType: SenderType;
}

export interface HasSender<T extends abstracts.patterns.HasId<string>> extends abstracts.patterns.IComponent {
  sender: abstracts.patterns.IdRef<T>;
}

export interface HasFunctionHirn extends abstracts.patterns.IComponent {
  functionHirn: abstracts.translators.FunctionHirn;
}

export interface HasFn<TA extends any[], TR> extends abstracts.patterns.IComponent,abstracts.functions.HasFnHashId, abstracts.functions.HasFn<TA, TR> {
}
