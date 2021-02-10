class Grid {
    constructor(selector) {
        this.rows = 6;
        this.cols = 7;
        this.selector = selector
        this.createGrid()
        this.setupListners()
    }

    createGrid() {
        for (let row = 1; row < 7; row++) {
            const $r = $("<div></div>").addClass('row')
            for (let col = 1; col < 8; col++) {
                const $c = $("<div></div>").addClass("col empty").attr("data-col", col).attr("data-row", row);
                $r.append($c)
            }
            $(this.selector).append($r)
        }
    }



    setupListners() {

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

        $(".col.empty").hover(function() {
            
            const col = $(this).data("col")
            let emptycell = getEmptyCircle(col)
            emptycell.toggleClass("faded__red")
        })
    }
}



const board = new Grid(".container")