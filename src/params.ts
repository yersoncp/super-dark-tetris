export const PARAMS = {
  emptyColor: '#222',
  strokeColor: '#333',
  deleteRowColor: 'red',
  squareSize: 40,
  cols: 8,
  rows: 15,
  speed: 800,
  widthSize: () => PARAMS.squareSize * PARAMS.cols,
  heightSize: () => PARAMS.squareSize * PARAMS.rows,
}