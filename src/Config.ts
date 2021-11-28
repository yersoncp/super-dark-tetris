export class Config {
    static readonly emptyColor: string = '#202022'
    static readonly strokeColor: string = '#313136'
    static readonly deleteRowColor: string = '#B91C1C'
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
      '#EF4444',
      '#F97316',
      '#F59E0B',
      '#22C55E',
      '#06B6D4',
      '#6366F1',
      '#A855F7',
      '#EC4899',
      '#64748B',
    ]
  }
  