export function initialize(
  width: number,
  height: number,
  title: string,
): void {
  love.window.setTitle(title);
  love.window.setMode(
    width,
    height,
    {
      centered: true,
      resizable: false,
      vsync: true,
    },
  );
}
