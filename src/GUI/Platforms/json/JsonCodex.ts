import NotImplementedException from '../../../Exceptions/NotImplementedException.js';
import { ICodec } from '../../../Interfaces/ICodec.js';
import { IObject } from '../../../Interfaces/IObject.js';
import { ISizeResource } from '../../Graphics/Attributes/SizeAttribute.js';
import { ElementView } from '../../Graphics/Elements/ElementView.js';
import Resource from '../../../Resources/Resource.js';
import ResourceCollection from '../../../Resources/ResourceCollection.js';


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
