
// 1. Единый "контейнер" для всех дженериков стейта
export interface PipelineDef {
  value: object;
  get: object;
  children: object;
  parent: object;
}

// 2. Дефолтные безопасные типы (как у вас)
export interface DefaultPipelineDef extends PipelineDef {
  value: object;
  get: object;
  children: object;
  parent: object;
}

// 3. Базовый интерфейс теперь принимает только ОДИН дженерик
export interface PipelineState<TDef extends PipelineDef = DefaultPipelineDef> {
  value: TDef['value'];
  get: TDef['get'];
  children: TDef['children'];
  parent: TDef['parent'];
}
