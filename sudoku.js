// JavaScript to generate the Sudoku board

// Create a function to generate the HTML for a row of cells
function createRow(rowNumber) {
    // Create a variable to store the HTML for the row
    var rowHTML = "<div class='sudoku-row'>";
  
    // Loop through the 9 columns
    for (var col = 1; col <= 9; col++) {
      // Generate the HTML for a cell
      var cellHTML = "<div class='sudoku-cell' data-row='" + rowNumber + "' data-column='" + col + "'></div>";
  
      // Add the cell HTML to the row HTML
      rowHTML += cellHTML;
    }
  
    // Close the row div
    rowHTML += "</div>";
  
    // Return the row HTML
    return rowHTML;
  }
  
  // Select the Sudoku board element
  var board = document.getElementById("sudoku-board");
  
  // Loop through the 9 rows
  for (var row = 1; row <= 9; row++) {
    // Generate the HTML for the row
    var rowHTML = createRow(row);
  
    // Add the row HTML to the board
    board.innerHTML += rowHTML;
  }
  


// JavaScript to check if a move is valid and update the cell

// Select all the Sudoku cells
var cells = document.querySelectorAll(".sudoku-cell");

// Add a click event listener to each cell
cells.forEach(function (cell) {
  cell.addEventListener("click", function () {
    // Get the row and column numbers from the cell's data-* attributes
    var row = cell.getAttribute("data-row");
    var column = cell.getAttribute("data-column");

    // Prompt the user for a value for the cell
    var value = prompt("Enter a value for cell (" + row + ", " + column + "):");

    // Check if the value is valid
    if (value >= 1 && value <= 9) {
      // Select all the cells in the row
      var rowCells = document.querySelectorAll('[data-row="' + row + '"]');
      var colCells = document.querySelectorAll('[data-column="' + column + '"]');

      // Check if the value is unique in the row
      var isUnique = true;
      rowCells.forEach(function (rowCell) {
        if (rowCell.innerHTML == value) {
          isUnique = false;
          alert("Invalid value. The number " + value + " already exists in row " + row + ".");
        }
      });
      colCells.forEach(function (colCell) {
        if (colCell.innerHTML == value) {
          isUnique = false;
          alert("Invalid value. The number " + value + " already exists in column " + column + ".");
        }
      });



      var baseRow = Math.floor((row - 1) / 3) * 3
      var baseCol = Math.floor((column - 1) / 3) * 3
      var blockCells = document.querySelectorAll('[data-row="' + (baseRow + 1) + '"][data-column="' + (baseCol + 1) + '"], [data-row="' + (baseRow + 1) + '"][data-column="' + (baseCol + 2) + '"], [data-row="' + (baseRow + 1) + '"][data-column="' + (baseCol + 3) + '"], [data-row="' + (baseRow + 2) + '"][data-column="' + (baseCol + 1) + '"], [data-row="' + (baseRow + 2) + '"][data-column="' + (baseCol + 2) + '"], [data-row="' + (baseRow + 2) + '"][data-column="' + (baseCol + 3) + '"], [data-row="' + (baseRow + 3) + '"][data-column="' + (baseCol + 1) + '"], [data-row="' + (baseRow + 3) + '"][data-column="' + (baseCol + 2) + '"], [data-row="' + (baseRow + 3) + '"][data-column="' + (baseCol + 3) + '"]')


      blockCells.forEach(function (blockCell) {
        if (blockCell.innerHTML == value) {
          isUnique = false;
          alert("Invalid value. The number " + value + " already exists in this block.");
        }
      });



      // Update the cell's value if it is unique
      if (isUnique) {
        cell.innerHTML = value;
      } else {
        // Show an error message if the value is not unique

      }
    } else {
      // Show an error message if the value
      alert("Invalid value. Please enter a number between 1 and 9.");
    }
    });
});



// JavaScript to generate a valid Sudoku board with a unique solution

// Function to check if a value is valid for a given cell
function isValidValue(board, row, column, value) {
    // Check if the value is unique in the row
    for (var c = 0; c < 9; c++) {
      if (board[row][c] == value) {
        return false;
      }
    }
  
    // Check if the value is unique in the column
    for (var r = 0; r < 9; r++) {
      if (board[r][column] == value) {
        return false;
      }
    }
  
    // Check if the value is unique in the block
    var blockRow = Math.floor(row / 3) * 3;
    var blockColumn = Math.floor(column / 3) * 3;
    for (var r = blockRow; r < blockRow + 3; r++) {
      for (var c = blockColumn; c < blockColumn + 3; c++) {
        if (board[r][c] == value) {
          return false;
        }
      }
    }
  
    // If the value is unique in the row, column, and block, return true
    return true;
  }
  
  // Recursive function to solve

