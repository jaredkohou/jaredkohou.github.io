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


}




const board = new Grid(".container")