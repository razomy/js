export async function try_(fn) {
  try {
    return await fn;
  } catch (e) {
    console.log(e);
  }
}


