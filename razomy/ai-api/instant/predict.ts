const url = "http://localhost:8000/api/ai-server/predict";

export async function predict(data: { messages: { role: string, content: string }[] }): Promise<string> {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  return result.text;
}

