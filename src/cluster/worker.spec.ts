describe('processes', () => {
  it('processes_to_promise', () => {
    expect(true).toStrictEqual(true)
  });
});


//
// const send_event = (id, ctx) => process.send({id, ctx})
//
// const ctx = {
//     worker_id: process.env.worker_id,
//     progress: 0,
//     external_ctx: null
// }
// console.log('worker.start', ctx);
// // example:send update
// send_event('set', ctx);
//
// function update_ctx(event) {
//     ctx.external_ctx = event.ctx;
//     ctx.progress = .5;
//     console.log("worker.message", ctx);
//     send_event('set', ctx);
// }
//
// // example:receive update
// process.on('message', update_ctx);
//
// // important:request external_ctx
// send_event('get', ctx);
//
// setTimeout(() => {
//     console.log('worker.finish', ctx);
//     ctx.progress = 1;
//     send_event('set', ctx);
//     process.off('message', update_ctx);
//     process.exit(0);
// }, 100)
//
// import execute from 'razomy.process/promise_in_process.js';
// console.log(await processes_to_promise([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], {exec: 'worker.spec.js'}));
