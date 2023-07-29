import ResourceCollection from '../../../Resources/ResourceCollection';
import { PositionAttribute } from '../../../GUI/Graphics/Attributes/PositionAttribute';
import { SizeAttribute } from '../../../GUI/Graphics/Attributes/SizeAttribute';
import { ViewGraphic } from '../../../GUI/Graphics/ViewGraphic';

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
