export default class SeekerNode{
    constructor(i, j){
        this.f = undefined;
        this.g = undefined;
        this.h = undefined;
        this.i = i
        this.j = j
        this.previous = undefined;
    }
    static FromMazeCell(cell){
        return new SeekerNode(cell.i, cell.j)
    }
}