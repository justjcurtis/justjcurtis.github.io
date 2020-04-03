class Target{
    constructor(pos, r){
        this.pos = pos
        this.radius = r 
    }

    render(){
        fill("darkGreen")
        circle(this.pos.x, this.pos.y, this.radius*2)
        noStroke()
        fill("blue")
        circle(this.pos.x, this.pos.y, this.radius)
        fill("red")
        circle(this.pos.x, this.pos.y, this.radius/2.5)
    }

}