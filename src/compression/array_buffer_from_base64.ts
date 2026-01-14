
export default function array_buffer_from_base64(base64: string): Uint8Array {
    const binary = atob(base64);
    const length = binary.length;
    const uint8array = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
    uint8array[i] = binary.charCodeAt(i);
    }

    return uint8array;
}
