import {NotImplementedException} from 'razomy.exceptions/not_implemented_exception';
import {ICodec} from 'razomy.codec/i_codec';
import {IObject} from 'razomy.object/i_object';
import {ISizeResource} from 'razomy.graphics/attributes/size_attribute';
import {ResourceCollection} from 'razomy.resources/resource_collection';
import {CodecFactory} from 'razomy.graphics/codecs/web/svg/codecs/codec_factory';
import {EncodeNodeFactory} from 'razomy.graphics/codecs/web/svg/codecs/encode_node_factory';
import {CodecConfig} from 'razomy.graphics/codecs/web/svg/codecs/codec_config';
import {ElementView} from 'razomy.graphics/elements/element_view';


interface JsonObject {
  object_resource: IObject;
}

interface JsonSizeResource {
  size_resource: ISizeResource;
}

interface JsonPropertiesResource {
  properties: { [key: string]: unknown };
}

interface JsonEntityCollection {
  entity_collection: { resources: (JsonObject & ResourceNode)[] };
}

export type ResourceNode = JsonObject
  | JsonSizeResource
  | JsonPropertiesResource
  | JsonEntityCollection;
export type ResourceDescription = ResourceNode;


const example: ResourceDescription = {
  object_resource: {
    type: 'Type',
    id: 'asd'
  },
  size_resource: {
    width: 1,
    height: 1
  },
  properties: {
    name: 'My cool app'
  },
  entity_collection: {
    resources: [
      {
        object_resource: {
          type: 'Type',
          id: 'asd'
        }
      },
      {
        object_resource: {
          type: 'Type',
          id: 'asd'
        },
        size_resource: {
          width: 1,
          height: 1
        }
      }
    ]
  }
};

export class JsonCodec implements ICodec<ElementView, Node> {
  private codec_factory: any;

  constructor() {
    const codec_config: CodecConfig = new CodecConfig();
    const encode_node_factory: EncodeNodeFactory = new EncodeNodeFactory(codec_config);
    this.codec_factory = new CodecFactory(codec_config, encode_node_factory);
  }

  public decode(value: Node): ElementView {
    return this.iterate(value as HTMLElement);
  }

  public encode(node: ElementView): Node {
    throw new NotImplementedException();
  }

  private iterate(value: HTMLElement): ElementView {
    const node = this.codec_factory.create(value).decode(value);

    const value_children = value.childNodes;
    for (let i = 0; i < value_children.length; i++) {
      if (!value_children[i]) {
        continue;
      }

      const sub_node = this.iterate(value_children[i] as HTMLElement);
      node.getBy(ResourceCollection).add(sub_node);
    }

    return node;
  }
}
