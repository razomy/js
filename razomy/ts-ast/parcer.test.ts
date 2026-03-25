// usage.ts
import {Project} from "ts-morph";
import {parseProjectToModules} from "./parse_project_to_modules"; // assuming you saved the code above in parser.ts


describe('parse', () => {
  it('parse', () => {

// 1. Initialize ts-morph project
    const project = new Project();

// 2. Add some source files (or load an entire tsconfig.json)
    project.createSourceFile("example.ts", `
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
     * Calculates the sum
     */
    function calculateTotal(price: number, tax: number): number {
        return price + tax;
    }
    
    /**
     * Calculates the sum
     */
    function calculateUserAge(u2: User, u1: User): number {
        return u1.age + u2.age;
    }
`);

// 3. Run your parser!
    const modules = parseProjectToModules(project);

// 4. View results
    console.log(JSON.stringify(modules, null, 2));
  });
});
