import type { RecursiveDict } from "./recursive";

export function deleteByPath(obj: RecursiveDict, path: string): void {
    const parts = path.split('.');
    const last = parts.pop();
    if (!last) return;
    const target = parts.reduce((acc, part) => acc && acc[part], obj);
    if (target) delete target[last];
}
