import is_output_get_path_components from './is_output_get_path_components';
import {known_output} from './is_output';

export default function is_in_output(path_: string): boolean {
    const path_components = is_output_get_path_components(path_);
    return known_output.some(outputDir => path_components.includes(outputDir));
}
