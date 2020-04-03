class Challenge{
    constructor(targetPos, targetSize, obsticals=[]){
        this.target = new Target(targetPos, targetSize);
        this.obsticals = obsticals;
    }

    static FromJson(json){
        var obsticals = [];
        for(var obsticalTemplate of json.o){
            obsticals.push(new Obstical(obsticalTemplate))
        }
        return new Challenge(createVector(json.t.pos.x, json.t.pos.y), json.t.r, obsticals)
    }

    addObstical(proposedObstical){
        let {x1, x2, y1, y2} = proposedObstical
        let cleanProposedObstical = {
            x1: min(x1, x2),
            x2: max(x1, x2),
            y1: min(y1, y2),
            y2: max(y1, y2)
        }
        this.obsticals.push(new Obstical(cleanProposedObstical))
    }

    removeObstical(pos){
        let i = 0;
        for(var obstical of this.obsticals){
            var check = obstical.checkCollision(pos);
            if(check){
                this.obsticals.splice(i, 1)
                return;
            }
            i++
        }
    }

    checkPosition(pos){
        let distance = this.target.pos.dist(pos)
        if(distance < this.target.radius){
            return "target";
        }
        for(var obstical of this.obsticals){
            var check = obstical.checkCollision(pos)
            if(check){
                return "obstical"
            }
        }
        return undefined;
    }

    distanceFromTarget(pos){
        return this.target.pos.dist(pos);
    }

    save(){
        var targetJson = {pos:{x:this.target.pos.x, y:this.target.pos.y}, r:this.target.radius}
        var obsticalsJson = []
        for(var obstical of this.obsticals){
            obsticalsJson.push(obstical.template)
        }
        let result = {t:targetJson, o:obsticalsJson}
        saveJSON(result, "challenge.json")
    }

    render(){
        this.target.render()
        for(var obstical of this.obsticals){
            obstical.render()
        }
    }
}