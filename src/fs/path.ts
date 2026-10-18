// 2. Define the Path class
export class Path {
  private currentPath: string;

  constructor(initialPath: string = '') {
    this.currentPath = initialPath;
  }

  /**
   * Joins segments together with normalized separators ('/')
   */
  join(...args: (string | Path)[]): Path {
    const segments = args.map((arg) => (arg instanceof Path ? arg.toString_() : arg));
    const allParts = [this.currentPath, ...segments].filter(Boolean);

    // Normalize slashes (replaces backslashes, removes redundant slashes)
    const combined = allParts.join('/').replace(/\\/g, '/').replace(/\/+/g, '/');

    return new Path(combined);
  }

  /**
   * Returns the path as a plain string
   */
  toString_(): string {
    return this.currentPath;
  }

  /**
   * Getter for the raw string value
   */
  get value(): string {
    return this.currentPath;
  }
}
