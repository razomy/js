import { CodecConfig }  from 'razomy.graphics/codecs/web/svg/codecs/codec_config';

export class EncodeNodeFactory {

  constructor(
    private codecConfig: CodecConfig
  ) {
  }

  public create<T extends SVGElement>(tag: string): T {
    return <T> document.createElementNS(this.codecConfig.xml_namespaces.svg, tag);
  }

}
