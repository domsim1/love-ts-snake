import { Color, setColor } from "../util/color";
import { ILoop } from "../util/loop";
import { Apple } from "./apple";
import { Snake } from "./snake";

export class Maestro implements ILoop {
  private scale: number;
  private score: number;
  private snake: Snake;
  private apple: Apple;

  constructor(scale: number) {
    this.score = 0;
    this.scale = scale;
    this.snake = new Snake(scale);
    this.apple = new Apple(
      this.scale,
      this.randomX(),
      this.randomY(),
    );
  }

  public setup(): void {
    this.snake.setup();
  }

  public update(dt: number): void {
    this.apple.update(dt);
    this.snake.update(dt);

    if (this.isSnakeEatingApple()) {
      this.increaseScoreBy(1);
      this.snake.grow();
      this.apple = new Apple(
        this.scale,
        this.randomX(),
        this.randomY(),
      );
    }

    if (this.apple.checkExpired()) {
      this.apple = new Apple(
        this.scale,
        this.randomX(),
        this.randomY(),
      );
    }
  }

  public draw(): void {
    this.apple.draw();
    this.snake.draw();
    this.drawHUD();
    this.drawScore();
  }

  private increaseScoreBy(amount: number): void {
    this.score += amount;
  }

  private drawHUD(): void {
    setColor(Color.Purple);
    love.graphics.rectangle(
      "fill",
      0, 0,
      love.graphics.getWidth(),
      this.scale * 2,
    );
  }

  private drawScore(): void {
    setColor(Color.White);
    love.graphics.print(`Score: ${this.score}`, 5, this.scale -  8);
  }

  private randomX(): number {
    return this.scale * (love.math.random((love.graphics.getWidth() / this.scale) - 1));
  }

  private randomY(): number {
    return this.scale * (love.math.random(2, (love.graphics.getHeight() / this.scale) - 1));
  }

  private isSnakeEatingApple(): boolean {
    if (this.snake.getX() === this.apple.getX()) {
      if (this.snake.getY() === this.apple.getY()) {
        return true;
      }
    }
    return false;
  }
}
