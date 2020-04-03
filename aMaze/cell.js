class Cell{
    constructor(i, j, size, index, xoffset=0, yoffset=0){
        this.i = i;
        this.j = j;
        this.xoffset = xoffset;
        this.yoffset = yoffset;
        this.size = size
        this.index = index;
        this.x = (this.i*this.size)+xoffset;
        this.y = this.j*this.size+yoffset;
        this.walls = [true, true, true, true]
        this.visited = false;
    }
    render(color=undefined){
        push()
        if(color == undefined){
            if(this.visited){
                color = [100, 10, 100]
            }else{
                color = [51]
            }
        }
        fill(color)
        noStroke()
        rect(this.x, this.y, this.size, this.size)
        stroke(255)
        if(this.walls[0]){
            line(this.x, this.y, this.x+this.size, this.y)
        }
        if(this.walls[1]){
            line(this.x+this.size, this.y, this.x+this.size, this.y+this.size)
        }
        if(this.walls[2]){
            line(this.x+this.size, this.y+this.size, this.x, this.y+this.size)
        }
        if(this.walls[3]){
            line(this.x, this.y+this.size, this.x, this.y)
        }

        pop()
    }
}   