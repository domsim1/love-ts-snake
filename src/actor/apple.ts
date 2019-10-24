import { Actor } from "../util/actor";
import { Color, setColor } from "../util/color";
import { ILoop } from "../util/loop";

export class Apple extends Actor implements ILoop {
  private expiration: number;
  private timePast: number;
  private isExpired: boolean;

  constructor(scale: number, x: number, y: number) {
    super(
      scale,
      scale,
      0, 0,
      x, y,
    );
    this.timePast = 0;
    this.expiration = 8;
    this.isExpired = false;
  }

  public update(dt: number): void {
    if (this.isExpired) { return; }
    this.timePast += dt;
    if (this.timePast >= this.expiration) {
      this.isExpired = true;
    }
  }

  public draw(): void {
    setColor(Color.Red);
    love.graphics.rectangle(
      "fill",
      this.x,
      this.y,
      this.width,
      this.height,
    );
  }

  public checkExpired(): boolean {
    return this.isExpired;
  }
}
