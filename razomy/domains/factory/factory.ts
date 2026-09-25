interface Part {
  suppliedBy: Supplier[];
  isPartOf: Part[];
  shippedVia: Supplier[];
  installedOn: Part[];
}
interface Assembly {}
interface Supplier {}
interface Warehouse {}
interface Sensor {}
