class AStarSeeker{
    constructor(alwaysShowPath = false, diagonalsEnabled = false){
        this.grid = undefined;
        this.grid2D = undefined;
        this.nodes = undefined;
        this.openSet = [];
        this.closedSet = [];
        this.noSolution = false;
        this.done = false;
        this.path = [];
        this.start = undefined;
        this.end = undefined;
        this.canDiagonal = diagonalsEnabled;
        this.alwaysShowPath = alwaysShowPath;
        this.current = undefined;
    }
    reset(){
        this.grid = undefined;
        this.grid2D = undefined;
        this.nodes = undefined;
        this.openSet = [];
        this.closedSet = [];
        this.noSolution = false;
        this.done = false;
        this.path = [];
        this.start = undefined;
        this.end = undefined;
    }
    removeArrElem(arr, elem){
        for(let i = 0; i<arr.length; i++){
            if(arr[i] == elem){
                arr.splice(i, 1);
            }
        }
    }
    nodeForIJ(i, j){
        let node = undefined;
        if(this.nodes[j]!= undefined){
            node = this.nodes[j][i];
        }
        return node;
    }
    _diagonalNeighbors(node){
        let neighbors = [
            this.nodeForIJ(node.i+1, node.j+1),
            this.nodeForIJ(node.i-1, node.j-1),
            this.nodeForIJ(node.i+1, node.j+1),
            this.nodeForIJ(node.i-1, node.j-1),
        ]
        for(let i = neighbors.length; i>=0; i--){
            if(neighbors[i]!= undefined){
                continue;
            }
            neighbors.splice(i, 1)
        }
        if(neighbors.length<1){
            return [];
        }
        let cCell = this.cellForNode(node);
        for(let i = neighbors.length-1; i>=0; i--){
            let neighbor = neighbors[i]
            let walled = false;
            let nCell = this.cellForNode(neighbor);
            let pos = -1
            if(cCell.j>nCell.j){
                if(cCell.i<nCell.i){
                    // n is top right
                    pos = 1
                    walled = !((!nCell.walls[3]&&!cCell.walls[0])||
                              (!nCell.walls[2]&&!cCell.walls[1]))
                }
                if(cCell.i>nCell.i){
                    // n is top left
                    pos = 0
                    walled = !((!nCell.walls[1]&&!cCell.walls[0])||
                              (!nCell.walls[2]&&!cCell.walls[3]))
                }
            }
            if(cCell.j<nCell.j){
                if(cCell.i<nCell.i){
                    // n is bottom right
                    pos = 2
                    walled = !((!nCell.walls[0]&&!cCell.walls[1])||
                              (!nCell.walls[3]&&!cCell.walls[2]))
                }
                if(cCell.i>nCell.i){
                    // n is bottom left
                    pos = 3
                    walled = !((!nCell.walls[0]&&!cCell.walls[3])||
                              (!nCell.walls[1]&&!cCell.walls[2]))
                }
            }
            // if(walled == false){
            //     print(pos)
            //     print(nCell.walls)
            //     print(cCell.walls)
            //     faile = true;
            // }
            if(walled){
                neighbors.splice(i, 1)
            }
        }
        return neighbors;
    }
    _squareNeighbors(node){
        let neighbors = [
            this.nodeForIJ(node.i, node.j+1),
            this.nodeForIJ(node.i, node.j-1),
            this.nodeForIJ(node.i+1, node.j),
            this.nodeForIJ(node.i-1, node.j),
        ];
        for(let i = neighbors.length; i>=0; i--){
            if(neighbors[i]!= undefined){
                continue;
            }
            neighbors.splice(i, 1)
        }
        if(neighbors.length<1){
            return [];
        }
        let cCell = this.cellForNode(node);
        for(let i = neighbors.length-1; i>=0; i--){
            let neighbor = neighbors[i]
            let walled = false;
            let nCell = this.cellForNode(neighbor);
            if(cCell.i != nCell.i){
                let left = cCell.i < nCell.i ? cCell:nCell;
                let right = cCell.i < nCell.i ? nCell:cCell;
                if(left.walls[1] || right.walls[3]){
                    walled = true;
                }
            }
            if(cCell.j != nCell.j){
                let top = cCell.j < nCell.j ? cCell:nCell;
                let bottom = cCell.j < nCell.j ? nCell:cCell;
                if(top.walls[2] || bottom.walls[0]){
                    walled = true;
                }
            }
            if(walled){
                neighbors.splice(i, 1)
            }
        }
        return neighbors;
    }
    
