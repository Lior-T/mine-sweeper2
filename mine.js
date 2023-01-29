'use strict'
var count
const MINE = '💣'
var mines = []

function getMinesLocations(virtualBoard, mines) {
  var avalibleCells = []
  var mineLocations = []
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[i].length; j++) {
      avalibleCells.push([i, j])
      mineLocations.splice
      // console.log(avalibleCells)
    }
  }

  for (var i = 0; i < mines; i++) {
    var locationIdx = getRandomInt(avalibleCells.length)
    mineLocations.push(avalibleCells[locationIdx])
    avalibleCells.splice(locationIdx, 1)

  }
  console.log(mineLocations)
  return mineLocations
}

function createMines(virtualBoard, mineCount) {
  const mineLocations = getMinesLocations(virtualBoard, mineCount)
  for (var i = 0; i < mineCount; i++) {
    var mineIdx = mineLocations[i][0]
    var mineIdxCol = mineLocations[i][1]
    virtualBoard[mineIdx][mineIdxCol] = MINE
  }
}