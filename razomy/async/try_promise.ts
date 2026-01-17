export async function tryPromise(fn) {
  try {
    return await fn;
  } catch (e) {
    console.log(e);
  }
}


