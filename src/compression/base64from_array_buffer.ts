
export default function base64from_array_buffer(buffer: ArrayBuffer): string {
    const uint8array = new Uint8Array(buffer);
    let binary = '';
    const length = uint8array.byteLength;
    for (let i = 0; i < length; i++) {
    binary += String.fromCharCode(uint8array[i]);
    }

    return btoa(binary);
}
