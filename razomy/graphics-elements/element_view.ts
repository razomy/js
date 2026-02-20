import {PositionAttribute, SizeAttribute} from '@razomy/graphics-attributes';
import {ResourceCollection} from '@razomy/resources';
import {ViewGraphic} from '@razomy/graphics-graphic';

export class ElementView extends ViewGraphic {

  constructor() {
    super();
    this.resources[SizeAttribute.type] = new SizeAttribute(0, 0);
    this.resources[PositionAttribute.type] = new PositionAttribute(0, 0);
    this.resources[ResourceCollection.type] = new ResourceCollection<ElementView>([]);
  }

  public get width() {
    return this.getBy(SizeAttribute).width;
  }

  public get height() {
    return this.getBy(SizeAttribute).height;
  }

  public get children() {
    return this.getBy<ResourceCollection<ElementView>>(ResourceCollection).getAll();
  }

}
