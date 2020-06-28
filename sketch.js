let cols, rows;
let w = 20;
let grid = [];
let current;
let stack = [];
let maxStackLength = 0;
let maxStackEle = null;
function setup() {
  createCanvas(600, 600);
  cols = floor(width / w);
  rows = floor(width / w);
//   frameRate(5);

  for (let j = 0; j < cols; j++) {
    for (let i = 0; i < rows; i++) {
      let cell = new Cell(i, j);
      grid.push(cell);
    }
  }

  current = grid[0];
}

function draw() {
  background(51);
  grid.forEach(element => {
    element.show();
  });
  current.isVisited = true;
  let nextCell = current.checkedNeighbours();

  if (nextCell) {
    current.isCurrent = false;
    nextCell.isCurrent = true;
    nextCell.isVisited = true;
    stack.push(current);
    removeWalls(current, nextCell);
    current = nextCell;
  } else if (stack.length > 0) {
    current.isCurrent = false;
    if (stack.length > maxStackLength) {
      maxStackLength = stack.length;
      if (maxStackEle) maxStackEle.isEnd = false;
      maxStackEle = current;
      current.isEnd = true;
    }
    current = stack.pop();
    current.isCurrent = true;
  }
}

function Cell(i, j) {
  this.i = i;
  this.j = j;
  this.walls = [true, true, true, true];
  this.isVisited = false;
  this.isCurrent = false;

  this.show = () => {
    let x = this.i * w;
    let y = this.j * w;
    stroke(255);

    if (this.walls[0]) line(x, y, x + w, y);
    if (this.walls[1]) line(x + w, y, x + w, y + w);
    if (this.walls[2]) line(x + w, y + w, x, y + w);
    if (this.walls[3]) line(x, y + w, x, y);

    if (this.isVisited) {
      noStroke();
	  if (this.isCurrent) fill(255, 255, 255, 125);
	  else if(this.isEnd) fill(255,0,0,175)
      else fill(255, 255, 255, 25);
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

function removeWalls(curr, next) {
  let distX = curr.i - next.i;
  let distY = curr.j - next.j;

  if (distX == -1) {
    current.walls[1] = false;
    next.walls[3] = false;
  }
  if (distX == 1) {
    current.walls[3] = false;
    next.walls[1] = false;
  }
  if (distY == -1) {
    current.walls[2] = false;
    next.walls[0] = false;
  }
  if (distY == 1) {
    current.walls[0] = false;
    next.walls[2] = false;
  }
}
