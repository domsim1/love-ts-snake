import { Color, setColor } from "../util/color";
import { ShapeTitle } from "../util/shape";
import { ILoop } from "../util/loop";

export class Menu implements ILoop {
  private scale: number;
  private title: Color[][];
  private titleX: number;
  private titleY: number;
  private shouldShowStartText: boolean;
  private startTextTimer: number;

  constructor(scale: number) {
    this.title = ShapeTitle;
    this.titleX = 10;
    this.titleY = 15;
    this.scale = scale;
    this.shouldShowStartText = true;
    this.startTextTimer = 0;
  }

  public update(dt: number): void {
    this.startTextTimer += dt;
    if (this.startTextTimer > 0.8) {
      this.startTextTimer = 0;
      this.shouldShowStartText = !this.shouldShowStartText;
    }
  }

  public draw(): void {
    this.title.map((row, y) => {
      row.map((color, x) => {
        setColor(color);
        love.graphics.rectangle(
          "fill",
          ((x * 0.5) * this.scale) + this.titleX, 
          ((y * 0.5) * this.scale) + this.titleY, 
          this.scale,this.scale);
      });
    });
    setColor(Color.White);
    love.graphics.print("Arrow keys to move!", 20 , 7 * this.scale);
    if (this.shouldShowStartText) {
      love.graphics.print("Press R to start!", 20, 9 * this.scale);
    }
  }
}
