// // S - это объединение (union) всех состояний, например: 'IDLE' | 'LOADING'
// // E - это объединение всех событий, например: 'FETCH' | 'SUCCESS'
// export type Transitions<S extends string, E extends string> = {
//   // Для конкретного события указываем, в какое состояние переходим
//   [event in E]?: S;
// };
//
// export interface StateConfig<S extends string, E extends string>  {
//   onEnter?: () => void; // Вызывается при входе в стейт
//   onExit?: () => void;  // Вызывается при выходе из стейта
//   transitions: Transitions<S, E>; // Возможные переходы из этого стейта
// }
//
// export interface MachineConfig<S extends string, E extends string>  {
//   initial: S; // Начальное состояние
//   states: Record<S, StateConfig<S, E>>; // Конфигурация всех состояний
// }
//
// export class StateMachine<S extends string, E extends string> {
//   private currentState: S;
//   public config: MachineConfig<S, E>;
//
//   constructor(config: MachineConfig<S, E>) {
//     this.config = config;
//     this.currentState = config.initial;
//
//     // Вызываем onEnter для начального состояния (если он есть)
//     this.config.states[this.currentState]?.onEnter?.();
//   }
//
//   // Получить текущее состояние
//   public get state(): S {
//     return this.currentState;
//   }
//
//   // Отправить событие для перехода
//   public dispatch(event: E): void {
//     const stateConfig = this.config.states[this.currentState];
//     const nextState = stateConfig.transitions[event];
//
//     // Если перехода для данного события в текущем стейте нет — игнорируем (или можно кинуть ошибку)
//     if (!nextState) {
//       console.warn(`Событие '${event}' недействительно для состояния '${this.currentState}'`);
//       return;
//     }
//
//     // 1. Вызываем onExit для старого состояния
//     stateConfig.onExit?.();
//
//     // 2. Меняем состояние
//     this.currentState = nextState;
//
//     // 3. Вызываем onEnter для нового состояния
//     this.config.states[this.currentState]?.onEnter?.();
//   }
// }
//
// // 1. Жестко задаем типы состояний и событий
// type FetchState = 'IDLE' | 'LOADING' | 'SUCCESS' | 'ERROR';
// type FetchEvent = 'START' | 'RESOLVE' | 'REJECT' | 'RETRY';
//
// // 2. Создаем экземпляр стейт-машины
// const fetchMachine = new StateMachine<FetchState, FetchEvent>({
//   initial: 'IDLE',
//   states: {
//     IDLE: {
//       transitions: {
//         START: 'LOADING',
//       },
//       onEnter: () => console.log('-> Готов к работе'),
//     },
//     LOADING: {
//       transitions: {
//         RESOLVE: 'SUCCESS',
//         REJECT: 'ERROR',
//       },
//       onEnter: () => console.log('-> Загрузка началась... Показываем спиннер'),
//       onExit: () => console.log('<- Загрузка завершена... Прячем спиннер'),
//     },
//     SUCCESS: {
//       transitions: {
//         // Из SUCCESS можно начать заново
//         START: 'LOADING',
//       },
//       onEnter: () => console.log('-> Данные успешно загружены!'),
//     },
//     ERROR: {
//       transitions: {
//         RETRY: 'LOADING',
//       },
//       onEnter: () => console.log('-> Ошибка! Показываем кнопку "Повторить"'),
//     },
//   },
// });
//
// // === Тестируем ===
//
// console.log(`Текущий стейт: ${fetchMachine.state}`); // IDLE
//
// // Запускаем загрузку
// fetchMachine.dispatch('START');
// console.log(`Текущий стейт: ${fetchMachine.state}`); // LOADING
//
// // Пытаемся сделать невозможный переход (ошибка загрузки во время загрузки возможна, а вот RETRY - нет)
// fetchMachine.dispatch('RETRY'); // Выдаст warning в консоль, состояние не изменится
//
// // Успешная загрузка
// fetchMachine.dispatch('RESOLVE');
// console.log(`Текущий стейт: ${fetchMachine.state}`); // SUCCESS
//
//
// function generateMermaid<S extends string, E extends string>(
//   config: MachineConfig<S, E>
// ): string {
//   let diagram = 'stateDiagram-v2\n';
//   diagram += `    [*] --> ${config.initial}\n`;
//
//   for (const [stateName, stateConfig] of Object.entries(config.states)) {
//     const transitions = (stateConfig as any).transitions;
//     for (const [event, nextState] of Object.entries(transitions)) {
//       diagram += `    ${stateName} --> ${nextState} : ${event}\n`;
//     }
//   }
//
//   return diagram;
// }
//
//
//
// // Выводим в консоль и вставляем результат в Notion/GitHub!
// console.log(generateMermaid(fetchMachine.config));
//
// // ```mermaid
// // stateDiagram-v2
// //     [*] --> IDLE
// //     IDLE --> LOADING : START
// //     LOADING --> SUCCESS : RESOLVE
// //     LOADING --> ERROR : REJECT
// //     SUCCESS --> LOADING : START
// //     ERROR --> LOADING : RETRY
// // ```
//
// // -------
//
