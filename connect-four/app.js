class Grid {
    constructor(selector) {
        this.rows = 6;
        this.cols = 7;
        this.selector = selector
        this.createGrid()
    }

    createGrid(){
        for (let row = 1; row < 7; row++) {
            const $r = $("<div></div>").addClass("row")
            for (let col = 1; col < 8; col++){
                const $c = $("<div></div").addClass("col empty").attr("data-col", col).attr("data-row", row);
                $r.append($c)
            }
            $(this.selector).append($r)
        }
    }


}