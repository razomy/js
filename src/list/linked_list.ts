export class Node<T> {
    value: T;
    next: Node<T> | null;

    constructor(value: T, next: Node<T> | null = null) {
        this.value = value;
        this.next = next;
    }
}

export class LinkedList<T> {
    private head: Node<T> | null = null;
    private size: number = 0;

    // Add a value to the end of the list
    append(value: T): void {
        const newNode = new Node(value);

        if (this.head === null) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next !== null) {
                current = current.next;
            }
            current.next = newNode;
        }

        this.size++;
    }

    // Add a value to the start of the list
    prepend(value: T): void {
        const newNode = new Node(value, this.head);
        this.head = newNode;
        this.size++;
    }

    // Remove a node by value
    remove(value: T): boolean {
        if (this.head === null) return false;

        // If the value is at the head
        if (this.head.value === value) {
            this.head = this.head.next;
            this.size--;
            return true;
        }

        let current = this.head;
        while (current.next !== null) {
            if (current.next.value === value) {
                current.next = current.next.next;
                this.size--;
                return true;
            }
            current = current.next;
        }

        return false;
    }

    // Get the size of the list
    getSize(): number {
        return this.size;
    }

    // Check if the list is empty
    isEmpty(): boolean {
        return this.size === 0;
    }

    // Convert the list to an array
    toArray(): T[] {
        const result: T[] = [];
        let current = this.head;
        while (current !== null) {
            result.push(current.value);
            current = current.next;
        }
        return result;
    }

    // Print the list (for debugging purposes)
    print(): void {
        console.log(this.toArray().join(' -> '));
    }
}
