import {createInt} from './create_int';

export function createIpv4 () : string { return Array.from({length: 4}, () => createInt(0, 255)).join('.'); }