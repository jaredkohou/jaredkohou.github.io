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

}




const board = new Grid(".container")