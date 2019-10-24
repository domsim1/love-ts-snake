import { Axis } from "./axis";

export class Actor extends Axis {
  protected width: number;
  protected height: number;
  protected xspeed: number;
  protected yspeed: number;

  constructor(
    width: number,
    height: number,
    xspeed: number,
    yspeed: number,
    x: number,
    y: number,
  ) {
    super(x , y);
    this.width = width;
    this.height = height;
    this.xspeed = xspeed;
    this.yspeed = yspeed;
  }
}
