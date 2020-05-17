import Cell from './cell'
export default class Maze{
    constructor(sk, w, h, cellSize, xoffset=0, yoffset=0){
        this.sk = sk
        this.w = w;
        this.h = h;
        this.xoffset = xoffset;
        this.yoffset = yoffset;
        this.cellSize = cellSize;
        this.cols = Math.floor(w/cellSize);
        this.rows = Math.floor(h/cellSize);
        this.grid = this.newBlankGrid();
        this.current = undefined;
        this.stack = [];
        this.generated = false;
        this.target = undefined;
        this.start = undefined;
    }
    reset(){
        this.grid = this.newBlankGrid();
        this.current = undefined;
        this.stack = [];
        this.generated = false;
        this.target = undefined;
        this.start = undefined;
    }
    newBlankGrid(){
        this.generated = false;
        var result = []
        for(let j = 0; j < this.rows; j++){
            for(let i = 0; i<this.cols; i++){
                result.push(new Cell(this.sk, i, j, this.cellSize,result.length, this.xoffset, this.yoffset))
            }
        }
        return result;
    }
    cellIndex(i, j){
        if(i > this.cols-1 || i<0){
            return -1
        }
        if(j > this.rows-1 || j < 0){
            return -1
        }
        let index = i+j*this.cols;
        return index
    }
    checkNeighbors(cell, revisitRate){
        let neighbors = [
            this.grid[this.cellIndex(cell.i, cell.j-1)],
            this.grid[this.cellIndex(cell.i+1, cell.j)],
            this.grid[this.cellIndex(cell.i, cell.j+1)],
            this.grid[this.cellIndex(cell.i-1, cell.j)]
        ];
        for(let i = neighbors.length; i>=0; i--){
            if(neighbors[i] != undefined && (this.sk.random(0, 1)<this.sk.map(revisitRate, 0,1,0,0.13) || !neighbors[i].visited)){
                continue;
            }
            neighbors.splice(i, 1);
        }
        if(neighbors.length>0){
            return neighbors[Math.floor(this.sk.random(0, neighbors.length))]
        }
        return undefined;
    }
    removeWalls(a, b){
        if(a.i != b.i){
            let left = a.i<b.i?a:b
            let right = a.i<b.i?b:a
            left.walls[1] = false;
            right.walls[3] = false;
        }else if(a.j != b.j){
            let top = a.j<b.j?a:b
            let bottom = a.j<b.j?b:a
            top.walls[2] = false;
            bottom.walls[0] = false;
        }
    }
    visit(cell){
        cell.visited = true;
    }
    setCurrent(cell){
        if(this.current != undefined){
            this.stack.push(this.current)
        }
        this.visit(cell);
        this.current = cell;
    }
    stepBack(){
        this.current = this.stack.pop();
    }
    generate(revisitRate){
        if(this.generated){
            return
        }
        if(this.current == undefined){
            this.setCurrent(this.grid[0])
            return;
        }
        let next = this.checkNeighbors(this.current, revisitRate);
        if(next == undefined){
            this.stepBack()
            if(this.current == undefined){
                this.start = this.grid[0]
                this.target = this.grid[this.cellIndex(this.cols-1, this.rows-1)]
                this.generated = true;
            }
        }else{
            this.removeWalls(this.current, next)
            this.setCurrent(next);
        }
    }
    render(seeker=undefined){
        for(let i = 0; i< this.grid.length; i++){
            let cell = this.grid[i];
            cell.render();
        }
        if(this.current){
            this.current.render([50,200,10])
        }
        if(seeker != undefined){
            seeker.render();
        }
        if(this.generated){
            if(this.target){
                this.target.render([100,250,100])
            }
            if(this.start){
                this.start.render([250,100,100])
            }
        }
    }
}