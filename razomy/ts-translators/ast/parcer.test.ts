import { InMemoryFileSystemHost, Project } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsTranslators from '@razomy/ts-translators';

describe('parse', () => {
  it('parse', () => {
    // 1. Initialize ts-morph project
    const fileSystem = new InMemoryFileSystemHost();
    const project = new Project({ fileSystem });
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

    // 2. Add some source files (or load an entire tsconfig.json)
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
`,
    );

    project.createSourceFile(
      'index.ts',
      "export * as example from './example'; export {calculateUserAge} from './example';",
    );

    // 3. Run your parser!
    const modules = tsTranslators.ast.bindings.getPackageDeclaration(project, '');

    expect(modules).toEqual({
      body: [
        {
          body: [
            {
              kind: 'AliasShapeBinding',
              meta: {
                description: '',
              },
              shape: {
                kind: 'UnionShape',
                shapes: [
                  {
                    kind: 'BuildInShape',
                    type: 'String',
                    value: 'string',
                  },
                  {
                    kind: 'BuildInShape',
                    type: 'Number',
                    value: 'number',
                  },
                ],
              },
              shapeIdentifier: {
                kind: 'ShapeIdentifier',
                name: 'UserId',
              },
            },
            {
              extends_: [],
              kind: 'InterfaceShapeBinding',
              meta: {
                description: '',
              },
              properties: [
                {
                  kind: 'PropertyShape',
                  meta: {
                    description: '',
                  },
                  shape: {
                    kind: 'BuildInShape',
                    type: 'String',
                    value: 'string',
                  },
                  shapeIdentifier: {
                    kind: 'ShapeIdentifier',
                    name: 'name',
                  },
                },
                {
                  kind: 'PropertyShape',
                  meta: {
                    description: '',
                  },
                  shape: {
                    kind: 'BuildInShape',
                    type: 'Number',
                    value: '25',
                  },
                  shapeIdentifier: {
                    kind: 'ShapeIdentifier',
                    name: 'Number',
                  },
                },
                {
                  kind: 'PropertyShape',
                  meta: {
                    description: '',
                  },
                  shape: {
                    kind: 'ArrayShape',
                    shapes: [
                      {
                        kind: 'BuildInShape',
                        type: 'String',
                        value: 'string',
                      },
                    ],
                    type: 'Array',
                  },
                  shapeIdentifier: {
                    kind: 'ShapeIdentifier',
                    name: 'roles',
                  },
                },
              ],
              shapeIdentifier: {
                kind: 'ShapeIdentifier',
                name: 'User',
              },
            },
            {
              expression: {
                kind: 'BuildInExpression',
                type: 'String',
                value: 'hello world',
              },
              identifier: {
                kind: 'Identifier',
                name: 'greeting',
              },
              kind: 'VariableBinding',
              meta: {
                description: '',
              },
              modifiers: ['const'],
              shapeIdentifier: {
                kind: 'ShapeIdentifier',
                name: 'String',
              },
            },
            {
              body: [],
              identifier: {
                kind: 'Identifier',
                name: 'calculateTotal',
              },
              kind: 'FunctionBinding',
              meta: {
                description: 'Calculates the sum',
                examples: [
                  {
                    code: 'a',
                    expected: 'a',
                  },
                ],
                performance: {
                  history: [],
                  memoryDataSizeComplexityFn: 'O(n)',
                  timeDataSizeComplexityFn: 'O(n)',
                },
                title: 'Calculates the sum',
              },
              modifiers: [],
              parameters: [
                {
                  expression: null,
                  identifier: {
                    kind: 'Identifier',
                    name: 'price',
                  },
                  isRest: false,
                  kind: 'ParameterBinding',
                  meta: {
                    description: '',
                  },
                  shapeIdentifier: {
                    kind: 'ShapeIdentifier',
                    name: 'Number',
                  },
                },
                {
                  expression: null,
                  identifier: {
                    kind: 'Identifier',
                    name: 'tax',
                  },
                  isRest: false,
                  kind: 'ParameterBinding',
                  meta: {
                    description: '',
                  },
                  shapeIdentifier: {
                    kind: 'ShapeIdentifier',
                    name: 'Number',
                  },
                },
              ],
              returnType: {
                kind: 'ReturnShape',
                meta: {
                  description: 'Calculates the sum',
                },
                shapeIdentifier: {
                  kind: 'ShapeIdentifier',
                  name: 'Number',
                },
              },
              shapes: [],
            },
            {
              body: [],
              identifier: {
                kind: 'Identifier',
                name: 'calculateUserAge',
              },
              kind: 'FunctionBinding',
              meta: {
                description: 'Calculates the sum',
                examples: [
                  {
                    code: 'a',
                    expected: 'a',
                  },
                ],
                performance: {
                  history: [],
                  memoryDataSizeComplexityFn: 'O(n)',
                  timeDataSizeComplexityFn: 'O(n)',
                },
                title: 'Calculates the sum',
              },
              modifiers: [],
              parameters: [
                {
                  expression: null,
                  identifier: {
                    kind: 'Identifier',
                    name: 'u2',
                  },
                  isRest: false,
                  kind: 'ParameterBinding',
                  meta: {
                    description: '',
                  },
                  shapeIdentifier: {
                    kind: 'ShapeIdentifier',
                    name: 'User',
                  },
                },
                {
                  expression: null,
                  identifier: {
                    kind: 'Identifier',
                    name: 'u1',
                  },
                  isRest: false,
                  kind: 'ParameterBinding',
                  meta: {
                    description: '',
                  },
                  shapeIdentifier: {
                    kind: 'ShapeIdentifier',
                    name: 'User',
                  },
                },
              ],
              returnType: {
                kind: 'ReturnShape',
                meta: {
                  description: 'Calculates the sum',
                },
                shapeIdentifier: {
                  kind: 'ShapeIdentifier',
                  name: 'Number',
                },
              },
              shapes: [],
            },
          ],
          identifier: {
            kind: 'Identifier',
            name: 'example',
          },
          kind: 'ModuleBinding',
          meta: {
            description: '',
          },
        },
        {
          kind: 'AliasShapeBinding',
          meta: {
            description: '',
          },
          shape: {
            kind: 'UnionShape',
            shapes: [
              {
                kind: 'BuildInShape',
                type: 'String',
                value: 'string',
              },
              {
                kind: 'BuildInShape',
                type: 'Number',
                value: 'number',
              },
            ],
          },
          shapeIdentifier: {
            kind: 'ShapeIdentifier',
            name: 'UserId',
          },
        },
        {
          extends_: [],
          kind: 'InterfaceShapeBinding',
          meta: {
            description: '',
          },
          properties: [
            {
              kind: 'PropertyShape',
              meta: {
                description: '',
              },
              shape: {
                kind: 'BuildInShape',
                type: 'String',
                value: 'string',
              },
              shapeIdentifier: {
                kind: 'ShapeIdentifier',
                name: 'name',
              },
            },
            {
              kind: 'PropertyShape',
              meta: {
                description: '',
              },
              shape: {
                kind: 'BuildInShape',
                type: 'Number',
                value: '25',
              },
              shapeIdentifier: {
                kind: 'ShapeIdentifier',
                name: 'Number',
              },
            },
            {
              kind: 'PropertyShape',
              meta: {
                description: '',
              },
              shape: {
                kind: 'ArrayShape',
                shapes: [
                  {
                    kind: 'BuildInShape',
                    type: 'String',
                    value: 'string',
                  },
                ],
                type: 'Array',
              },
              shapeIdentifier: {
                kind: 'ShapeIdentifier',
                name: 'roles',
              },
            },
          ],
          shapeIdentifier: {
            kind: 'ShapeIdentifier',
            name: 'User',
          },
        },
        {
          expression: {
            kind: 'BuildInExpression',
            type: 'String',
            value: 'hello world',
          },
          identifier: {
            kind: 'Identifier',
            name: 'greeting',
          },
          kind: 'VariableBinding',
          meta: {
            description: '',
          },
          modifiers: ['const'],
          shapeIdentifier: {
            kind: 'ShapeIdentifier',
            name: 'String',
          },
        },
        {
          body: [],
          identifier: {
            kind: 'Identifier',
            name: 'calculateTotal',
          },
          kind: 'FunctionBinding',
          meta: {
            description: 'Calculates the sum',
            examples: [
              {
                code: 'a',
                expected: 'a',
              },
            ],
            performance: {
              history: [],
              memoryDataSizeComplexityFn: 'O(n)',
              timeDataSizeComplexityFn: 'O(n)',
            },
            title: 'Calculates the sum',
          },
          modifiers: [],
          parameters: [
            {
              expression: null,
              identifier: {
                kind: 'Identifier',
                name: 'price',
              },
              isRest: false,
              kind: 'ParameterBinding',
              meta: {
                description: '',
              },
              shapeIdentifier: {
                kind: 'ShapeIdentifier',
                name: 'Number',
              },
            },
            {
              expression: null,
              identifier: {
                kind: 'Identifier',
                name: 'tax',
              },
              isRest: false,
              kind: 'ParameterBinding',
              meta: {
                description: '',
              },
              shapeIdentifier: {
                kind: 'ShapeIdentifier',
                name: 'Number',
              },
            },
          ],
          returnType: {
            kind: 'ReturnShape',
            meta: {
              description: 'Calculates the sum',
            },
            shapeIdentifier: {
              kind: 'ShapeIdentifier',
              name: 'Number',
            },
          },
          shapes: [],
        },
        {
          body: [],
          identifier: {
            kind: 'Identifier',
            name: 'calculateUserAge',
          },
          kind: 'FunctionBinding',
          meta: {
            description: 'Calculates the sum',
            examples: [
              {
                code: 'a',
                expected: 'a',
              },
            ],
            performance: {
              history: [],
              memoryDataSizeComplexityFn: 'O(n)',
              timeDataSizeComplexityFn: 'O(n)',
            },
            title: 'Calculates the sum',
          },
          modifiers: [],
          parameters: [
            {
              expression: null,
              identifier: {
                kind: 'Identifier',
                name: 'u2',
              },
              isRest: false,
              kind: 'ParameterBinding',
              meta: {
                description: '',
              },
              shapeIdentifier: {
                kind: 'ShapeIdentifier',
                name: 'User',
              },
            },
            {
              expression: null,
              identifier: {
                kind: 'Identifier',
                name: 'u1',
              },
              isRest: false,
              kind: 'ParameterBinding',
              meta: {
                description: '',
              },
              shapeIdentifier: {
                kind: 'ShapeIdentifier',
                name: 'User',
              },
            },
          ],
          returnType: {
            kind: 'ReturnShape',
            meta: {
              description: 'Calculates the sum',
            },
            shapeIdentifier: {
              kind: 'ShapeIdentifier',
              name: 'Number',
            },
          },
          shapes: [],
        },
      ],
      dependencies: [
        {
          identifier: {
            kind: 'Identifier',
            name: 'myDependencies',
          },
          kind: 'DependencyBinding',
          path: 'myDependencies',
          version: '1.1.1',
        },
      ],
      identifier: {
        kind: 'Identifier',
        name: 'myPackage',
      },
      kind: 'PackageBinding',
      meta: {
        description: 'myFavoritePackage',
      },
      runtime: {
        identifier: {
          kind: 'Identifier',
          name: 'node',
        },
        kind: 'DependencyBinding',
        path: '',
        version: '1.1.3',
      },
      version: '0.1.1',
    } satisfies abstracts.translators.PackageBinding);
  });
});
