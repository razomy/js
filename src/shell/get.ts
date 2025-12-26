import readline from "readline";

async function get(query: string) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const r = await new Promise<string>(resolve => rl.question(query, resolve));

  rl.close();

  return r;
}

export async function get_bool(query: string) {
  const r = await get(query);
  return r.toLowerCase().trim().startsWith('y');
}
