let cols; let rows;
let size = 10;
let grid = [];

function neighbour_count(grid, x, y) {
  let neighbours = 0;
  for (let i=-1; i<2; i++) {
    for (let j=-1; j<2; j++) {
      if (i == 0 && j == 0) {
        continue;
      } else if (x+i < 0 || y+j < 0 || x+i >= cols || y+j >= rows) {
        continue;
      } else if (grid[x+i][y+j] == 1) {
        neighbours += 1;
      }
    }
  }
  return neighbours;
}

function next_grid(currentGrid) {
  let nextGrid = [];
  for (let i=0; i<cols; i++) {
    nextGrid[i] = [];
    for (let j=0; j<rows; j++) {
      let neighbours = neighbour_count(currentGrid, i, j);
      /*
      GAME OF LIFE RULES (pulled from wikipedia):
      Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
      Any live cell with two or three live neighbours lives on to the next generation.
      Any live cell with more than three live neighbours dies, as if by overpopulation.
      Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
      */
      if (currentGrid[i][j] == 1 && (neighbours < 2 || neighbours > 3)) {
        nextGrid[i][j] = 0;
      } else if (currentGrid[i][j] == 1) {
        nextGrid[i][j] = 1;
      } else if (currentGrid[i][j] == 0 && neighbours == 3) {
        nextGrid[i][j] = 1;
      } else {
        nextGrid[i][j] = currentGrid[i][j];
      }
    }
  }
  return nextGrid;
}

function starting_grid() {
  for (let i=0; i<cols; i++) {
    grid[i] = [];
    for (let j=0; j<rows; j++) {
      let state;
      let rand = floor(random(1, 11));
      if (rand <= 3) {
        state = 1;
      } else {
        state = 0;
      }

      grid[i][j] = state;

      if (state == 1) {
        fill(155, 242, 228);
      } else {
        fill(0, 0, 0);
      }
      rect(size*i, size*j, size * (3/4), size * (3/4), 3);
    }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  cols = width / size;
  rows = height / size;

  starting_grid();
}

function draw() {
  background(20);

  grid = next_grid(grid);
  for (let i=0; i<cols; i++) {
    for (let j=0; j<rows; j++) {
      let state = grid[i][j];

      if (state == 1) {
        fill(155, 242, 228); // turquoise
        //fill(floor(random(256)), floor(random(256)), floor(random(256))); // rainbow
      } else {
        fill(0, 0, 0);
      }
      rect(size*i, size*j, size * (3/4), size * (3/4), 3);
    }
  }
}
