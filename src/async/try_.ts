async function try_(fn) {
  try {
    return await fn;
  } catch (e) {
    console.log(e);
  }
}

export default try_;
