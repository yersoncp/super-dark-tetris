export const PARAMS = {
  width: 400,
  height: 600,
  cols: 10,
  rows: 15,
  widthSize: () => PARAMS.width / PARAMS.cols,
  heightSize: () => PARAMS.height / PARAMS.rows,
}