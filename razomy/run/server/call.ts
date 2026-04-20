export async function call(packageName, functionName, args) {
  const url = "http://0.0.0.0:8000/api/run";
  const data = {
    "package_name": packageName,
    "function_name": functionName,
    "args": args
  }
  const request = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const response = await request.json();
  return response.result
}

