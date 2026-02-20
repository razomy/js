export async function tryPromise(fn: any) {
  try {
    return await fn;
  } catch (e) {
    console.log(e);
  }
}


