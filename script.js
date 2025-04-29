const levels = [
  // Level 1 - Easy
  [
    ["red", "blue", "red", "blue"],
    ["blue", "red", "blue", "red"],
    []
  ],
  // Level 2 - Medium
  [
    ["green", "yellow", "green", "yellow"],
    ["yellow", "green", "yellow", "green"],
    [],
    []
  ],
  // Level 3 - Hard
  [
    ["red", "blue", "yellow", "red"],
    ["yellow", "blue", "red", "blue"],
    ["blue", "yellow", "red", "yellow"],
    [],
    []
  ]
];

let currentLevel = 0;
let bottles = [];
let selectedIndex = null;

const container = document.getElementById("game-container");

function loadLevel(index) {
  if (index >= levels.length) {
    alert("Congratulations! You've finished all levels!");
    return;
  }
  bottles = JSON.parse(JSON.stringify(levels[index]));
  selectedIndex = null;
  render();
}

function render() {
  container.innerHTML = "";

  bottles.forEach((bottle, index) => {
    const bottleDiv = document.createElement("div");
    bottleDiv.className = "bottle";
    bottleDiv.dataset.index = index;

    bottle.forEach(color => {
      const colorDiv = document.createElement("div");
      colorDiv.className = "color";
      colorDiv.style.backgroundColor = color;
      bottleDiv.appendChild(colorDiv);
    });

    bottleDiv.onclick = () => handleClick(index);
    container.appendChild(bottleDiv);
  });
}

function handleClick(index) {
  if (selectedIndex === null) {
    selectedIndex = index;
  } else {
    if (selectedIndex !== index) {
      pour(selectedIndex, index);
    }
    selectedIndex = null;
    render();
    setTimeout(checkWin, 300);
  }
}

function pour(from, to) {
  if (bottles[from].length === 0 || bottles[to].length >= 4) return;

  const movingColor = bottles[from][bottles[from].length - 1];
  let moveCount = 0;

  for (let i = bottles[from].length - 1; i >= 0; i--) {
    if (bottles[from][i] === movingColor) moveCount++;
    else break;
  }

  while (
    moveCount-- &&
    bottles[to].length < 4 &&
    (bottles[to].length === 0 || bottles[to][bottles[to].length - 1] === movingColor)
  ) {
    bottles[to].push(bottles[from].pop());
  }
}

function checkWin() {
  const isLevelComplete = bottles.every(
    b => b.length === 0 || (b.length === 4 && b.every(color => color === b[0]))
  );

  if (isLevelComplete) {
    alert(Level ${currentLevel + 1} Completed!);
    currentLevel++;
    loadLevel(currentLevel);
  }
}

// Start game
loadLevel(currentLevel);
