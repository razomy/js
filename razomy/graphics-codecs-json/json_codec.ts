import {NotImplementedException} from '@razomy/exceptions';
import type {Codec} from '@razomy/codec';
import type {IObject} from '@razomy/object';
import type {ISizeResource} from '@razomy/graphics-attributes';
import {ResourceCollection} from '@razomy/resources';
import {CodecConfig, CodecFactory, EncodeNodeFactory} from '@razomy/graphics-codecs-web-svg-codecs';
import {ElementView} from '@razomy/graphics-elements';


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
    this.codecFactory = new CodecFactory(encodeNodeFactory);
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
