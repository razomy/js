import {
  Type,
  type FunctionDeclaration
} from '@google/genai';
import * as  abstracts from "@razomy/abstracts";

function mapType(type: string): Type {
  const t = type.toLowerCase();
  if (t === 'string') return Type.STRING;
  if (t === 'number' || t === 'integer' || t === 'float') return Type.NUMBER;
  if (t === 'boolean') return Type.BOOLEAN;
  if (t === 'array') return Type.ARRAY;
  if (t === 'object') return Type.OBJECT;
  return Type.STRING; // default
}

/**
 * Конвертирует вашу FunctionSpecification в формат Google Gemini
 */
export function specToTool(spec: abstracts.translators.FunctionDeclaration): FunctionDeclaration {
  const properties: Record<string, any> = {};
  const required: string[] = [];

  spec.parameters.forEach(param => {
    properties[param.identifier.name] = {
      type: mapType(param.kind),
      description: param.description,
    };

    // Если нет дефолтного значения, считаем обязательным
    if (param.expression === null) {
      required.push(param.kind);
    }
  });

  return {
    name: spec.identifier.name,
    description: `${spec.description}.`,
    parameters: {
      type: Type.OBJECT,
      properties,
      required: required.length > 0 ? required : [],
    },
  };
}