function solveSudoku(board, row, column) {
    // Check if the row and column are out of bounds, which means we have reached the end of the board
    if (row > 8) {
      return true; // The puzzle is solved, return true
    }
  
    // If the current cell is not empty, move to the next cell
    if (board[row][column] != 0) {
      if (column == 8) {
        return solveSudoku(board, row + 1, 0);
      } else {
        return solveSudoku(board, row, column + 1);
      }
    }

    var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    // Sort the array in a random order
    numbers.sort(function() {
    return Math.random() - 0.5;
    });
  
    // Try all the possible values for the current cell
    for (var value = 1; value <= 9; value++) {
      // Check if the value is valid for the current cell
      if (isValidValue(board, row, column, numbers[value-1])) {
        // If the value is valid, update the board and move to the next cell
        board[row][column] = numbers[value-1];
        if (column == 8) {
          if (solveSudoku(board, row + 1, 0)) {
            return true; // If the puzzle is solved, return true
        }
      } else {
        if (solveSudoku(board, row, column + 1)) {
          return true; // If the puzzle is solved, return true
        }
      }

      // If the puzzle is not solved, reset the cell and try the next value
      board[row][column] = 0;
    }
  }

  // If none of the values worked, return false
  return false;
}


function uniqueSudoku(board, row, column) {
    // Check if the row and column are out of bounds, which means we have reached the end of the board
    if (row > 8) {
      return true; // The puzzle is solved, return true
    }
  
    // If the current cell is not empty, move to the next cell
    if (board[row][column] != 0) {
      if (column == 8) {
        return uniqueSudoku(board, row + 1, 0);
      } else {
        return uniqueSudoku(board, row, column + 1);
      }
    }

    var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    // Sort the array in a random order
    numbers.sort(function() {
    return Math.random() - 0.5;
    });
  
    var foundSolution = false
    var uniqueSolution = true
    var newNum = 0
    var oldNum = board[row][column]
    // Try all the possible values for the current cell
    for (var value = 1; value <= 9; value++) {
      // Check if the value is valid for the current cell
      if (isValidValue(board, row, column, numbers[value-1])) {
        // If the value is valid, update the board and move to the next cell
        board[row][column] = numbers[value-1];
        if (column == 8) {
          if (uniqueSudoku(board, row + 1, 0)) {
            if (foundSolution){
                uniqueSolution = false;
                break;
            } else {
                foundSolution = true;
                newNum = numbers[value-1];
            }
            // return true; // If the puzzle is solved, return true
            }
        } else {
            if (uniqueSudoku(board, row, column + 1)) {
                if (foundSolution){
                    uniqueSolution = false;
                    break;
                } else {
                newNum = numbers[value-1];
                    foundSolution = true;
                    newNum = numbers[value-1];
                }
            // return true; // If the puzzle is solved, return true
            }
        }
        
        // If the puzzle is not solved, reset the cell and try the next value
        board[row][column] = 0;
        }
    }

    if (foundSolution && uniqueSolution){
        board[row][column] = oldNum
        return true;
    }

  

  // If none of the values worked, return false
  return false;
}

  
// JavaScript to generate a valid Sudoku board with a unique solution

// Create an empty 9 by 9 grid
var myBoard = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];
  
  // Call the solveSudoku function to fill in the cells with valid values
  if (solveSudoku(myBoard, 0, 0)) {
    // If the puzzle is solved, print the board to the console
    for (var row = 0; row < 9; row++) {
      console.log(myBoard[row]);
    }
  } else {
    // If the puzzle is not solved, print an error message
    console.error("Error: Sudoku puzzle is not solvable!");
  }
  
var shuffledCells = Array.from({length: 81}, (v, i) => i);
shuffledCells.sort(function() {
    return Math.random() - 0.5;
  });

while (shuffledCells.length > 0){
    var tempVal = myBoard[Math.floor(shuffledCells[0] / 9)][(shuffledCells[0]) % 9]
    myBoard[Math.floor(shuffledCells[0] / 9)][(shuffledCells[0]) % 9] = 0
    if (uniqueSudoku(myBoard, 0, 0)) {
        shuffledCells.shift();
        continue;
    } else {
        myBoard[Math.floor(shuffledCells[0] / 9)][(shuffledCells[0]) % 9] = tempVal;
        shuffledCells.shift();
        continue;
    }
}

var countCells = 0;
for (var row = 0; row < 9; row++) {
    for (var col = 0; col < 9; col++) {
        if (myBoard[row][col] != 0) {
            countCells++;
            document.querySelector('[data-row="' + (row + 1) + '"][data-column="' + (col + 1) + '"]').innerHTML = myBoard[row][col];
        }
    }
}

console.log(countCells)

// selectedCells = shuffledCells.slice(0, 21);

//   for (var row = 0; row < 9; row++) {
//     for (var col = 0; col < 9; col++) {
//         if (selectedCells.includes(row*9 + col)) {
//             document.querySelector('[data-row="' + (row + 1) + '"][data-column="' + (col + 1) + '"]').innerHTML = myBoard[row][col];
//         }
//       }
//   }