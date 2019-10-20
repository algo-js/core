type TCompareFn = (a, b) => number;

export class Comparator<T> {
  public static defaultCompareFn(a, b): number {
    return a === b ? 0 : a < b ? -1 : 1;
  }

  private compareFn: TCompareFn;

  constructor(compareFn: TCompareFn = Comparator.defaultCompareFn) {
    if (typeof compareFn !== 'function') {
      compareFn = Comparator.defaultCompareFn;
    }

    this.compareFn = compareFn;
  }

  /**
   * Checks if two values are equal
   */
  public equal(a: T, b: T): boolean {
    return this.compareFn(a, b) === 0;
  }

  /**
   * Checks if variable "a" is less than "b"
   */
  public less(a: T, b: T): boolean {
    return this.compareFn(a, b) < 0;
  }

  /**
   * Checks if variable "a" is greater than "b"
   */
  public greater(a: T, b: T): boolean {
    return this.compareFn(a, b) > 0;
  }

  /**
   * Checks if variable "a" is less than or equal to "b"
   */
  public lessOrEqual(a: T, b: T): boolean {
    return this.less(a, b) || this.equal(a, b);
  }

  /**
   * Checks if variable "a" is greater than or equal to "b"
   */
  public greaterOrEqual(a: T, b: T): boolean {
    return this.greater(a, b) || this.equal(a, b);
  }

  /**
   * Reverses the comparison order
   */
  public reverse(): void {
    const compareFn = this.compareFn;
    this.compareFn = (a, b) => compareFn(b, a);
  }
}