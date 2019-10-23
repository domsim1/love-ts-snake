import { KeyConstant } from "love.keyboard";
import { ILoop } from "../helper/loop";
import { Object } from "../helper/object";

export class Snake extends Object implements ILoop {
  private scale: number;
  private tickRate: number;
  private timePast: number;

  constructor(scale: number) {
    super(
      scale,      // width
      scale,      // height
      0,          // xspeed
      1,          // yspeed
      scale * 10, // x
      scale * 10, // y
    );
    this.scale = scale;
    this.tickRate = 0.3; // ticks per second
    this.timePast = 0;
  }

  public setup(): void {
    love.keypressed = (key) => {
      this.keypressed(key);
    };
  }

  public update(dt: number): void {
    this.timePast += dt;
    if (this.timePast >= this.tickRate) {
      this.timePast = 0;
      this.x += (this.xspeed * this.scale);
      this.y += (this.yspeed * this.scale);
      this.handleOutOfBounds();
    }
  }

  public draw(): void {
    love.graphics.rectangle(
      "fill",
      this.x,
      this.y,
      this.width,
      this.height,
    );
  }

  private keypressed(key: KeyConstant): void {
    switch (key) {
      case "up": {
        this.xspeed = 0;
        this.yspeed = -1;
        break;
      }
      case "down": {
        this.xspeed = 0;
        this.yspeed = 1;
        break;
      }
      case "left": {
        this.xspeed = -1;
        this.yspeed = 0;
        break;
      }
      case "right":
        this.xspeed = 1;
        this.yspeed = 0;
        break;
    }
  }

  private handleOutOfBounds(): void {
    if (this.x > love.graphics.getWidth() - this.scale) {
      this.x = 0;
      return;
    }
    if (this.x < 0) {
      this.x = love.graphics.getWidth() - this.scale;
      return;
    }
    if (this.y > love.graphics.getHeight() - this.scale) {
      this.y = 0 + (this.scale * 2);
      return;
    }
    if (this.y < 0 + (this.scale * 2)) {
      this.y = love.graphics.getHeight() - this.scale;
    }
  }
}
