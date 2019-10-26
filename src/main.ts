import { Maestro } from "./actor/maestro";
import { initialize } from "./util/initialize";
import { GameState } from "./util/state";
import { Menu } from "./actor/menu";
import { Gameover } from "./actor/gameover";

export const SCALE = 10;
export const SCREEN = 400;
initialize(SCREEN, SCREEN, "Snake");

let maestro: Maestro;
let menu: Menu;
let gameover: Gameover;

let state: GameState;

love.load = (args) => {
  state = GameState.Menu;
  menu = new Menu(SCALE);
};

love.update = (dt) => {
  switch (state) {
    case GameState.Menu:
      menu.update(dt);
      checkForRestart();
      break;
    case GameState.Game:
      maestro.update(dt);
      if (maestro.isGameover()) {
        gameover = new Gameover(SCALE, maestro.getScore());
        state = GameState.Gameover
      }
      break;
    case GameState.Gameover:
      gameover.update(dt);
      checkForRestart();
      break;
  }
};

love.draw = () => {
  switch (state) {
    case GameState.Menu:
      menu.draw();
      break;
    case GameState.Game:
      maestro.draw();
      break;
    case GameState.Gameover:
      gameover.draw();
      break;
  }
};

function checkForRestart(): void {
  if (love.keyboard.isDown("r")) {
    maestro = new Maestro(SCALE);
    maestro.setup();
    state = GameState.Game;
  }
}
