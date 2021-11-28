export class PARAMS {
  static readonly emptyColor: string = '#202022'
  static readonly strokeColor: string = '#313136'
  static readonly deleteRowColor: string = '#607d8b'
  static readonly squareSize: number = 40
  static readonly cols: number = 8
  static readonly rows: number = 15
  static readonly speed: number = 800
  static readonly speedDecrement: number = 50
  static readonly timeDeleteRow: number = 250
  static readonly widthSize: number = this.squareSize * this.cols
  static readonly heightSize: number = this.squareSize * this.rows
  static readonly scorePerSquare: number = 10
  static readonly colors = [
    '#4E9F3D',
    '#700B97',
    '#864879',
    '#B42B51',
    '#B85C38',
    '#1597BB',
    '#3282B8',
  ]
}
