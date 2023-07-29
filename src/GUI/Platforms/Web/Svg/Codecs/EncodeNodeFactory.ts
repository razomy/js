import { CodecConfig } from '../../../../../GUI/Platforms/Web/Svg/Codecs/CodecConfig';

export class EncodeNodeFactory {

  constructor(
    private codecConfig: CodecConfig
  ) {
  }

  public create<T extends SVGElement>(tag: string): T {
    return <T> document.createElementNS(this.codecConfig.XmlNamespaces.svg, tag);
  }

}
