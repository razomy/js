import { Slug } from "razomy.path/string/path_string";
import {mac_ds_store_file} from './is_packages';

export function is_mac_ds_store_key(slug: Slug) {
    return slug.endsWith(mac_ds_store_file);
}
