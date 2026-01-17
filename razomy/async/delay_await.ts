export async function delayAwait<T>(request: () => Promise<T>, delay = 10000) {
  const startTime = Date.now();

  while (Date.now() - startTime < delay) {
    const response = await request();
    if (response) {
      return response;
    }
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }
  throw new Error('Out of time');
}


