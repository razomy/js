export async function create<T>({batch_size, promises}: { batch_size: number, promises: Promise<T>[] }): Promise<T[]> {
    let current_batch_start = 0;
    const result: T[] = [];

    async function nextBatch() {
        const batch_promises: Promise<void>[] = [];
        for (let i = current_batch_start; i < Math.min(current_batch_start + batch_size, promises.length); i++) {
            const worker = promises[i];
            batch_promises.push(worker.then((i) => {
                result[promises.indexOf(worker)] = i;
                current_batch_start += 1;
                if (current_batch_start % batch_size !== 0) {
                    return;
                }
                nextBatch();
            }))
        }
        return await Promise.all(batch_promises);
    }

    await nextBatch();

    return result;
}

//const f_p = i => new Promise(resolve => resolve(i));
//console.log(await batch({batchSize: 1, promises: [f_p(1), f_p(2), f_p(3), f_p(4)]}));
export default create;
