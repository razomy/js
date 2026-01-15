export async function delay_await<T>(request: () => Promise<T>, delay = 10000) {
  const start_time = Date.now();

  while (Date.now() - start_time < delay) {
    const response = await request();
    if (response) {
      return response;
    }
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }
  throw new Error("Out of time");
}


