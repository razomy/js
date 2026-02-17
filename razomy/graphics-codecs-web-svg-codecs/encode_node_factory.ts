import {CodecConfig} from '@razomy/graphics-codecs-web-svg-codecs';

export class EncodeNodeFactory {

  constructor(
    private codecConfig: CodecConfig
  ) {
  }

  public create<T extends SVGElement>(tag: string): T {
    return <T>document.createElementNS(this.codecConfig.xmlNamespaces.svg, tag);
  }

}
