class Grid {
    constructor(selector) {
        this.rows = 6;
        this.cols = 7;
        this.selector = selector
        this.createGrid()
        this.setupListners()
    }


}




const board = new Grid(".container")