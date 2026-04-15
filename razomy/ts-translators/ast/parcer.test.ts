import {InMemoryFileSystemHost, Project} from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsTranslators from '@razomy/ts-translators';

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
    const modules = tsTranslators.ast.bindings.getPackageDeclaration(project, '', false);

    expect(modules).toEqual({
      "block": {
        "declarations": [
          {
            "block": {
              "declarations": [
                {
                  "kind": "AliasShapeBinding",
                  "meta": {
                    "description": ""
                  },
                  "shape": {
                    "kind": "UnionShape",
                    "shapes": [
                      {
                        "kind": "BuildInShape",
                        "type": "String",
                        "value": "string"
                      },
                      {
                        "kind": "BuildInShape",
                        "type": "Number",
                        "value": "number"
                      }
                    ]
                  },
                  "shapeIdentifier": {
                    "kind": "ShapeIdentifier",
                    "name": "UserId"
                  }
                },
                {
                  "extends_": [],
                  "kind": "InterfaceShapeBinding",
                  "meta": {
                    "description": ""
                  },
                  "properties": [
                    {
                      "kind": "PropertyShape",
                      "meta": {
                        "description": ""
                      },
                      "shape": {
                        "kind": "BuildInShape",
                        "type": "String",
                        "value": "string"
                      },
                      "shapeIdentifier": {
                        "kind": "ShapeIdentifier",
                        "name": "name"
                      }
                    },
                    {
                      "kind": "PropertyShape",
                      "meta": {
                        "description": ""
                      },
                      "shape": {
                        "kind": "BuildInShape",
                        "type": "Number",
                        "value": "25"
                      },
                      "shapeIdentifier": {
                        "kind": "ShapeIdentifier",
                        "name": "Number"
                      }
                    },
                    {
                      "kind": "PropertyShape",
                      "meta": {
                        "description": ""
                      },
                      "shape": {
                        "kind": "ArrayShape",
                        "shapes": [
                          {
                            "kind": "BuildInShape",
                            "type": "String",
                            "value": "string"
                          }
                        ],
                        "type": "Array"
                      },
                      "shapeIdentifier": {
                        "kind": "ShapeIdentifier",
                        "name": "roles"
                      }
                    }
                  ],
                  "shapeIdentifier": {
                    "kind": "ShapeIdentifier",
                    "name": "User"
                  }
                },
                {
                  "expression": {
                    "kind": "BuildInExpression",
                    "type": "String",
                    "value": "hello world"
                  },
                  "identifier": {
                    "kind": "Identifier",
                    "name": "greeting"
                  },
                  "kind": "VariableBinding",
                  "meta": {
                    "description": ""
                  },
                  "modifiers": [
                    "const"
                  ],
                  "shapeIdentifier": {
                    "kind": "ShapeIdentifier",
                    "name": "String"
                  }
                },
                {
                  "block": {
                    "declarations": [
                      {
                        "argument": {
                          "kind": "BinaryExpression",
                          "left": {
                            "identifier": {
                              "kind": "Identifier",
                              "name": "price"
                            },
                            "kind": "ReferenceExpression"
                          },
                          "operator": "+",
                          "right": {
                            "identifier": {
                              "kind": "Identifier",
                              "name": "tax"
                            },
                            "kind": "ReferenceExpression"
                          }
                        },
                        "kind": "ReturnStatement"
                      }
                    ],
                    "kind": "BlockStatement"
                  },
                  "identifier": {
                    "kind": "Identifier",
                    "name": "calculateTotal"
                  },
                  "kind": "FunctionBinding",
                  "meta": {
                    "description": "Calculates the sum",
                    "examples": [
                      {
                        "code": "a",
                        "expected": "a"
                      }
                    ],
                    "performance": {
                      "history": [],
                      "memoryDataSizeComplexityFn": "O(n)",
                      "timeDataSizeComplexityFn": "O(n)"
                    },
                    "title": "Calculates the sum"
                  },
                  "modifiers": [],
                  "parameters": [
                    {
                      "expression": null,
                      "identifier": {
                        "kind": "Identifier",
                        "name": "price"
                      },
                      "kind": "ParameterBinding",
                      "meta": {
                        "description": ""
                      },
                      "modifiers": [],
                      "shapeIdentifier": {
                        "kind": "ShapeIdentifier",
                        "name": "Number"
                      }
                    },
                    {
                      "expression": null,
                      "identifier": {
                        "kind": "Identifier",
                        "name": "tax"
                      },
                      "kind": "ParameterBinding",
                      "meta": {
                        "description": ""
                      },
                      "modifiers": [],
                      "shapeIdentifier": {
                        "kind": "ShapeIdentifier",
                        "name": "Number"
                      }
                    }
                  ],
                  "return_": {
                    "kind": "ReturnShape",
                    "meta": {
                      "description": "Calculates the sum"
                    },
                    "shapeIdentifier": {
                      "kind": "ShapeIdentifier",
                      "name": "Number"
                    }
                  },
                  "shapes": []
                },
                {
                  "block": {
                    "declarations": [
                      {
                        "argument": {
                          "kind": "BinaryExpression",
                          "left": {
                            "kind": "MemberExpression",
                            "object_": {
                              "identifier": {
                                "kind": "Identifier",
                                "name": "u1"
                              },
                              "kind": "ReferenceExpression"
                            },
                            "property": {
                              "kind": "BuildInExpression",
                              "type": "String",
                              "value": "age"
                            }
                          },
                          "operator": "+",
                          "right": {
                            "kind": "MemberExpression",
                            "object_": {
                              "identifier": {
                                "kind": "Identifier",
                                "name": "u2"
                              },
                              "kind": "ReferenceExpression"
                            },
                            "property": {
                              "kind": "BuildInExpression",
                              "type": "String",
                              "value": "age"
                            }
                          }
                        },
                        "kind": "ReturnStatement"
                      }
                    ],
                    "kind": "BlockStatement"
                  },
                  "identifier": {
                    "kind": "Identifier",
                    "name": "calculateUserAge"
                  },
                  "kind": "FunctionBinding",
                  "meta": {
                    "description": "Calculates the sum",
                    "examples": [
                      {
                        "code": "a",
                        "expected": "a"
                      }
                    ],
                    "performance": {
                      "history": [],
                      "memoryDataSizeComplexityFn": "O(n)",
                      "timeDataSizeComplexityFn": "O(n)"
                    },
                    "title": "Calculates the sum"
                  },
                  "modifiers": [],
                  "parameters": [
                    {
                      "expression": null,
                      "identifier": {
                        "kind": "Identifier",
                        "name": "u2"
                      },
                      "kind": "ParameterBinding",
                      "meta": {
                        "description": ""
                      },
                      "modifiers": [],
                      "shapeIdentifier": {
                        "kind": "ShapeIdentifier",
                        "name": "User"
                      }
                    },
                    {
                      "expression": null,
                      "identifier": {
                        "kind": "Identifier",
                        "name": "u1"
                      },
                      "kind": "ParameterBinding",
                      "meta": {
                        "description": ""
                      },
                      "modifiers": [],
                      "shapeIdentifier": {
                        "kind": "ShapeIdentifier",
                        "name": "User"
                      }
                    }
                  ],
                  "return_": {
                    "kind": "ReturnShape",
                    "meta": {
                      "description": "Calculates the sum"
                    },
                    "shapeIdentifier": {
                      "kind": "ShapeIdentifier",
                      "name": "Number"
                    }
                  },
                  "shapes": []
                },
                {
                  "block": {
                    "declarations": [
                      {
                        "expression": {
                          "kind": "MemberExpression",
                          "object_": {
                            "identifier": {
                              "kind": "Identifier",
                              "name": "items"
                            },
                            "kind": "ReferenceExpression"
                          },
                          "property": {
                            "kind": "BuildInExpression",
                            "type": "Number",
                            "value": 0
                          }
                        },
                        "identifier": {
                          "kind": "Identifier",
                          "name": "firstItem"
                        },
                        "kind": "VariableBinding",
                        "meta": {
                          "description": ""
                        },
                        "modifiers": [],
                        "shapeIdentifier": null
                      },
                      {
                        "argument": {
                          "identifier": {
                            "kind": "Identifier",
                            "name": "firstItem"
                          },
                          "kind": "ReferenceExpression"
                        },
                        "kind": "ReturnStatement"
                      }
                    ],
                    "kind": "BlockStatement"
                  },
                  "identifier": {
                    "kind": "Identifier",
                    "name": "processItems"
                  },
                  "kind": "FunctionBinding",
                  "meta": {
                    "description": "Tests type parameters (generics) and basic variable statements",
                    "examples": [
                      {
                        "code": "a",
                        "expected": "a"
                      }
                    ],
                    "performance": {
                      "history": [],
                      "memoryDataSizeComplexityFn": "O(n)",
                      "timeDataSizeComplexityFn": "O(n)"
                    },
                    "title": "Generic function to process items"
                  },
                  "modifiers": [],
                  "parameters": [
                    {
                      "expression": null,
                      "identifier": {
                        "kind": "Identifier",
                        "name": "items"
                      },
                      "kind": "ParameterBinding",
                      "meta": {
                        "description": ""
                      },
                      "modifiers": [],
                      "shapeIdentifier": {
                        "kind": "ShapeIdentifier",
                        "name": "T[]"
                      }
                    },
                    {
                      "expression": null,
                      "identifier": {
                        "kind": "Identifier",
                        "name": "key"
                      },
                      "kind": "ParameterBinding",
                      "meta": {
                        "description": ""
                      },
                      "modifiers": [],
                      "shapeIdentifier": {
                        "kind": "ShapeIdentifier",
                        "name": "K"
                      }
                    }
                  ],
                  "return_": {
                    "kind": "ReturnShape",
                    "meta": {
                      "description": "Calculates the sum"
                    },
                    "shapeIdentifier": {
                      "kind": "ShapeIdentifier",
                      "name": "T"
                    }
                  },
                  "shapes": [
                    {
                      "kind": "AliasShapeBinding",
                      "meta": {
                        "description": ""
                      },
                      "shape": {
                        "kind": "BuildInShape",
                        "type": "Any",
                        "value": null
                      },
                      "shapeIdentifier": {
                        "kind": "ShapeIdentifier",
                        "name": "T"
                      }
                    },
                    {
                      "kind": "AliasShapeBinding",
                      "meta": {
                        "description": ""
                      },
                      "shape": {
                        "kind": "BuildInShape",
                        "type": "String",
                        "value": "string"
                      },
                      "shapeIdentifier": {
                        "kind": "ShapeIdentifier",
                        "name": "K"
                      }
                    }
                  ]
                },
                {
                  "block": {
                    "declarations": [
                      {
                        "branches": [
                          {
                            "block": {
                              "declarations": [
                                {
                                  "argument": {
                                    "arguments_": [
                                      {
                                        "kind": "BuildInExpression",
                                        "type": "String",
                                        "value": "Age cannot be negative"
                                      }
                                    ],
                                    "identifier": {
                                      "kind": "Identifier",
                                      "name": "Error"
                                    },
                                    "kind": "CallExpression"
                                  },
                                  "kind": "ThrowStatement"
                                }
                              ],
                              "kind": "BlockStatement"
                            },
                            "kind": "BranchFlowStatement",
                            "pattern": {
                              "kind": "BinaryExpression",
                              "left": {
                                "identifier": {
                                  "kind": "Identifier",
                                  "name": "age"
                                },
                                "kind": "ReferenceExpression"
                              },
                              "operator": "<",
                              "right": {
                                "kind": "BuildInExpression",
                                "type": "Number",
                                "value": 0
                              }
                            },
                            "type": "if"
                          },
                          {
                            "block": {
                              "declarations": [
                                {
                                  "branches": [
                                    {
                                      "block": {
                                        "declarations": [
                                          {
                                            "expression": {
                                              "kind": "BuildInExpression",
                                              "type": "String",
                                              "value": "minor"
                                            },
                                            "identifier": {
                                              "kind": "Identifier",
                                              "name": "status"
                                            },
                                            "kind": "VariableBinding",
                                            "meta": {
                                              "description": ""
                                            },
                                            "modifiers": [],
                                            "shapeIdentifier": null
                                          },
                                          {
                                            "argument": {
                                              "identifier": {
                                                "kind": "Identifier",
                                                "name": "status"
                                              },
                                              "kind": "ReferenceExpression"
                                            },
                                            "kind": "ReturnStatement"
                                          }
                                        ],
                                        "kind": "BlockStatement"
                                      },
                                      "kind": "BranchFlowStatement",
                                      "pattern": {
                                        "kind": "BinaryExpression",
                                        "left": {
                                          "identifier": {
                                            "kind": "Identifier",
                                            "name": "age"
                                          },
                                          "kind": "ReferenceExpression"
                                        },
                                        "operator": "<",
                                        "right": {
                                          "kind": "BuildInExpression",
                                          "type": "Number",
                                          "value": 18
                                        }
                                      },
                                      "type": "if"
                                    },
                                    {
                                      "block": {
                                        "declarations": [
                                          {
                                            "expression": {
                                              "kind": "BuildInExpression",
                                              "type": "String",
                                              "value": "adult"
                                            },
                                            "identifier": {
                                              "kind": "Identifier",
                                              "name": "status"
                                            },
                                            "kind": "VariableBinding",
                                            "meta": {
                                              "description": ""
                                            },
                                            "modifiers": [],
                                            "shapeIdentifier": null
                                          },
                                          {
                                            "argument": {
                                              "identifier": {
                                                "kind": "Identifier",
                                                "name": "status"
                                              },
                                              "kind": "ReferenceExpression"
                                            },
                                            "kind": "ReturnStatement"
                                          }
                                        ],
                                        "kind": "BlockStatement"
                                      },
                                      "kind": "BranchFlowStatement",
                                      "pattern": null,
                                      "type": "if"
                                    }
                                  ],
                                  "kind": "ConditionalFlowStatement",
                                  "target": null
                                }
                              ],
                              "kind": "BlockStatement"
                            },
                            "kind": "BranchFlowStatement",
                            "pattern": null,
                            "type": "if"
                          }
                        ],
                        "kind": "ConditionalFlowStatement",
                        "target": null
                      }
                    ],
                    "kind": "BlockStatement"
                  },
                  "identifier": {
                    "kind": "Identifier",
                    "name": "validateAge"
                  },
                  "kind": "FunctionBinding",
                  "meta": {
                    "description": "Tests if/else branches and throw statements",
                    "examples": [
                      {
                        "code": "a",
                        "expected": "a"
                      }
                    ],
                    "performance": {
                      "history": [],
                      "memoryDataSizeComplexityFn": "O(n)",
                      "timeDataSizeComplexityFn": "O(n)"
                    },
                    "title": "Validates age with branching"
                  },
                  "modifiers": [],
                  "parameters": [
                    {
                      "expression": null,
                      "identifier": {
                        "kind": "Identifier",
                        "name": "age"
                      },
                      "kind": "ParameterBinding",
                      "meta": {
                        "description": ""
                      },
                      "modifiers": [],
                      "shapeIdentifier": {
                        "kind": "ShapeIdentifier",
                        "name": "Number"
                      }
                    }
                  ],
                  "return_": {
                    "kind": "ReturnShape",
                    "meta": {
                      "description": "Calculates the sum"
                    },
                    "shapeIdentifier": {
                      "kind": "ShapeIdentifier",
                      "name": "String"
                    }
                  },
                  "shapes": []
                },
                {
                  "block": {
                    "declarations": [
                      {
                        "expression": {
                          "identifier": {
                            "kind": "Identifier",
                            "name": "max"
                          },
                          "kind": "ReferenceExpression"
                        },
                        "identifier": {
                          "kind": "Identifier",
                          "name": "limit"
                        },
                        "kind": "VariableBinding",
                        "meta": {
                          "description": ""
                        },
                        "modifiers": [],
                        "shapeIdentifier": null
                      },
                      {
                        "block": {
                          "declarations": [
                            {
                              "branches": [
                                {
                                  "block": {
                                    "declarations": [
                                      {
                                        "kind": "GoStatement",
                                        "labelIdentifier": {
                                          "kind": "Identifier",
                                          "name": ""
                                        },
                                        "type": "continue"
                                      }
                                    ],
                                    "kind": "BlockStatement"
                                  },
                                  "kind": "BranchFlowStatement",
                                  "pattern": {
                                    "kind": "BinaryExpression",
                                    "left": {
                                      "kind": "BinaryExpression",
                                      "left": {
                                        "identifier": {
                                          "kind": "Identifier",
                                          "name": "i"
                                        },
                                        "kind": "ReferenceExpression"
                                      },
                                      "operator": "%",
                                      "right": {
                                        "kind": "BuildInExpression",
                                        "type": "Number",
                                        "value": 2
                                      }
                                    },
                                    "operator": "!==",
                                    "right": {
                                      "kind": "BuildInExpression",
                                      "type": "Number",
                                      "value": 0
                                    }
                                  },
                                  "type": "if"
                                }
                              ],
                              "kind": "ConditionalFlowStatement",
                              "target": null
                            },
                            {
                              "branches": [
                                {
                                  "block": {
                                    "declarations": [
                                      {
                                        "kind": "GoStatement",
                                        "labelIdentifier": {
                                          "kind": "Identifier",
                                          "name": ""
                                        },
                                        "type": "break"
                                      }
                                    ],
                                    "kind": "BlockStatement"
                                  },
                                  "kind": "BranchFlowStatement",
                                  "pattern": {
                                    "kind": "BinaryExpression",
                                    "left": {
                                      "identifier": {
                                        "kind": "Identifier",
                                        "name": "i"
                                      },
                                      "kind": "ReferenceExpression"
                                    },
                                    "operator": ">",
                                    "right": {
                                      "kind": "BuildInExpression",
                                      "type": "Number",
                                      "value": 100
                                    }
                                  },
                                  "type": "if"
                                }
                              ],
                              "kind": "ConditionalFlowStatement",
                              "target": null
                            },
                            {
                              "expression": {
                                "identifier": {
                                  "kind": "Identifier",
                                  "name": "i"
                                },
                                "kind": "ReferenceExpression"
                              },
                              "identifier": {
                                "kind": "Identifier",
                                "name": "evenNum"
                              },
                              "kind": "VariableBinding",
                              "meta": {
                                "description": ""
                              },
                              "modifiers": [],
                              "shapeIdentifier": null
                            }
                          ],
                          "kind": "BlockStatement"
                        },
                        "condition": {
                          "kind": "BinaryExpression",
                          "left": {
                            "identifier": {
                              "kind": "Identifier",
                              "name": "i"
                            },
                            "kind": "ReferenceExpression"
                          },
                          "operator": "<",
                          "right": {
                            "identifier": {
                              "kind": "Identifier",
                              "name": "limit"
                            },
                            "kind": "ReferenceExpression"
                          }
                        },
                        "init": null,
                        "kind": "LoopFlowStatement",
                        "type": "while_do",
                        "update": {
                          "expression": {
                            "identifier": {
                              "kind": "Identifier",
                              "name": "i"
                            },
                            "kind": "ReferenceExpression"
                          },
                          "isPrefix": false,
                          "kind": "UnaryExpression",
                          "operator": "++"
                        }
                      },
                      {
                        "expression": {
                          "kind": "BuildInExpression",
                          "type": "Number",
                          "value": 0
                        },
                        "identifier": {
                          "kind": "Identifier",
                          "name": "count"
                        },
                        "kind": "VariableBinding",
                        "meta": {
                          "description": ""
                        },
                        "modifiers": [],
                        "shapeIdentifier": null
                      },
                      {
                        "block": {
                          "declarations": [
                            {
                              "expression": {
                                "identifier": {
                                  "kind": "Identifier",
                                  "name": "count"
                                },
                                "kind": "ReferenceExpression"
                              },
                              "identifier": {
                                "kind": "Identifier",
                                "name": "x"
                              },
                              "kind": "VariableBinding",
                              "meta": {
                                "description": ""
                              },
                              "modifiers": [],
                              "shapeIdentifier": null
                            }
                          ],
                          "kind": "BlockStatement"
                        },
                        "condition": {
                          "kind": "BinaryExpression",
                          "left": {
                            "identifier": {
                              "kind": "Identifier",
                              "name": "count"
                            },
                            "kind": "ReferenceExpression"
                          },
                          "operator": "<",
                          "right": {
                            "kind": "BuildInExpression",
                            "type": "Number",
                            "value": 5
                          }
                        },
                        "init": null,
                        "kind": "LoopFlowStatement",
                        "type": "while_do",
                        "update": null
                      },
                      {
                        "block": {
                          "declarations": [
                            {
                              "expression": {
                                "identifier": {
                                  "kind": "Identifier",
                                  "name": "count"
                                },
                                "kind": "ReferenceExpression"
                              },
                              "identifier": {
                                "kind": "Identifier",
                                "name": "y"
                              },
                              "kind": "VariableBinding",
                              "meta": {
                                "description": ""
                              },
                              "modifiers": [],
                              "shapeIdentifier": null
                            }
                          ],
                          "kind": "BlockStatement"
                        },
                        "condition": {
                          "kind": "BinaryExpression",
                          "left": {
                            "identifier": {
                              "kind": "Identifier",
                              "name": "count"
                            },
                            "kind": "ReferenceExpression"
                          },
                          "operator": "<",
                          "right": {
                            "kind": "BuildInExpression",
                            "type": "Number",
                            "value": 5
                          }
                        },
                        "init": null,
                        "kind": "LoopFlowStatement",
                        "type": "do_while",
                        "update": null
                      }
                    ],
                    "kind": "BlockStatement"
                  },
                  "identifier": {
                    "kind": "Identifier",
                    "name": "findEvenNumbers"
                  },
                  "kind": "FunctionBinding",
                  "meta": {
                    "description": "Tests for/while loops, break, continue, and nested blocks",
                    "examples": [
                      {
                        "code": "a",
                        "expected": "a"
                      }
                    ],
                    "performance": {
                      "history": [],
                      "memoryDataSizeComplexityFn": "O(n)",
                      "timeDataSizeComplexityFn": "O(n)"
                    },
                    "title": "Finds even numbers using loops"
                  },
                  "modifiers": [],
                  "parameters": [
                    {
                      "expression": null,
                      "identifier": {
                        "kind": "Identifier",
                        "name": "max"
                      },
                      "kind": "ParameterBinding",
                      "meta": {
                        "description": ""
                      },
                      "modifiers": [],
                      "shapeIdentifier": {
                        "kind": "ShapeIdentifier",
                        "name": "Number"
                      }
                    }
                  ],
                  "return_": {
                    "kind": "ReturnShape",
                    "meta": {
                      "description": "Calculates the sum"
                    },
                    "shapeIdentifier": {
                      "kind": "ShapeIdentifier",
                      "name": "void"
                    }
                  },
                  "shapes": []
                }
              ],
              "kind": "BlockStatement"
            },
            "identifier": {
              "kind": "Identifier",
              "name": "example"
            },
            "kind": "ModuleBinding",
            "meta": {
              "description": ""
            }
          },
          {
            "kind": "AliasShapeBinding",
            "meta": {
              "description": ""
            },
            "shape": {
              "kind": "UnionShape",
              "shapes": [
                {
                  "kind": "BuildInShape",
                  "type": "String",
                  "value": "string"
                },
                {
                  "kind": "BuildInShape",
                  "type": "Number",
                  "value": "number"
                }
              ]
            },
            "shapeIdentifier": {
              "kind": "ShapeIdentifier",
              "name": "UserId"
            }
          },
          {
            "extends_": [],
            "kind": "InterfaceShapeBinding",
            "meta": {
              "description": ""
            },
            "properties": [
              {
                "kind": "PropertyShape",
                "meta": {
                  "description": ""
                },
                "shape": {
                  "kind": "BuildInShape",
                  "type": "String",
                  "value": "string"
                },
                "shapeIdentifier": {
                  "kind": "ShapeIdentifier",
                  "name": "name"
                }
              },
              {
                "kind": "PropertyShape",
                "meta": {
                  "description": ""
                },
                "shape": {
                  "kind": "BuildInShape",
                  "type": "Number",
                  "value": "25"
                },
                "shapeIdentifier": {
                  "kind": "ShapeIdentifier",
                  "name": "Number"
                }
              },
              {
                "kind": "PropertyShape",
                "meta": {
                  "description": ""
                },
                "shape": {
                  "kind": "ArrayShape",
                  "shapes": [
                    {
                      "kind": "BuildInShape",
                      "type": "String",
                      "value": "string"
                    }
                  ],
                  "type": "Array"
                },
                "shapeIdentifier": {
                  "kind": "ShapeIdentifier",
                  "name": "roles"
                }
              }
            ],
            "shapeIdentifier": {
              "kind": "ShapeIdentifier",
              "name": "User"
            }
          },
          {
            "expression": {
              "kind": "BuildInExpression",
              "type": "String",
              "value": "hello world"
            },
            "identifier": {
              "kind": "Identifier",
              "name": "greeting"
            },
            "kind": "VariableBinding",
            "meta": {
              "description": ""
            },
            "modifiers": [
              "const"
            ],
            "shapeIdentifier": {
              "kind": "ShapeIdentifier",
              "name": "String"
            }
          },
          {
            "block": {
              "declarations": [
                {
                  "argument": {
                    "kind": "BinaryExpression",
                    "left": {
                      "identifier": {
                        "kind": "Identifier",
                        "name": "price"
                      },
                      "kind": "ReferenceExpression"
                    },
                    "operator": "+",
                    "right": {
                      "identifier": {
                        "kind": "Identifier",
                        "name": "tax"
                      },
                      "kind": "ReferenceExpression"
                    }
                  },
                  "kind": "ReturnStatement"
                }
              ],
              "kind": "BlockStatement"
            },
            "identifier": {
              "kind": "Identifier",
              "name": "calculateTotal"
            },
            "kind": "FunctionBinding",
            "meta": {
              "description": "Calculates the sum",
              "examples": [
                {
                  "code": "a",
                  "expected": "a"
                }
              ],
              "performance": {
                "history": [],
                "memoryDataSizeComplexityFn": "O(n)",
                "timeDataSizeComplexityFn": "O(n)"
              },
              "title": "Calculates the sum"
            },
            "modifiers": [],
            "parameters": [
              {
                "expression": null,
                "identifier": {
                  "kind": "Identifier",
                  "name": "price"
                },
                "kind": "ParameterBinding",
                "meta": {
                  "description": ""
                },
                "modifiers": [],
                "shapeIdentifier": {
                  "kind": "ShapeIdentifier",
                  "name": "Number"
                }
              },
              {
                "expression": null,
                "identifier": {
                  "kind": "Identifier",
                  "name": "tax"
                },
                "kind": "ParameterBinding",
                "meta": {
                  "description": ""
                },
                "modifiers": [],
                "shapeIdentifier": {
                  "kind": "ShapeIdentifier",
                  "name": "Number"
                }
              }
            ],
            "return_": {
              "kind": "ReturnShape",
              "meta": {
                "description": "Calculates the sum"
              },
              "shapeIdentifier": {
                "kind": "ShapeIdentifier",
                "name": "Number"
              }
            },
            "shapes": []
          },
          {
            "block": {
              "declarations": [
                {
                  "argument": {
                    "kind": "BinaryExpression",
                    "left": {
                      "kind": "MemberExpression",
                      "object_": {
                        "identifier": {
                          "kind": "Identifier",
                          "name": "u1"
                        },
                        "kind": "ReferenceExpression"
                      },
                      "property": {
                        "kind": "BuildInExpression",
                        "type": "String",
                        "value": "age"
                      }
                    },
                    "operator": "+",
                    "right": {
                      "kind": "MemberExpression",
                      "object_": {
                        "identifier": {
                          "kind": "Identifier",
                          "name": "u2"
                        },
                        "kind": "ReferenceExpression"
                      },
                      "property": {
                        "kind": "BuildInExpression",
                        "type": "String",
                        "value": "age"
                      }
                    }
                  },
                  "kind": "ReturnStatement"
                }
              ],
              "kind": "BlockStatement"
            },
            "identifier": {
              "kind": "Identifier",
              "name": "calculateUserAge"
            },
            "kind": "FunctionBinding",
            "meta": {
              "description": "Calculates the sum",
              "examples": [
                {
                  "code": "a",
                  "expected": "a"
                }
              ],
              "performance": {
                "history": [],
                "memoryDataSizeComplexityFn": "O(n)",
                "timeDataSizeComplexityFn": "O(n)"
              },
              "title": "Calculates the sum"
            },
            "modifiers": [],
            "parameters": [
              {
                "expression": null,
                "identifier": {
                  "kind": "Identifier",
                  "name": "u2"
                },
                "kind": "ParameterBinding",
                "meta": {
                  "description": ""
                },
                "modifiers": [],
                "shapeIdentifier": {
                  "kind": "ShapeIdentifier",
                  "name": "User"
                }
              },
              {
                "expression": null,
                "identifier": {
                  "kind": "Identifier",
                  "name": "u1"
                },
                "kind": "ParameterBinding",
                "meta": {
                  "description": ""
                },
                "modifiers": [],
                "shapeIdentifier": {
                  "kind": "ShapeIdentifier",
                  "name": "User"
                }
              }
            ],
            "return_": {
              "kind": "ReturnShape",
              "meta": {
                "description": "Calculates the sum"
              },
              "shapeIdentifier": {
                "kind": "ShapeIdentifier",
                "name": "Number"
              }
            },
            "shapes": []
          },
          {
            "block": {
              "declarations": [
                {
                  "expression": {
                    "kind": "MemberExpression",
                    "object_": {
                      "identifier": {
                        "kind": "Identifier",
                        "name": "items"
                      },
                      "kind": "ReferenceExpression"
                    },
                    "property": {
                      "kind": "BuildInExpression",
                      "type": "Number",
                      "value": 0
                    }
                  },
                  "identifier": {
                    "kind": "Identifier",
                    "name": "firstItem"
                  },
                  "kind": "VariableBinding",
                  "meta": {
                    "description": ""
                  },
                  "modifiers": [],
                  "shapeIdentifier": null
                },
                {
                  "argument": {
                    "identifier": {
                      "kind": "Identifier",
                      "name": "firstItem"
                    },
                    "kind": "ReferenceExpression"
                  },
                  "kind": "ReturnStatement"
                }
              ],
              "kind": "BlockStatement"
            },
            "identifier": {
              "kind": "Identifier",
              "name": "processItems"
            },
            "kind": "FunctionBinding",
            "meta": {
              "description": "Tests type parameters (generics) and basic variable statements",
              "examples": [
                {
                  "code": "a",
                  "expected": "a"
                }
              ],
              "performance": {
                "history": [],
                "memoryDataSizeComplexityFn": "O(n)",
                "timeDataSizeComplexityFn": "O(n)"
              },
              "title": "Generic function to process items"
            },
            "modifiers": [],
            "parameters": [
              {
                "expression": null,
                "identifier": {
                  "kind": "Identifier",
                  "name": "items"
                },
                "kind": "ParameterBinding",
                "meta": {
                  "description": ""
                },
                "modifiers": [],
                "shapeIdentifier": {
                  "kind": "ShapeIdentifier",
                  "name": "T[]"
                }
              },
              {
                "expression": null,
                "identifier": {
                  "kind": "Identifier",
                  "name": "key"
                },
                "kind": "ParameterBinding",
                "meta": {
                  "description": ""
                },
                "modifiers": [],
                "shapeIdentifier": {
                  "kind": "ShapeIdentifier",
                  "name": "K"
                }
              }
            ],
            "return_": {
              "kind": "ReturnShape",
              "meta": {
                "description": "Calculates the sum"
              },
              "shapeIdentifier": {
                "kind": "ShapeIdentifier",
                "name": "T"
              }
            },
            "shapes": [
              {
                "kind": "AliasShapeBinding",
                "meta": {
                  "description": ""
                },
                "shape": {
                  "kind": "BuildInShape",
                  "type": "Any",
                  "value": null
                },
                "shapeIdentifier": {
                  "kind": "ShapeIdentifier",
                  "name": "T"
                }
              },
              {
                "kind": "AliasShapeBinding",
                "meta": {
                  "description": ""
                },
                "shape": {
                  "kind": "BuildInShape",
                  "type": "String",
                  "value": "string"
                },
                "shapeIdentifier": {
                  "kind": "ShapeIdentifier",
                  "name": "K"
                }
              }
            ]
          },
          {
            "block": {
              "declarations": [
                {
                  "branches": [
                    {
                      "block": {
                        "declarations": [
                          {
                            "argument": {
                              "arguments_": [
                                {
                                  "kind": "BuildInExpression",
                                  "type": "String",
                                  "value": "Age cannot be negative"
                                }
                              ],
                              "identifier": {
                                "kind": "Identifier",
                                "name": "Error"
                              },
                              "kind": "CallExpression"
                            },
                            "kind": "ThrowStatement"
                          }
                        ],
                        "kind": "BlockStatement"
                      },
                      "kind": "BranchFlowStatement",
                      "pattern": {
                        "kind": "BinaryExpression",
                        "left": {
                          "identifier": {
                            "kind": "Identifier",
                            "name": "age"
                          },
                          "kind": "ReferenceExpression"
                        },
                        "operator": "<",
                        "right": {
                          "kind": "BuildInExpression",
                          "type": "Number",
                          "value": 0
                        }
                      },
                      "type": "if"
                    },
                    {
                      "block": {
                        "declarations": [
                          {
                            "branches": [
                              {
                                "block": {
                                  "declarations": [
                                    {
                                      "expression": {
                                        "kind": "BuildInExpression",
                                        "type": "String",
                                        "value": "minor"
                                      },
                                      "identifier": {
                                        "kind": "Identifier",
                                        "name": "status"
                                      },
                                      "kind": "VariableBinding",
                                      "meta": {
                                        "description": ""
                                      },
                                      "modifiers": [],
                                      "shapeIdentifier": null
                                    },
                                    {
                                      "argument": {
                                        "identifier": {
                                          "kind": "Identifier",
                                          "name": "status"
                                        },
                                        "kind": "ReferenceExpression"
                                      },
                                      "kind": "ReturnStatement"
                                    }
                                  ],
                                  "kind": "BlockStatement"
                                },
                                "kind": "BranchFlowStatement",
                                "pattern": {
                                  "kind": "BinaryExpression",
                                  "left": {
                                    "identifier": {
                                      "kind": "Identifier",
                                      "name": "age"
                                    },
                                    "kind": "ReferenceExpression"
                                  },
                                  "operator": "<",
                                  "right": {
                                    "kind": "BuildInExpression",
                                    "type": "Number",
                                    "value": 18
                                  }
                                },
                                "type": "if"
                              },
                              {
                                "block": {
                                  "declarations": [
                                    {
                                      "expression": {
                                        "kind": "BuildInExpression",
                                        "type": "String",
                                        "value": "adult"
                                      },
                                      "identifier": {
                                        "kind": "Identifier",
                                        "name": "status"
                                      },
                                      "kind": "VariableBinding",
                                      "meta": {
                                        "description": ""
                                      },
                                      "modifiers": [],
                                      "shapeIdentifier": null
                                    },
                                    {
                                      "argument": {
                                        "identifier": {
                                          "kind": "Identifier",
                                          "name": "status"
                                        },
                                        "kind": "ReferenceExpression"
                                      },
                                      "kind": "ReturnStatement"
                                    }
                                  ],
                                  "kind": "BlockStatement"
                                },
                                "kind": "BranchFlowStatement",
                                "pattern": null,
                                "type": "if"
                              }
                            ],
                            "kind": "ConditionalFlowStatement",
                            "target": null
                          }
                        ],
                        "kind": "BlockStatement"
                      },
                      "kind": "BranchFlowStatement",
                      "pattern": null,
                      "type": "if"
                    }
                  ],
                  "kind": "ConditionalFlowStatement",
                  "target": null
                }
              ],
              "kind": "BlockStatement"
            },
            "identifier": {
              "kind": "Identifier",
              "name": "validateAge"
            },
            "kind": "FunctionBinding",
            "meta": {
              "description": "Tests if/else branches and throw statements",
              "examples": [
                {
                  "code": "a",
                  "expected": "a"
                }
              ],
              "performance": {
                "history": [],
                "memoryDataSizeComplexityFn": "O(n)",
                "timeDataSizeComplexityFn": "O(n)"
              },
              "title": "Validates age with branching"
            },
            "modifiers": [],
            "parameters": [
              {
                "expression": null,
                "identifier": {
                  "kind": "Identifier",
                  "name": "age"
                },
                "kind": "ParameterBinding",
                "meta": {
                  "description": ""
                },
                "modifiers": [],
                "shapeIdentifier": {
                  "kind": "ShapeIdentifier",
                  "name": "Number"
                }
              }
            ],
            "return_": {
              "kind": "ReturnShape",
              "meta": {
                "description": "Calculates the sum"
              },
              "shapeIdentifier": {
                "kind": "ShapeIdentifier",
                "name": "String"
              }
            },
            "shapes": []
          },
          {
            "block": {
              "declarations": [
                {
                  "expression": {
                    "identifier": {
                      "kind": "Identifier",
                      "name": "max"
                    },
                    "kind": "ReferenceExpression"
                  },
                  "identifier": {
                    "kind": "Identifier",
                    "name": "limit"
                  },
                  "kind": "VariableBinding",
                  "meta": {
                    "description": ""
                  },
                  "modifiers": [],
                  "shapeIdentifier": null
                },
                {
                  "block": {
                    "declarations": [
                      {
                        "branches": [
                          {
                            "block": {
                              "declarations": [
                                {
                                  "kind": "GoStatement",
                                  "labelIdentifier": {
                                    "kind": "Identifier",
                                    "name": ""
                                  },
                                  "type": "continue"
                                }
                              ],
                              "kind": "BlockStatement"
                            },
                            "kind": "BranchFlowStatement",
                            "pattern": {
                              "kind": "BinaryExpression",
                              "left": {
                                "kind": "BinaryExpression",
                                "left": {
                                  "identifier": {
                                    "kind": "Identifier",
                                    "name": "i"
                                  },
                                  "kind": "ReferenceExpression"
                                },
                                "operator": "%",
                                "right": {
                                  "kind": "BuildInExpression",
                                  "type": "Number",
                                  "value": 2
                                }
                              },
                              "operator": "!==",
                              "right": {
                                "kind": "BuildInExpression",
                                "type": "Number",
                                "value": 0
                              }
                            },
                            "type": "if"
                          }
                        ],
                        "kind": "ConditionalFlowStatement",
                        "target": null
                      },
                      {
                        "branches": [
                          {
                            "block": {
                              "declarations": [
                                {
                                  "kind": "GoStatement",
                                  "labelIdentifier": {
                                    "kind": "Identifier",
                                    "name": ""
                                  },
                                  "type": "break"
                                }
                              ],
                              "kind": "BlockStatement"
                            },
                            "kind": "BranchFlowStatement",
                            "pattern": {
                              "kind": "BinaryExpression",
                              "left": {
                                "identifier": {
                                  "kind": "Identifier",
                                  "name": "i"
                                },
                                "kind": "ReferenceExpression"
                              },
                              "operator": ">",
                              "right": {
                                "kind": "BuildInExpression",
                                "type": "Number",
                                "value": 100
                              }
                            },
                            "type": "if"
                          }
                        ],
                        "kind": "ConditionalFlowStatement",
                        "target": null
                      },
                      {
                        "expression": {
                          "identifier": {
                            "kind": "Identifier",
                            "name": "i"
                          },
                          "kind": "ReferenceExpression"
                        },
                        "identifier": {
                          "kind": "Identifier",
                          "name": "evenNum"
                        },
                        "kind": "VariableBinding",
                        "meta": {
                          "description": ""
                        },
                        "modifiers": [],
                        "shapeIdentifier": null
                      }
                    ],
                    "kind": "BlockStatement"
                  },
                  "condition": {
                    "kind": "BinaryExpression",
                    "left": {
                      "identifier": {
                        "kind": "Identifier",
                        "name": "i"
                      },
                      "kind": "ReferenceExpression"
                    },
                    "operator": "<",
                    "right": {
                      "identifier": {
                        "kind": "Identifier",
                        "name": "limit"
                      },
                      "kind": "ReferenceExpression"
                    }
                  },
                  "init": null,
                  "kind": "LoopFlowStatement",
                  "type": "while_do",
                  "update": {
                    "expression": {
                      "identifier": {
                        "kind": "Identifier",
                        "name": "i"
                      },
                      "kind": "ReferenceExpression"
                    },
                    "isPrefix": false,
                    "kind": "UnaryExpression",
                    "operator": "++"
                  }
                },
                {
                  "expression": {
                    "kind": "BuildInExpression",
                    "type": "Number",
                    "value": 0
                  },
                  "identifier": {
                    "kind": "Identifier",
                    "name": "count"
                  },
                  "kind": "VariableBinding",
                  "meta": {
                    "description": ""
                  },
                  "modifiers": [],
                  "shapeIdentifier": null
                },
                {
                  "block": {
                    "declarations": [
                      {
                        "expression": {
                          "identifier": {
                            "kind": "Identifier",
                            "name": "count"
                          },
                          "kind": "ReferenceExpression"
                        },
                        "identifier": {
                          "kind": "Identifier",
                          "name": "x"
                        },
                        "kind": "VariableBinding",
                        "meta": {
                          "description": ""
                        },
                        "modifiers": [],
                        "shapeIdentifier": null
                      }
                    ],
                    "kind": "BlockStatement"
                  },
                  "condition": {
                    "kind": "BinaryExpression",
                    "left": {
                      "identifier": {
                        "kind": "Identifier",
                        "name": "count"
                      },
                      "kind": "ReferenceExpression"
                    },
                    "operator": "<",
                    "right": {
                      "kind": "BuildInExpression",
                      "type": "Number",
                      "value": 5
                    }
                  },
                  "init": null,
                  "kind": "LoopFlowStatement",
                  "type": "while_do",
                  "update": null
                },
                {
                  "block": {
                    "declarations": [
                      {
                        "expression": {
                          "identifier": {
                            "kind": "Identifier",
                            "name": "count"
                          },
                          "kind": "ReferenceExpression"
                        },
                        "identifier": {
                          "kind": "Identifier",
                          "name": "y"
                        },
                        "kind": "VariableBinding",
                        "meta": {
                          "description": ""
                        },
                        "modifiers": [],
                        "shapeIdentifier": null
                      }
                    ],
                    "kind": "BlockStatement"
                  },
                  "condition": {
                    "kind": "BinaryExpression",
                    "left": {
                      "identifier": {
                        "kind": "Identifier",
                        "name": "count"
                      },
                      "kind": "ReferenceExpression"
                    },
                    "operator": "<",
                    "right": {
                      "kind": "BuildInExpression",
                      "type": "Number",
                      "value": 5
                    }
                  },
                  "init": null,
                  "kind": "LoopFlowStatement",
                  "type": "do_while",
                  "update": null
                }
              ],
              "kind": "BlockStatement"
            },
            "identifier": {
              "kind": "Identifier",
              "name": "findEvenNumbers"
            },
            "kind": "FunctionBinding",
            "meta": {
              "description": "Tests for/while loops, break, continue, and nested blocks",
              "examples": [
                {
                  "code": "a",
                  "expected": "a"
                }
              ],
              "performance": {
                "history": [],
                "memoryDataSizeComplexityFn": "O(n)",
                "timeDataSizeComplexityFn": "O(n)"
              },
              "title": "Finds even numbers using loops"
            },
            "modifiers": [],
            "parameters": [
              {
                "expression": null,
                "identifier": {
                  "kind": "Identifier",
                  "name": "max"
                },
                "kind": "ParameterBinding",
                "meta": {
                  "description": ""
                },
                "modifiers": [],
                "shapeIdentifier": {
                  "kind": "ShapeIdentifier",
                  "name": "Number"
                }
              }
            ],
            "return_": {
              "kind": "ReturnShape",
              "meta": {
                "description": "Calculates the sum"
              },
              "shapeIdentifier": {
                "kind": "ShapeIdentifier",
                "name": "void"
              }
            },
            "shapes": []
          }
        ],
        "kind": "BlockStatement"
      },
      "dependencies": [
        {
          "identifier": {
            "kind": "Identifier",
            "name": "myDependencies"
          },
          "kind": "DependencyBinding",
          "path": "myDependencies",
          "version": "1.1.1"
        }
      ],
      "identifier": {
        "kind": "Identifier",
        "name": "myPackage"
      },
      "kind": "PackageBinding",
      "meta": {
        "description": "myFavoritePackage"
      },
      "runtime": {
        "identifier": {
          "kind": "Identifier",
          "name": "node"
        },
        "kind": "DependencyBinding",
        "path": "",
        "version": "1.1.3"
      },
      "version": "0.1.1"
    } satisfies abstracts.translators.PackageBinding);
  });
});
