import { Maestro } from "./actor/maestro";
import { initialize } from "./util/initialize";

const SCALE = 10;
const SCREEN = 400;
initialize(SCREEN, SCREEN, "Snake");

const maestro = new Maestro(SCALE);

love.load = (args) => {
  maestro.setup();
};

love.update = (dt) => {
  maestro.update(dt);
};

love.draw = () => {
  maestro.draw();
};
