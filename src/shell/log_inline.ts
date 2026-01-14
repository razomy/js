export default function log_inline(message: string) {
    process.stdout.write('\r' + message);
}
