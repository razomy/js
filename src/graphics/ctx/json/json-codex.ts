
import NotImplementedException from '../../../exceptions/not-implemented-exception.js';
import { ICodec } from '../../../codec/i-codec.js';
import { IObject } from '../../../interfaces/i-object.js';
import { ISizeResource } from '../../graphics/attributes/size-attribute.js';
import { ElementView } from '../../graphics/elements/element-view.js';
import Resource from '../../../resources/resource.js';
import ResourceCollection from '../../../resources/resource-collection.js';
import { CodecFactory } from '../web/svg/codecs/codec-factory.js';
import { CodecConfig } from '../web/svg/codecs/codec-config.js';
import { EncodeNodeFactory } from '../web/svg/codecs/encode-node-factory.js';


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

export class JsonCodec implements ICodec<ElementView, Node> {
  private codecFactory: any;

  constructor() {
    const codecConfig: CodecConfig = new CodecConfig();
    const encodeNodeFactory: EncodeNodeFactory = new EncodeNodeFactory(codecConfig);
    this.codecFactory = new CodecFactory(codecConfig, encodeNodeFactory);
  }

  public decode(value: Node): ElementView {
    return this.iterate(value as HTMLElement);
  }

  public encode(node: ElementView): Node {
    throw new NotImplementedException();
  }

  private iterate(value: HTMLElement): ElementView {
    const node = this.codecFactory.create(value).decode(value);

    const valueChildren = value.childNodes;
    for (let i = 0; i < valueChildren.length; i++) {
      if (!valueChildren[i]) {
        continue;
      }

      const subNode = this.iterate(valueChildren[i] as HTMLElement);
      node.getBy(ResourceCollection).add(subNode);
    }

    return node;
  }
}
