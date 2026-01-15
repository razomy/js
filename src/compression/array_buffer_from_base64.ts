
export function array_buffer_from_base_64(base_64: string): Uint8Array {
    const binary = atob(base_64);
    const length = binary.length;
    const uint_8_array = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
    uint_8_array[i] = binary.charCodeAt(i);
    }

    return uint_8_array;
}
