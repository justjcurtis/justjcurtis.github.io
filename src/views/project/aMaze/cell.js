export default class Cell{
    constructor(sk, i, j, size, index, xoffset=0, yoffset=0){
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
        this.sk = sk
    }
    render(color=undefined){
        this.sk.push()
        if(color == undefined){
            if(this.visited){
                color = [100, 10, 100]
            }else{
                color = this.sk.color('#191c31');
            }
        }
        this.sk.fill(color)
        this.sk.noStroke()
        this.sk.rect(this.x, this.y, this.size, this.size)
        this.sk.stroke(255)
        if(this.walls[0]){
            this.sk.line(this.x, this.y, this.x+this.size, this.y)
        }
        if(this.walls[1]){
            this.sk.line(this.x+this.size, this.y, this.x+this.size, this.y+this.size)
        }
        if(this.walls[2]){
            this.sk.line(this.x+this.size, this.y+this.size, this.x, this.y+this.size)
        }
        if(this.walls[3]){
            this.sk.line(this.x, this.y+this.size, this.x, this.y)
        }

        this.sk.pop()
    }
}   