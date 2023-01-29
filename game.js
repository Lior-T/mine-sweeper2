'use strict'
var smiley = '😀'
var gBoard
var FLAG = "🚩"

const gGame = {
  minesAroundCount: 2,
  isShown: false,
  isMine: false,
  isMarked: true,
  isOn: false,
  life: 3,
  selected: {}
}

var virtualBoard = []

const gLevel = {
  SIZE: 4,
  MINES: 2

}

function init() {
  console.log('hello')
  gGame.selected = {}
  gBoard = buildBoard()
  virtualBoard = buildBoard()
  var elEnd = document.getElementById('restart-btn')
  elEnd.innerHTML = '😀'
  createMines(virtualBoard, gLevel.MINES)
  initNegsCount(virtualBoard)
  renderBoard(gBoard, '.board', gGame)
  gGame.isOn = true

  gGame.life = 3
}


function buildBoard() {
  const size = 4
  const board = []

  for (var i = 0; i < gLevel.SIZE; i++) {
    board.push([])

    for (var j = 0; j < gLevel.SIZE; j++) {
      if (board[i][j] !== MINE)
        board[i][j] = null
    }

  } return board
}

function setMinesNegsCount(virtualBoard, rowIdx, colIdx) {
  var minesAroundCount = 0
  for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
    for (var j = colIdx - 1; j <= colIdx + 1; j++) {
      var isColIdxValid = null
      var isIValid = i < virtualBoard.length && i >= 0
      if (isIValid) {
        var isColIdxValid = j < virtualBoard[i].length && j >= 0
        var isIdxCellClicked = rowIdx === i && colIdx === j

        if (isColIdxValid && isIValid && !isIdxCellClicked) {
          if (virtualBoard[i][j] === MINE) {
            minesAroundCount++


          }
        }
      }
    }
  }
  return minesAroundCount
}

function initNegsCount(virtualBoard) {
  for (var i = 0; i < gLevel.SIZE; i++) {
    for (var j = 0; j < gLevel.SIZE; j++) {
      console.log(`${i}/${j}`)
      if (virtualBoard[i][j] !== MINE) {
        var minesCount = setMinesNegsCount(virtualBoard, i, j)
        virtualBoard[i][j] = minesCount
      }
      console.log(virtualBoard)

    }
  }
}

function setCellSelected(i, j) {
  gBoard[i][j] = virtualBoard[i][j]
  gGame.selected[`${i}-${j}`] = true
}
function onCellClicked(i, j) {
  if (virtualBoard[i][j] === FLAG) {
    return
  }
  console.log('onCellClicked', { i, j })
  showLife()
  if (gGame.isOn) {
    setCellSelected(i, j)
    renderBoard(gBoard, '.board', gGame)
    if (gBoard[i][j] === MINE) {
      gGame.life--, endGame()
    } else if (virtualBoard[i][j] === 0) {
      expandSelected(i, j)
    }
    showVictory()
    renderBoard(gBoard, '.board', gGame)
  }
}
function onCellRightClicked(e, i, j) {
  e.preventDefault()
  if (gBoard[i][j] === FLAG) {
    gBoard[i][j] = null
  } else if (!gGame.selected[`${i}-${j}`]) {
    virtualBoard[i][j] = FLAG
    gBoard[i][j] = virtualBoard[i][j]
  }
  renderBoard(gBoard, '.board', gGame)
}

function endGame() {
  if (gGame.life === 0) {


    var elEnd = document.getElementById('restart-btn')
    elEnd.innerHTML = '🤯'
    gGame.isOn = false
  }
}
function showLife() {

  var elLife = document.querySelector('span')
  var strHTML = `<span></span>`
  strHTML += `${gGame.life}`
  elLife.innerHTML = strHTML
  renderBoard(gBoard, '.board')
}

function initEasy() {
  gLevel.SIZE = 4
  gLevel.MINES = 2
  init()
}
function initMedium() {
  gLevel.SIZE = 8
  gLevel.MINES = 14
  init()
}
function initHard() {
  gLevel.SIZE = 12
  gLevel.MINES = 32
  init()
}

function showVictory() {
  for (var i = 0; i < gLevel.SIZE; i++) {
    for (var j = 0; j < gLevel.SIZE; j++) {
      if (gBoard[i][j] !== MINE && !gGame.selected[`${i}-${j}`]) {
        return;
      }
    }
  }
  var elEnd = document.getElementById('restart-btn')
  elEnd.innerHTML = '😎'
}

function expandSelected(iIdx, jIdx) {
  for (var i = iIdx - 1; i < iIdx + 2; i++) {
    for (var j = jIdx - 1; j < jIdx + 2; j++) {
      const isValidCellIdx = i >= 0 && i < gLevel.SIZE && j >= 0 && j < gLevel.SIZE
      if (isValidCellIdx && virtualBoard[i][j] !== MINE) {
        if (gGame.selected[`${i}-${j}`]) continue
        const shouldRunRecursive = virtualBoard[i][j] === 0
        setCellSelected(i, j)
        shouldRunRecursive && expandSelected(i, j)
      }
    }
  }
}
