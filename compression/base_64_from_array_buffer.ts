
export function base_64_from_array_buffer(buffer: ArrayBuffer): string {
    const uint_8_array = new Uint8Array(buffer);
    let binary = '';
    const length = uint_8_array.byteLength;
    for (let i = 0; i < length; i++) {
    binary += String.fromCharCode(uint_8_array[i]);
    }

    return btoa(binary);
}
