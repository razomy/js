import {createInt} from './create_int';

export function createMac () : string { return Array.from({length: 6}, () => createInt(0, 255).toString(16).padStart(2, '0')).join(':').toUpperCase(); }