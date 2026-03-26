import {InMemoryFileSystemHost, Project} from "ts-morph";
import {getPackageDeclaration} from "./get_package_declaration";


describe('parse', () => {
  it('parse', () => {

// 1. Initialize ts-morph project
    const fileSystem = new InMemoryFileSystemHost();
    const project = new Project({fileSystem});
    project.createSourceFile("package.json", `{
    "name":"myPackage", 
    "version":"0.1.1", 
    "description":"myFavoritePackage", 
    "engines": {"node": "1.1.3"}, 
    "dependencies":{
      "myDependencies": "1.1.1"
    }}`);
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
    export function calculateUserAge(u2: User, u1: User): number {
        return u1.age + u2.age;
    }
`);

    project.createSourceFile("index.ts", "export * as example from './example'; export {calculateUserAge} from './example';");

// 3. Run your parser!
    const modules = getPackageDeclaration(project, '');

    expect(modules).toEqual({
      "body": {
        "body": [
          {
            "body": [
              {
                "description": "",
                "identifier": {
                  "kind": "Identifier",
                  "name": "UserId"
                },
                "kind": "TypeAliasDeclaration",
                "type": {
                  "kind": "UnionType",
                  "types": [
                    {
                      "kind": "KeywordType",
                      "name": "string"
                    },
                    {
                      "kind": "KeywordType",
                      "name": "number"
                    }
                  ]
                }
              },
              {
                "description": "",
                "extends_": [],
                "identifier": {
                  "kind": "Identifier",
                  "name": "User"
                },
                "kind": "InterfaceDeclaration",
                "properties": [
                  {
                    "description": "",
                    "expression": null,
                    "identifier": {
                      "kind": "Identifier",
                      "name": "name"
                    },
                    "isOptional": false,
                    "isReadonly": false,
                    "kind": "PropertyDeclaration",
                    "type": {
                      "kind": "KeywordType",
                      "name": "string"
                    }
                  },
                  {
                    "description": "",
                    "expression": null,
                    "identifier": {
                      "kind": "Identifier",
                      "name": "age"
                    },
                    "isOptional": false,
                    "isReadonly": false,
                    "kind": "PropertyDeclaration",
                    "type": {
                      "kind": "NumberType",
                      "value": 25
                    }
                  },
                  {
                    "description": "",
                    "expression": null,
                    "identifier": {
                      "kind": "Identifier",
                      "name": "roles"
                    },
                    "isOptional": false,
                    "isReadonly": false,
                    "kind": "PropertyDeclaration",
                    "type": {
                      "kind": "ArrayType",
                      "type": {
                        "kind": "KeywordType",
                        "name": "string"
                      }
                    }
                  }
                ]
              },
              {
                "description": "",
                "expression": {
                  "kind": "StringExpression",
                  "value": "hello world"
                },
                "identifier": {
                  "kind": "Identifier",
                  "name": "greeting"
                },
                "isConst": true,
                "kind": "VariableDeclaration",
                "type": {
                  "kind": "KeywordType",
                  "name": "string"
                }
              },
              {
                "body": [],
                "description": "Calculates the sum",
                "examples": [],
                "identifier": {
                  "kind": "Identifier",
                  "name": "calculateTotal"
                },
                "isAsync": false,
                "isGenerator": false,
                "kind": "FunctionDeclaration",
                "parameters": [
                  {
                    "description": "",
                    "identifier": {
                      "kind": "Identifier",
                      "name": "price"
                    },
                    "isRest": false,
                    "kind": "ParameterDeclaration",
                    "type": {
                      "kind": "KeywordType",
                      "name": "number"
                    }
                  },
                  {
                    "description": "",
                    "identifier": {
                      "kind": "Identifier",
                      "name": "tax"
                    },
                    "isRest": false,
                    "kind": "ParameterDeclaration",
                    "type": {
                      "kind": "KeywordType",
                      "name": "number"
                    }
                  }
                ],
                "performance": {
                  "history": [],
                  "memoryDataSizeComplexityFn": "",
                  "timeDataSizeComplexityFn": ""
                },
                "return_": {
                  "description": "",
                  "identifier": {
                    "kind": "Identifier",
                    "name": "return"
                  },
                  "kind": "ReturnDeclaration",
                  "type": {
                    "kind": "KeywordType",
                    "name": "number"
                  }
                },
                "title": "Calculates the sum"
              },
              {
                "body": [],
                "description": "Calculates the sum",
                "examples": [],
                "identifier": {
                  "kind": "Identifier",
                  "name": "calculateUserAge"
                },
                "isAsync": false,
                "isGenerator": false,
                "kind": "FunctionDeclaration",
                "parameters": [
                  {
                    "description": "",
                    "identifier": {
                      "kind": "Identifier",
                      "name": "u2"
                    },
                    "isRest": false,
                    "kind": "ParameterDeclaration",
                    "type": {
                      "identifier": {
                        "kind": "TypeIdentifier",
                        "name": "User"
                      },
                      "kind": "ReferenceType"
                    }
                  },
                  {
                    "description": "",
                    "identifier": {
                      "kind": "Identifier",
                      "name": "u1"
                    },
                    "isRest": false,
                    "kind": "ParameterDeclaration",
                    "type": {
                      "identifier": {
                        "kind": "TypeIdentifier",
                        "name": "User"
                      },
                      "kind": "ReferenceType"
                    }
                  }
                ],
                "performance": {
                  "history": [],
                  "memoryDataSizeComplexityFn": "",
                  "timeDataSizeComplexityFn": ""
                },
                "return_": {
                  "description": "",
                  "identifier": {
                    "kind": "Identifier",
                    "name": "return"
                  },
                  "kind": "ReturnDeclaration",
                  "type": {
                    "kind": "KeywordType",
                    "name": "number"
                  }
                },
                "title": "Calculates the sum"
              }
            ],
            "description": "",
            "identifier": {
              "kind": "Identifier",
              "name": "example"
            },
            "kind": "ModuleDeclaration"
          },
          {
            "description": "",
            "identifier": {
              "kind": "Identifier",
              "name": "UserId"
            },
            "kind": "TypeAliasDeclaration",
            "type": {
              "kind": "UnionType",
              "types": [
                {
                  "kind": "KeywordType",
                  "name": "string"
                },
                {
                  "kind": "KeywordType",
                  "name": "number"
                }
              ]
            }
          },
          {
            "description": "",
            "extends_": [],
            "identifier": {
              "kind": "Identifier",
              "name": "User"
            },
            "kind": "InterfaceDeclaration",
            "properties": [
              {
                "description": "",
                "expression": null,
                "identifier": {
                  "kind": "Identifier",
                  "name": "name"
                },
                "isOptional": false,
                "isReadonly": false,
                "kind": "PropertyDeclaration",
                "type": {
                  "kind": "KeywordType",
                  "name": "string"
                }
              },
              {
                "description": "",
                "expression": null,
                "identifier": {
                  "kind": "Identifier",
                  "name": "age"
                },
                "isOptional": false,
                "isReadonly": false,
                "kind": "PropertyDeclaration",
                "type": {
                  "kind": "NumberType",
                  "value": 25
                }
              },
              {
                "description": "",
                "expression": null,
                "identifier": {
                  "kind": "Identifier",
                  "name": "roles"
                },
                "isOptional": false,
                "isReadonly": false,
                "kind": "PropertyDeclaration",
                "type": {
                  "kind": "ArrayType",
                  "type": {
                    "kind": "KeywordType",
                    "name": "string"
                  }
                }
              }
            ]
          },
          {
            "description": "",
            "expression": {
              "kind": "StringExpression",
              "value": "hello world"
            },
            "identifier": {
              "kind": "Identifier",
              "name": "greeting"
            },
            "isConst": true,
            "kind": "VariableDeclaration",
            "type": {
              "kind": "KeywordType",
              "name": "string"
            }
          },
          {
            "body": [],
            "description": "Calculates the sum",
            "examples": [],
            "identifier": {
              "kind": "Identifier",
              "name": "calculateTotal"
            },
            "isAsync": false,
            "isGenerator": false,
            "kind": "FunctionDeclaration",
            "parameters": [
              {
                "description": "",
                "identifier": {
                  "kind": "Identifier",
                  "name": "price"
                },
                "isRest": false,
                "kind": "ParameterDeclaration",
                "type": {
                  "kind": "KeywordType",
                  "name": "number"
                }
              },
              {
                "description": "",
                "identifier": {
                  "kind": "Identifier",
                  "name": "tax"
                },
                "isRest": false,
                "kind": "ParameterDeclaration",
                "type": {
                  "kind": "KeywordType",
                  "name": "number"
                }
              }
            ],
            "performance": {
              "history": [],
              "memoryDataSizeComplexityFn": "",
              "timeDataSizeComplexityFn": ""
            },
            "return_": {
              "description": "",
              "identifier": {
                "kind": "Identifier",
                "name": "return"
              },
              "kind": "ReturnDeclaration",
              "type": {
                "kind": "KeywordType",
                "name": "number"
              }
            },
            "title": "Calculates the sum"
          },
          {
            "body": [],
            "description": "Calculates the sum",
            "examples": [],
            "identifier": {
              "kind": "Identifier",
              "name": "calculateUserAge"
            },
            "isAsync": false,
            "isGenerator": false,
            "kind": "FunctionDeclaration",
            "parameters": [
              {
                "description": "",
                "identifier": {
                  "kind": "Identifier",
                  "name": "u2"
                },
                "isRest": false,
                "kind": "ParameterDeclaration",
                "type": {
                  "identifier": {
                    "kind": "TypeIdentifier",
                    "name": "User"
                  },
                  "kind": "ReferenceType"
                }
              },
              {
                "description": "",
                "identifier": {
                  "kind": "Identifier",
                  "name": "u1"
                },
                "isRest": false,
                "kind": "ParameterDeclaration",
                "type": {
                  "identifier": {
                    "kind": "TypeIdentifier",
                    "name": "User"
                  },
                  "kind": "ReferenceType"
                }
              }
            ],
            "performance": {
              "history": [],
              "memoryDataSizeComplexityFn": "",
              "timeDataSizeComplexityFn": ""
            },
            "return_": {
              "description": "",
              "identifier": {
                "kind": "Identifier",
                "name": "return"
              },
              "kind": "ReturnDeclaration",
              "type": {
                "kind": "KeywordType",
                "name": "number"
              }
            },
            "title": "Calculates the sum"
          }
        ],
        "description": "",
        "identifier": {
          "kind": "Identifier",
          "name": ""
        },
        "kind": "ModuleDeclaration"
      },
      "dependencies": [
        {
          "identifier": {
            "kind": "Identifier",
            "name": "myDependencies"
          },
          "kind": "DependencyExpression",
          "version": "1.1.1"
        }
      ],
      "description": "myFavoritePackage",
      "engine": {
        "identifier": {
          "kind": "Identifier",
          "name": "node"
        },
        "kind": "DependencyExpression",
        "version": "1.1.3"
      },
      "identifier": {
        "kind": "Identifier",
        "name": "myPackage"
      },
      "kind": "PackageDeclaration",
      "version": "0.1.1"
    });
  });
});
