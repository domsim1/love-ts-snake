export enum Color {
  White,
  Purple,
  Red,
}

export function setColor(color: Color): void {
  switch (color) {
    case Color.White:
      love.graphics.setColor(1, 1, 1, 1);
      break;
    case Color.Purple:
      love.graphics.setColor(0.6, 0, 1, 1);
      break;
    case Color.Red:
      love.graphics.setColor(0.8, 0, 0.2, 1);
      break;
    default:
      love.graphics.setColor(0.9, 0.2, 0.8, 1);
  }
}
