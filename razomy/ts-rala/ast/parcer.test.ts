import {InMemoryFileSystemHost, Project} from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsLang from '..';

describe('parse', () => {
  it('parse', () => {
    // 1. Initialize ts-morph project
    const fileSystem = new InMemoryFileSystemHost();
    const project = new Project({fileSystem});
    project.createSourceFile(
      'package.json',
      `{
    "name":"myPackage", 
    "version":"0.1.1", 
    "description":"myFavoritePackage", 
    "engines": {"node": "1.1.3"}, 
    "dependencies":{
      "myDependencies": "1.1.1"
    }}`,
    );

    project.createSourceFile(
      'example.ts',
      `
    /**
     * The unique ID of the user
     */
    type UserId = string | number;

    interface User {
        name: string;
        age: 25;
        roles: string[];
    }

    const greeting: string = "hello world";

    /**
     * @summary Calculates the sum
     * @description Calculates the sum
     * @returns Calculates the sum
       @example 
     \`\`\`ts
     a // => a 
      \`\`\`
       @complexity time O(n)
       @complexity memory O(n)
     */
    function calculateTotal(price: number, tax: number): number {
        return price + tax;
    }
    
    /**
     * @summary Calculates the sum
     * @description Calculates the sum
     * @returns Calculates the sum
     @example 
     \`\`\`ts
     a // => a 
      \`\`\`
       @complexity time O(n)
       @complexity memory O(n)
     */
    export function calculateUserAge(u2: User, u1: User): number {
        return u1.age + u2.age;
    }

    /**
     * @summary Generic function to process items
     * @description Tests type parameters (generics) and basic variable statements
      * @returns Calculates the sum
     @example 
     \`\`\`ts
     a // => a 
      \`\`\`
       @complexity time O(n)
       @complexity memory O(n)
     */
    export function processItems<T, K extends string = "id">(items: T[], key: K): T {
        let firstItem = items[0];
        return firstItem;
    }

    /**
     * @summary Validates age with branching
     * @description Tests if/else branches and throw statements
      * @returns Calculates the sum
     @example 
     \`\`\`ts
     a // => a 
      \`\`\`
       @complexity time O(n)
       @complexity memory O(n)
     */
    function validateAge(age: number): string {
        if (age < 0) {
            throw new Error("Age cannot be negative");
        } else if (age < 18) {
            let status = "minor";
            return status;
        } else {
            let status = "adult";
            return status;
        }
    }

    /**
     * @summary Finds even numbers using loops
     * @description Tests for/while loops, break, continue, and nested blocks
      * @returns Calculates the sum
     @example 
     \`\`\`ts
     a // => a 
      \`\`\`
       @complexity time O(n)
       @complexity memory O(n)
     */
    function findEvenNumbers(max: number): void {
        let limit = max;
        
        for (let i = 0; i < limit; i++) {
            if (i % 2 !== 0) {
                continue;
            }
            
            if (i > 100) {
                break;
            }
            
            let evenNum = i;
        }
        
        let count = 0;
        while (count < 5) {
            let x = count;
        }
        
        do {
            let y = count;
        } while (count < 5);
    }
`
    );

    project.createSourceFile(
      'index.ts',
      "export * as example from './example'; export {calculateUserAge} from './example';",
    );

    // 3. Run your parser!
    const modules = tsLang.ast.bindings.getPackage(project, '', false);

    expect(modules).toEqual({} as any satisfies abstracts.translators.PackageBinding);
  });
});
