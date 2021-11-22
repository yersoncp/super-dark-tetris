## La idea

Tetris es un juego diseñado por Alekséi Pázhitnov en 1984. La idea es desarrollar el juego usando NextJS y TypeScrip. Las razones el por qué elegí Tetris es con el fin de poner en práctica mis habilidades de algoritmia y POO sin tener dependencias de cualquier librería para juegos.

Manos a la obra.

## Conceptos básicos

### 1. Celda
Casilla cuadrada con coordenadas ```x, y```. Dependiendo si está ocupado puede tomar ```taken: true``` o ```taken: false```
### 2. Tetrominos

Es una forma geométrica compuesta por 4 cuadrados (celdas) iguales conectados entre sí.
* I, O, T, J, L, S, Z

Fuente: https://es.wikipedia.org/wiki/Tetromin%C3%B3

### 3. Board
El tablero rectangular compuesto por celdas distribuidos en filas y columnas.