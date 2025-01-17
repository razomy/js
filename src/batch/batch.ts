export async function batch<T>({batchSize, promises}: { batchSize: number, promises: Promise<T>[] }): Promise<T[]> {
    let currentBatchStart = 0;
    const result: T[] = [];

    async function nextBatch() {
        const batch_promises: Promise<void>[] = [];
        for (let i = currentBatchStart; i < Math.min(currentBatchStart + batchSize, promises.length); i++) {
            const worker = promises[i];
            batch_promises.push(worker.then((i) => {
                result[promises.indexOf(worker)] = i;
                currentBatchStart += 1;
                if (currentBatchStart % batchSize !== 0) {
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