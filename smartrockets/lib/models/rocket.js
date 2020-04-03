class Rocket{
    constructor(dna=undefined){
        this.dna = dna == undefined ? new DNA(1000) : dna
        this.birth = millis();
        this.death = undefined;
        this.pos = createVector(worldSize/2, worldSize)
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0, 0)

        this.speedLimit = 20
        this.accLimit = 0.2

        this.isChamp = false;

        this.distance = undefined;
    }

    copy(){
        return new Rocket(this.dna.copy())
    }

    fuelUsed(){
        if(this.death !== undefined){
            return this.death - this.birth
        }
        return millis() - this.birth
    }

    applyForce(force){
        this.acc.add(force)
    }

    update(){
        this.pos.add(this.vel)
        this.vel.add(this.acc)
        this.vel.limit(this.speedLimit)
        this.acc.setMag(this.accLimit)
        this.applyForce(this.dna.nextGene())
    }

    render(){
        push()
        noStroke()
        translate(this.pos.x, this.pos.y)
        rotate(this.vel.heading())
        rectMode(CENTER)
        if(this.isChamp){
            fill(60, 150, 50, 255)
        }else{
            fill(50, 130, 220, 80)
        }
        rect(0, 0, 50, 10)
        if(this.isChamp){
            fill(255, 0, 0, 255) 
        }else{
            fill(255, 0, 0, 80) 
        }
        triangle(25, -5, 35, 0, 25, 5)
        pop()
    }
}