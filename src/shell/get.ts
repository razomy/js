import readline from 'readline';

export async function get(query: string) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const r = await new Promise<string>(resolve => rl.question(query, resolve));

  rl.close();

  return r;
}
