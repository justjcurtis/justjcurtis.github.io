class Obstical{
    constructor(obsticalTemplate){
        this.template = obsticalTemplate
        let {x1, x2, y1, y2} = this.template
        this.pos = createVector(x1, y1)
        this.width = x2-x1
        this.height = y2-y1
    }

    checkCollision(pos){
        let {x1, x2, y1, y2} = this.template
        return (pos.x >= x1 && pos.x <= x2)&&(pos.y >= y1 && pos.y <= y2)
    }

    render(){
        rect(this.pos.x, this.pos.y, this.width, this.height)
    }
}