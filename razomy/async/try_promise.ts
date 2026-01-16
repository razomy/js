export async function try_promise(fn) {
  try {
    return await fn;
  } catch (e) {
    console.log(e);
  }
}


