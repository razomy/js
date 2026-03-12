import * as exceptions from '@razomy/exceptions';
import * as abstracts from '@razomy/abstracts';
import * as object_ from '@razomy/object';
import * as graphicsAttributes from '@razomy/graphics-attributes';
import * as resources from '@razomy/resources';
import * as graphicsCodecsWebSvgCodecs from '@razomy/graphics-codecs-web-svg-codecs';
import * as graphicsElements from '@razomy/graphics-elements';

export interface JsonObject {
  objectResource: object_.IObject;
}

export interface JsonSizeResource {
  sizeResource: graphicsAttributes.ISizeResource;
}

export interface JsonPropertiesResource {
  properties: { [key: string]: unknown };
}

export interface JsonEntityCollection {
  entityCollection: { resources: (JsonObject & ResourceNode)[] };
}

export type ResourceNode = JsonObject | JsonSizeResource | JsonPropertiesResource | JsonEntityCollection;
export type ResourceDescription = ResourceNode;

export const example: ResourceDescription = {
  objectResource: {
    type: 'Type',
    id: 'asd',
  },
  sizeResource: {
    width: 1,
    height: 1,
  },
  properties: {
    name: 'My cool app',
  },
  entityCollection: {
    resources: [
      {
        objectResource: {
          type: 'Type',
          id: 'asd',
        },
      },
      {
        objectResource: {
          type: 'Type',
          id: 'asd',
        },
        sizeResource: {
          width: 1,
          height: 1,
        },
      },
    ],
  },
};

export class JsonCodec implements abstracts.patterns.Codec<graphicsElements.ElementView, Node> {
  private codecFactory: any;

  constructor() {
    const codecConfig: graphicsCodecsWebSvgCodecs.CodecConfig = new graphicsCodecsWebSvgCodecs.CodecConfig();
    const encodeNodeFactory: graphicsCodecsWebSvgCodecs.EncodeNodeFactory =
      new graphicsCodecsWebSvgCodecs.EncodeNodeFactory(codecConfig);
    this.codecFactory = new graphicsCodecsWebSvgCodecs.CodecFactory(encodeNodeFactory);
  }

  public decode(value: Node): graphicsElements.ElementView {
    return this.iterate(value as HTMLElement);
  }

  public encode(node: graphicsElements.ElementView): Node {
    throw new exceptions.NotImplementedException();
  }

  private iterate(value: HTMLElement): graphicsElements.ElementView {
    const node = this.codecFactory.create(value).decode(value);

    const valueChildren = value.childNodes;
    for (let i = 0; i < valueChildren.length; i++) {
      if (!valueChildren[i]) {
        continue;
      }

      const subNode = this.iterate(valueChildren[i] as HTMLElement);
      node.getBy(resources.ResourceCollection).add(subNode);
    }

    return node;
  }
}
