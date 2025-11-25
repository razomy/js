export class Counter {
  value = 0

  increment(size = 1) {
    this.value = this.value + size;
  }
}