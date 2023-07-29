import NotImplementedException from '../../../Exceptions/NotImplementedException';
import { ICodec } from '../../../Interfaces/ICodec';
import { IObject } from '../../../Interfaces/IObject';
import { ISizeResource } from '../../../GUI/Graphics/Attributes/SizeAttribute';
import { ElementView } from '../../../GUI/Graphics/Elements/ElementView';
import Resource from '../../../Resources/Resource';
import ResourceCollection from '../../../Resources/ResourceCollection';


interface JsonObject {
  ObjectResource: IObject;
}

interface JsonSizeResource {
  SizeResource: ISizeResource;
}

interface JsonPropertiesResource {
  Properties: { [key: string]: unknown };
}

interface JsonEntityCollection {
  EntityCollection: { resources: (JsonObject & ResourceNode)[] };
}

export type ResourceNode = JsonObject
  | JsonSizeResource
  | JsonPropertiesResource
  | JsonEntityCollection;
export type ResourceDescription = ResourceNode;


const example: ResourceDescription = {
  ObjectResource: {
    type: 'Type',
    id: 'asd'
  },
  SizeResource: {
    width: 1,
    height: 1
  },
  Properties: {
    name: 'My cool app'
  },
  EntityCollection: {
    resources: [
      {
        ObjectResource: {
          type: 'Type',
          id: 'asd'
        }
      },
      {
        ObjectResource: {
          type: 'Type',
          id: 'asd'
        },
        SizeResource: {
          width: 1,
          height: 1
        }
      }
    ]
  }
};

// export class JsonCodec implements ICodec<Resource, ResourceDescription> {
//
//   constructor() {
//   }
//
//   decode(value: Node): ElementView {
//     return this.iterate(<HTMLElement> value);
//   }
//
//   public encode(node: ElementView): Node {
//     throw new NotImplementedException();
//   }
//
//   private iterate(value: HTMLElement): ElementView {
//     const node = this.codecFactory.create(value).decode(value);
//
//     const valueChildren = value.childNodes;
//     for (let i = 0; i < valueChildren.length; i++) {
//       if (!valueChildren[i]) {
//         continue;
//       }
//
//       const subNode = this.iterate(<HTMLElement> valueChildren[i]);
//       node.getBy(ResourceCollection).add(subNode);
//     }
//
//     return node;
//   }
//
//
// }
