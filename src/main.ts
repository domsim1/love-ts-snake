import { Snake } from "./class/snake";
import { initialize } from "./helper/initialize";

const SCALE = 10;
const SCREEN = 400;
let snake: Snake;

love.load = (args) => {
  initialize(SCREEN, SCREEN, "Snake");
  snake = new Snake(SCALE);
  snake.setup();
};

love.update = (dt) => {
  snake.update(dt);
};

love.draw = () => {
  love.graphics.setColor(0.6, 0, 1, 1);
  love.graphics.rectangle(
    "fill",
    0,
    0,
    SCREEN,
    SCALE * 2,
  );
  love.graphics.setColor(1, 1, 1, 1);
  snake.draw();
  love.graphics.print("Score: 10", 2, 2);
};
