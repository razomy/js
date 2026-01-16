
export function rgb_distance(p_1: number[], p_2: number[]) {
    return Math.sqrt(
    Math.pow(p_1[0] - p_2[0], 2) +
    Math.pow(p_1[1] - p_2[1], 2) +
    Math.pow(p_1[2] - p_2[2], 2),
    );
}
