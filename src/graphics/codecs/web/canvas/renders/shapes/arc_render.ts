
/**
 * Arc constructor
 * @constructor
 * @memberof Konva
 * @augments Konva.Shape
 * @param {Object} config
 * @param {Number} config.angle in degrees
 * @param {Number} config.innerRadius
 * @param {Number} config.outerRadius
 * @param {Boolean} [config.clockwise]
 * @@shapeParams
 * @@nodeParams
 * @example
 * // draw a Arc that's pointing downwards
 * var arc = new Konva.Arc({
 *   innerRadius: 40,
 *   outerRadius: 80,
 *   fill: 'red',
 *   stroke: 'black'
 *   strokeWidth: 5,
 *   angle: 60,
 *   rotationDeg: -120
 * });
 */
export class ArcRender {

  constructor(
    /**
     * get/set innerRadius
     * @name Konva.Arc#innerRadius
     * @method
     * @param {Number} innerRadius
     * @returns {Number}
     * @example
     * // get inner radius
     * var innerRadius = arc.innerRadius();
     *
     * // set inner radius
     * arc.innerRadius(20);
     */
    public innerRadius = 0,
    /**
     * get/set outerRadius
     * @name Konva.Arc#outerRadius
     * @method
     * @param {Number} outerRadius
     * @returns {Number}
     * @example
     * // get outer radius
     * var outerRadius = arc.outerRadius();
     *
     * // set outer radius
     * arc.outerRadius(20);
     */
    public outerRadius = 0,
    /**
     * get/set angle in degrees
     * @name Konva.Arc#angle
     * @method
     * @param {Number} angle
     * @returns {Number}
     * @example
     * // get angle
     * var angle = arc.angle();
     *
     * // set angle
     * arc.angle(20);
     */
    public angle = 0,
    /**
     * get/set clockwise flag
     * @name Konva.Arc#clockwise
     * @method
     * @param {Boolean} clockwise
     * @returns {Boolean}
     * @example
     * // get clockwise flag
     * var clockwise = arc.clockwise();
     *
     * // draw arc counter-clockwise
     * arc.clockwise(false);
     *
     * // draw arc clockwise
     * arc.clockwise(true);
     */

    public clockwise = false
  ) {
  }

  _sceneFunc(context: any) {
    const pi_over_180 = Math.PI / 180;

    const angle = (this.angle * pi_over_180);
    const clockwise = this.clockwise;

    context.beginPath();
    context.arc(0, 0, this.outerRadius, 0, angle, clockwise);
    context.arc(0, 0, this.innerRadius, angle, 0, !clockwise);
    context.closePath();
    context.fillStrokeShape(this);
  }

  getWidth() {
    return this.outerRadius * 2;
  }

  getHeight() {
    return this.outerRadius * 2;
  }

  setWidth(width: number) {
    this.outerRadius = width / 2;
  }

  setHeight(height: number) {
    this.outerRadius = height / 2;
  }

}
