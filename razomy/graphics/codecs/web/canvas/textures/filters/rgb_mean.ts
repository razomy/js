
export function rgb_mean(p_tab: any) {
    var m = [0, 0, 0];
    for (var i = 0; i < p_tab.length; i++) {
    m[0] += p_tab[i][0];
    m[1] += p_tab[i][1];
    m[2] += p_tab[i][2];
    }

    m[0] /= p_tab.length;
    m[1] /= p_tab.length;
    m[2] /= p_tab.length;
    return m;
}
