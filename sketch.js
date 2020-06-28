let cols, rows;
let w = 60;
let grid = [];
let current;

function setup() {
  createCanvas(600, 600);
  cols = floor(width / w);
  rows = floor(width / w);
  frameRate(5)

  for (let j = 0; j < cols; j++) {
    for (let i = 0; i < rows; i++) {
      let cell = new Cell(i, j);
      grid.push(cell);
    }
  }

  current = grid[0];
}

function draw() {
  background("rgba(52, 152, 219,0.3)");
  grid.forEach(element => {
    element.show();
  });
  current.isVisited = true;
  let nextCell = current.checkedNeighbours();

  if (nextCell) {
	  nextCell.isVisited = true;
	  current = nextCell
  }
}

function Cell(i, j) {
  this.i = i;
  this.j = j;
  this.walls = [true, true, true, true];
  this.isVisited = false;

  this.show = () => {
    let x = this.i * w;
    let y = this.j * w;
    stroke(255);

    if (this.walls[0]) line(x, y, x + w, y);
    if (this.walls[1]) line(x + w, y, x + w, y + w);
    if (this.walls[2]) line(x + w, y + w, x, y + w);
    if (this.walls[3]) line(x, y + w, x, y);

    if (this.isVisited) {
      fill("rgba(241, 196, 15,0.7)");
      rect(x, y, w, w);
    }
  };

  this.checkedNeighbours = () => {
    let neighbours = [];

    let top = grid[index(i, j - 1)];
    let right = grid[index(i + 1, j)];
    let bottom = grid[index(i, j + 1)];
    let left = grid[index(i - 1, j)];

    if (top && !top.isVisited) neighbours.push(top);
    if (right && !right.isVisited) neighbours.push(right);
    if (bottom && !bottom.isVisited) neighbours.push(bottom);
    if (left && !left.isVisited) neighbours.push(left);

    if (neighbours.length > 0) {
      return neighbours[floor(random(neighbours.length))];
    }
  };
}

let index = (i, j) => (i < 0 || j < 0 || i > cols - 1 || j > cols - 1 ? undefined : i + j * cols);
