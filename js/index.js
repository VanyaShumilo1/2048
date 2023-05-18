import { Grid } from "./grid.js"
import { Tile } from "./tile.js"
const gameBoard = document.querySelector('.game-board')

const grid = new Grid(gameBoard)
grid.getRandomEmptyCell().linkTile(new Tile(gameBoard))
grid.getRandomEmptyCell().linkTile(new Tile(gameBoard))

const handleInput = (e) => {
    console.log(e.key)
    switch (e.key) {
        case 'ArrowUp':
            moveUp()
            break
        case 'ArrowDown':
            moveDown()
            break
        case 'ArrowLeft':
            moveLeft()
            break
        case 'ArrowRight':
            moveRight()
            break

    }
    grid.getRandomEmptyCell().linkTile(new Tile(gameBoard))
    setupInputOnce()
}


const moveUp = () => {
    slideTiles(grid.cellsGroupedByColumn)
}

const moveDown = () => {
    slideTiles(grid.cellsGroupedByReversedColumn)
}

const moveLeft = () => {
    slideTiles(grid.cellsGroupedByRow)
}

const moveRight = () => {
    slideTiles(grid.cellsGroupedByReversedRow)
}

const slideTilesInGroup = (group) => {
    for (let i = 1; i < group.length; i++) {
        if (group[i].isEmpty()) {
            continue
        }

        const cellWithTile = group[i]

        let targetCell
        let j = i - 1
        while (j >= 0 && group[j].canAccept(cellWithTile.linkedTile)) {
            targetCell = group[j]
            j--
        }

        if (!targetCell) {
            continue
        }

        if (targetCell.isEmpty()) {
            targetCell.linkTile(cellWithTile.linkedTile)
        } else {
            targetCell.linkTileForMerge(cellWithTile.linkedTile)
        }

        cellWithTile.unlinkTile()

    }
}

const slideTiles = (groupedCells) => {
    groupedCells.forEach(group => slideTilesInGroup(group))

    grid.cells.forEach(cell => {
        cell.hasTileForMerge() && cell.mergeTiles()
    })
}

const setupInputOnce = () => {
    window.addEventListener('keydown', handleInput, { once: true })
}

setupInputOnce()