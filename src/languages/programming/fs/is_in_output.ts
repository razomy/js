import {is_output_get_path_components} from './is_output_get_path_components';
import {known_output} from './is_output';

export function is_in_output(path: string): boolean {
    const path_components = is_output_get_path_components(path);
    return known_output.some(outputDir => path_components.includes(outputDir));
}
