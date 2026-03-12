import * as graphicsGraphic from "@razomy/graphics-graphic";
import * as resources from "@razomy/resources";

export class UserEntity extends resources.EntityResource {
  constructor() {
    super();
    this.resources[graphicsGraphic.SelectionAttribute.type] = new graphicsGraphic.SelectionAttribute();
  }
}
