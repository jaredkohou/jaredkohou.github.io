class Grid {
    constructor(selector) {
        this.rows = 6;
        this.cols = 7;
        this.selector = selector
        this.createGrid()
        this.setupListners()
    }
    createGrid() {
        $(this.selector).empty();
        this.isGameOver = false;
        this.turn = "red"
        for (let row = 0; row < this.rows; row++) {
            const $r = $("<div>").addClass('row')
            for (let col = 0; col < this.cols; col++) {
                const $c = $("<div>").addClass("col empty").attr("data-col", col).attr("data-row", row);
                $r.append($c)
            }
            $(this.selector).append($r)
        }
    }
    setupListners() {
        const that = this
        
        function getEmptyCircle(col) {
        const cellsArr = $(`.col[data-col='${col}']`);
        for (let i = cellsArr.length - 1; i >= 0; i--) {
        const $c = $(cellsArr[i])
        if ($c.hasClass("empty")) {
        return $c
        }
        }
        return null
        }
        
        $('.col.empty').on('click', function() {
        if (that.isGameOver) return;
        const col = $(this).data("col")
        const lastEmptyCell = getEmptyCircle(col)
        lastEmptyCell.removeClass("empty");
        lastEmptyCell.addClass(that.turn)
        lastEmptyCell.data('player', that.turn)
        
        const winner = that.checkForWinner(lastEmptyCell.data("row"), lastEmptyCell.data("col"))
        console.log(winner)
        if (winner) {
        that.isGameOver = true;
        alert(`Game over ${that.turn} won`)
        $('.col.empty').removeClass('empty');
        return;
        }
        
        that.turn = (that.turn === "red") ? "black" : "red";
        that.onPlayerMove();
        })
    }
    checkForWinner(row, col) {
        const that = this;

        function $getCell(i, j) {
            return $(`.col[data-row='${i}'][data-col='${j}']`);
        }

        function checkDirection(direction) {
            let total = 0;
            let i = row + direction.i;
            let j = col + direction.j;
            let $next = $getCell(i, j);
            while (i >= 0 &&
                i < that.rows &&
                j >= 0 &&
                j < that.cols &&
                $next.data('player') === that.turn
            ) {
                total++;
                i += direction.i;
                j += direction.j;
                $next = $getCell(i, j);
            }
            return total;
        }

        function checkWin(directionA, directionB) {
            const total = 1 +
                checkDirection(directionA) +
                checkDirection(directionB);
            if (total >= 4) {
                return that.turn;
            } else {
                return null;
            }
        }

        function checkDiagonalBLtoTR() {
            return checkWin({ i: 1, j: -1 }, { i: 1, j: 1 });
        }

        function checkDiagonalTLtoBR() {
            return checkWin({ i: 1, j: 1 }, { i: -1, j: -1 });
        }

        function checkVerticals() {
            return checkWin({ i: -1, j: 0 }, { i: 1, j: 0 });
        }

        function checkHorizontals() {
            return checkWin({ i: 0, j: -1 }, { i: 0, j: 1 });
        }

        return checkVerticals() ||
            checkHorizontals() ||
            checkDiagonalBLtoTR() ||
            checkDiagonalTLtoBR();
    }

}




const board = new Grid(".container")