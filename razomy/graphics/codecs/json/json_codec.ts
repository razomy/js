import {NotImplementedException} from 'razomy.exceptions/not_implemented_exception';
import {Codec} from 'razomy.codec/codec';
import {IObject} from 'razomy.object/i_object';
import {ISizeResource} from 'razomy.graphics/attributes/size_attribute';
import {ResourceCollection} from 'razomy.resources/resource_collection';
import {CodecFactory} from 'razomy.graphics/codecs/web/svg/codecs/codec_factory';
import {EncodeNodeFactory} from 'razomy.graphics/codecs/web/svg/codecs/encode_node_factory';
import {CodecConfig} from 'razomy.graphics/codecs/web/svg/codecs/codec_config';
import {ElementView} from 'razomy.graphics/elements/element_view';


export interface JsonObject {
  objectResource: IObject;
}

export interface JsonSizeResource {
  sizeResource: ISizeResource;
}

export interface JsonPropertiesResource {
  properties: { [key: string]: unknown };
}

export interface JsonEntityCollection {
  entityCollection: { resources: (JsonObject & ResourceNode)[] };
}

export type ResourceNode = JsonObject
  | JsonSizeResource
  | JsonPropertiesResource
  | JsonEntityCollection;
export type ResourceDescription = ResourceNode;


export const example: ResourceDescription = {
  objectResource: {
    type: 'Type',
    id: 'asd'
  },
  sizeResource: {
    width: 1,
    height: 1
  },
  properties: {
    name: 'My cool app'
  },
  entityCollection: {
    resources: [
      {
        objectResource: {
          type: 'Type',
          id: 'asd'
        }
      },
      {
        objectResource: {
          type: 'Type',
          id: 'asd'
        },
        sizeResource: {
          width: 1,
          height: 1
        }
      }
    ]
  }
};

export class JsonCodec implements Codec<ElementView, Node> {
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
