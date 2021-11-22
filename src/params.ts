export const PARAMS = {
  emptyColor: '#ddd',
  width: 400,
  height: 600,
  cols: 10,
  rows: 15,
  speed: 800,
  widthSize: () => PARAMS.width / PARAMS.cols,
  heightSize: () => PARAMS.height / PARAMS.rows,
}