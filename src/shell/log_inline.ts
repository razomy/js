export function logInline(message: string) {
  process.stdout.write('\r' + message);
}
