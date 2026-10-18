export async function call(packageName, functionName, args) {
  const url = "http://0.0.0.0:8000/api/run";
  const req = {
    "package_name": packageName,
    "function_name": functionName,
    "args": args
  }
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status} data: ${JSON.stringify(data)}`);
  }
  return data['result']
}