    nodeNeighbors(node){
        let sn = this._squareNeighbors(node)
        let dn = []
        if(this.canDiagonal){
            dn = this._diagonalNeighbors(node)
        }
        return [sn, dn];
    }
    cellForNode(node){
        return this.grid2D[node.j][node.i];
    }
    seek(){
        if(this.nodes == undefined){
            return;
        }
        if(this.done || this.noSolution){
            this.updatePath()
            return [this.done, this.noSolution];
        }
        if(this.start == undefined){
            this.setStart(0,0);
        }
        if(this.openSet.length<1){
            this.openSet.push(this.start);
            this.start.g = 0;
            if(this.end == undefined){
                this.setEnd(this.nodes[this.nodes.length-1].length-1, this.nodes.length-1)
            }
            this.start.h = this.heuristic(this.start, this.end);
            this.start.f = this.start.g+this.start.h;
        }
        this.current = undefined
        for(let i = 0; i<this.openSet.length;i++){
            if(this.current == undefined || this.openSet[i].f<this.current.f){
                this.current = this.openSet[i];
            }
        }
        if(this.current == this.end){
            this.updatePath()
            this.done = true;
        }
        this.closedSet.push(this.current);
        this.removeArrElem(this.openSet, this.current);
        let currentNeighbors = this.nodeNeighbors(this.current);
        for(let neighbor of currentNeighbors[0]){
            let tempG = this.current.g + 10;
            if(this.closedSet.includes(neighbor)){
                continue;
            }
            if(neighbor.g == undefined || neighbor.g > tempG){
                neighbor.previous = this.current;
                neighbor.g = tempG
                neighbor.h = this.heuristic(neighbor, this.end);
                neighbor.f = neighbor.g+neighbor.h;
            }
            this.openSet.push(neighbor);
        }
        if(this.canDiagonal){
            for(let neighbor of currentNeighbors[1]){
                let tempG = this.current.g + 14;
                if(this.closedSet.includes(neighbor)){
                    continue;
                }
                if(neighbor.g == undefined || neighbor.g > tempG){
                    neighbor.previous = this.current;
                    neighbor.g = tempG
                    neighbor.h = this.heuristic(neighbor, this.end);
                    neighbor.f = neighbor.g+neighbor.h;
                }
                this.openSet.push(neighbor);
            }
        }
        if(this.alwaysShowPath){
            this.updatePath()
        }
    }
    updatePath(){
        this.path = [];
        let temp = this.current;
        this.path.push(temp);
        while(temp.previous){
            this.path.push(temp.previous);
            temp = temp.previous;
        }
        this.path = this.path.reverse()
        if(this.openSet.length<1){
            this.noSolution = true;
        }
    }
    heuristic(a, b){
        // let h = abs(a.i-b.i)+abs(a.j-b.j)
        let h = dist(a.i, a.j, b.i, b.j)*10
        return h
    }
    setGrid(grid, w, h){
        this.grid = grid;
        this.grid2D = this.to2D(grid, w, h)

        this.nodes = this.nodesFrom2D(this.grid2D);
    }
    setStart(i,j){
        this.start = this.nodes[j][i];
    }
    setEnd(i, j){
        this.end = this.nodes[j][i];
    }
    nodesFrom2D(grid2D){
        let nodes = []
        for(let j = 0; j<grid2D.length; j++){
            nodes.push([])
            for(let i = 0; i<grid2D[j].length;i++){
                nodes[j].push(SeekerNode.FromMazeCell(grid2D[j][i]));
            }
        }
        return nodes
    }
    to2D(grid, w, h){
        let grid2D = []
        for(let j = 0; j<h; j++){
            grid2D.push([])
            for(let i = 0; i<w;i++){
                let index = i+j*w;
                grid2D[j].push(grid[index])
            }
        }
        return grid2D
    }
    from2D(grid2D){
        let grid = []
        for(let j = 0; j<grid2D.length; j++){
            for(let i = 0; i<grid2D[j].length;i++){
                grid.push(grid2D[j][i]);
            }
        }
        return grid
    }
    render(alpha=0.5){
        if(this.nodes == undefined){
            return;
        }
        alpha *= 255
        if(this.done || this.noSolution){
            alpha /=2
        }
        noStroke();
        let c = [0, 255, 0, alpha]
        if(this.openSet){
            for(let node of this.openSet){
                let cell = this.cellForNode(node);
                cell.render(c)
            }
        }
        c = [255, 0, 0, alpha]
        if(this.closedSet){
            for(let node of this.closedSet){
                let cell = this.cellForNode(node);
                cell.render(c)
            }
        }
        c = [0, 0, 255, this.done || this.noSolution ? 255 : alpha]
        if(this.path.length >0){
            for(let node of this.path){
                let cell = this.cellForNode(node);
                cell.render(c)
            }
            let head = this.path[this.path.length-1];
            let headCell = this.cellForNode(head);
            headCell.render([0,0,200,255])
        }
    }
}