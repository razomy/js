import { Slug } from "razomy.path/string/path_string";
import {git_slug} from './is_packages';

export function is_git_key(slug: Slug) {
    return slug === git_slug;
}
