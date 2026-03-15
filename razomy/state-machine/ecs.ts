// export type Transitions<S extends string, E extends string> = {
//   // Для конкретного события указываем, в какое состояние переходим
//   [event in E]?: S;
// };
//
//
// export interface MachineConfig<S extends string, E extends string> {
//   initial: S; // Начальное состояние
//   states: Transitions<S, E>; // Конфигурация всех состояний
// }
//
//
// // ==========================================
// // 1. ДАННЫЕ (Компоненты и Конфиг)
// // ==========================================
//
// type FetchState = 'IDLE' | 'LOADING' | 'SUCCESS' | 'ERROR';
// type FetchEvent = 'START' | 'RESOLVE' | 'REJECT' | 'RETRY';
// // Чистый граф переходов (никаких функций)
// const FSM_CONFIG: MachineConfig<FetchState, FetchEvent> = {
//   initial: 'IDLE',
//   states: {
//     START: 'LOADING',
//     RESOLVE: 'SUCCESS',
//     REJECT: 'ERROR',
//     RETRY: 'LOADING',
//   }
// };
//
//
// // Наша сущность - это просто объект с состоянием
// const fetchTask = {
//   id: 'my_fetch_1',
//   state: 'IDLE'
// };
//
//
// // ==========================================
// // 2. ЛОГИКА (Системы)
// // ==========================================
//
// // Система 1: Меняет состояние
// function dispatchSystem(entity, event) {
//   const nextState = FSM_CONFIG[entity.state]?.[event];
//
//   if (nextState) {
//     const prevState = entity.state;
//     entity.state = nextState; // мутируем состояние сущности
//
//     // Сразу дергаем систему эффектов (реактивность вместо tick)
//     effectsSystem(entity, prevState, nextState);
//   }
// }
//
// // Система 2: Выполняет сайд-эффекты
// function effectsSystem(entity, from, to) {
//   // onExit
//   if (from === 'LOADING') console.log('<- Прячем спиннер');
//
//   // onEnter
//   if (to === 'LOADING') console.log('-> Показываем спиннер');
//   if (to === 'SUCCESS') console.log('-> Данные успешно загружены!');
//   if (to === 'ERROR') console.log('-> Ошибка! Показываем кнопку "Повторить"');
// }
//
//
// // ==========================================
// // 3. ИСПОЛЬЗОВАНИЕ
// // ==========================================
//
// console.log(`Стартовый стейт: ${fetchTask.state}`);
//
// dispatchSystem(fetchTask, 'START');
// // -> Показываем спиннер
//
// dispatchSystem(fetchTask, 'RESOLVE');
// // <- Прячем спиннер
// // -> Данные успешно загружены!
//
// console.log(`Текущий стейт: ${fetchTask.state}`); // SUCCESS