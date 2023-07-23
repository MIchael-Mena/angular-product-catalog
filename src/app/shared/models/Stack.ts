export class Stack<T> {
  private readonly stack: { [key: number]: T };
  private count: number;

  constructor() {
    this.stack = {};
    this.count = 0;
  }

  public push(element: T): { [key: number]: T } {
    this.stack[this.count] = element;
    this.count++;
    return this.stack;
  }

  public pop(): T | undefined {
    this.count--;
    const element = this.stack[this.count];
    delete this.stack[this.count];
    return element;
  }

  public peek(): T | undefined {
    return this.stack[this.count - 1];
  }

  public size(): number {
    return this.count;
  }

  public print(): void {
    console.log(this.stack);
  }
}
