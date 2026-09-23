interface Part {
  supplied_by: Supplier[];
  is_part_of: Part[];
  shipped_via: Supplier[];
  installed_on: Part[];
}
interface Assembly {}
interface Supplier {}
interface Warehouse {}
interface Sensor {}
