import { CodecConfig }  from 'razomy.js/graphics/codecs/web/svg/codecs/codec-config';

export class EncodeNodeFactory {

  constructor(
    private codecConfig: CodecConfig
  ) {
  }

  public create<T extends SVGElement>(tag: string): T {
    return <T> document.createElementNS(this.codecConfig.XmlNamespaces.svg, tag);
  }

}
