export interface ILoop {
  setup?: (args: string[]) => void;
  update: (dt: number) => void;
  draw: () => void;
}
