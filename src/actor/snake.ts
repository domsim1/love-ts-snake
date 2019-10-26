import { KeyConstant } from "love.keyboard";
import { Actor } from "../util/actor";
import { Axis } from "../util/axis";
import { Color, setColor } from "../util/color";
import { ILoop } from "../util/loop";
import { Direction } from "../util/direction";

export class Snake extends Actor implements ILoop {
  private scale: number;
  private tickRate: number;
  private timePast: number;
  private tailBlocks: Axis[];
  private moveBuffer: Direction[];
  private currentDirection: Direction;
  private isSnakeDead: boolean;

  constructor(scale: number) {
    super(
      scale,      // width
      scale,      // height
      0,          // xspeed
      0,          // yspeed
      scale * 10, // x
      scale * 10, // y
    );
    this.scale = scale;
    this.tickRate = 0.1; // ticks per second
    this.timePast = 0;
    this.tailBlocks = [];
    this.moveBuffer = [];
    this.currentDirection = Direction.Down;
    this.isSnakeDead = false;
  }

  public setup(): void {
    love.keypressed = (key) => {
      this.keypressed(key);
    };
    this.setMoveSpeed();
  }

  public update(dt: number): void {
    if (this.isSnakeDead) { return; }
    this.timePast += dt;
    if (this.timePast >= this.tickRate) {
      this.timePast = 0;
      if (this.moveBuffer.length > 0) {
        this.currentDirection = this.moveBuffer.shift() || Direction.Down;
        this.setMoveSpeed();
      }
      for (let i = 0; i < this.tailBlocks.length; i++) {
        if (i < this.tailBlocks.length - 1) {
          this.tailBlocks[i].setXY(
            this.tailBlocks[i + 1].getX(),
            this.tailBlocks[i + 1].getY(),
          );
        } else {
          this.tailBlocks[i].setXY(this.x, this.y);
        }
      }
      this.x += (this.xspeed * this.scale);
      this.y += (this.yspeed * this.scale);
      this.handleOutOfBounds();
      if (this.didSnakeEatTail()) {
        this.isSnakeDead = true;
      }
    }
  }

  public draw(): void {
    setColor(Color.White);
    love.graphics.rectangle(
      "fill",
      this.x,
      this.y,
      this.width,
      this.height,
    );
    for (const block of this.tailBlocks) {
      love.graphics.rectangle(
        "fill",
        block.getX(),
        block.getY(),
        this.width,
        this.height,
      );
    }
  }

  public grow(): void {
    this.tailBlocks.unshift(new Axis(this.x, this.y));
    if (this.tickRate >= 0.0) {
      this.tickRate -= 0.001;
    } else {
      this.tickRate = 0.0;
    }
  }

  public isDead(): boolean {
    return this.isSnakeDead;
  }

  private keypressed(key: KeyConstant): void {
    switch (key) {
      case "up":
        if (this.isMoveLegal(Direction.Up)) {
          this.moveBuffer.push(Direction.Up);
        }
        break;
      case "down":
        if (this.isMoveLegal(Direction.Down)) {
          this.moveBuffer.push(Direction.Down);
        }
        break;
      case "left":
        if (this.isMoveLegal(Direction.Left)) { 
          this.moveBuffer.push(Direction.Left);
        }
        break;
      case "right":
        if (this.isMoveLegal(Direction.Right)) {
          this.moveBuffer.push(Direction.Right);
        }
        break;
      default: break;
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

  private didSnakeEatTail(): boolean {
    for (const block of this.tailBlocks) {
      if (block.getX() === this.x) {
        if (block.getY() === this.y) {
          return true;
        }
      }
    }
    return false;
  }

  private isMoveLegal(dir: Direction): boolean {
    if (this.tailBlocks.length < 1) {
      return true;
    }
    const lastMove =
      this.moveBuffer.length > 0 
      ? this.moveBuffer[this.moveBuffer.length - 1] 
      : undefined;
    switch (dir) {
      case Direction.Up:
        return this.checkMoveConstraintAgainst(Direction.Down, lastMove);
      case Direction.Down:
        return this.checkMoveConstraintAgainst(Direction.Up, lastMove);
      case Direction.Left:
        return this.checkMoveConstraintAgainst(Direction.Right, lastMove);
      case Direction.Right:
          return this.checkMoveConstraintAgainst(Direction.Left, lastMove);
      default:
        return false;
    }
  }

  private checkMoveConstraintAgainst(dir: Direction, lastMove?: Direction): boolean {
    if (lastMove !== null) {
      if (lastMove === dir) {
        return false;
      }
      return true;
    }
    if (this.currentDirection == dir) {
      return false;
    }
    return true;
  }

  private setMoveSpeed(): void {
    switch (this.currentDirection) {
      case Direction.Up:
        this.xspeed = 0;
        this.yspeed = -1;
        break;
      case Direction.Down:
        this.xspeed = 0;
        this.yspeed = 1;
        break;
      case Direction.Left:
        this.xspeed = -1;
        this.yspeed = 0;
        break;
      case Direction.Right:
        this.xspeed = 1;
        this.yspeed = 0;
        break;
      default: break;
    }
  }
}
