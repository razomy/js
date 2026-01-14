
export default function parse_status_ref(str: string) {
    var refs = {};
    var lines = str.length === 0 ? [] : str.split('\n');
    lines.forEach(function (str) {
    str = str.trim();
    if (str.length === 0) return;
    var parts = str.split(/\s+/);
    refs[parts[1]] = parts[0];

    });
    return refs;
}
