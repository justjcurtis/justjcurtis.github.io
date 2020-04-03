class Population{
    constructor(size, poolSize, mutationRate, epsilon){
        this.size = size;
        this.epsilon = floor(epsilon*size)
        this.poolSize = poolSize
        this.mutationRate = mutationRate
        this.pop = this.newGen();
        this.livingPop = this.pop.length;
        this.challenge = new Challenge(createVector(worldSize/2, worldSize/4), 25)
        this.bestScore = undefined;
        this.bestTime = undefined;
        this.generation = 0;
        this.targetHit = false
        this.targetHitLastGen = false;

    }

    load(all=false){
        loadJSON("./challenge.json", (result)=>{
            this.challenge = Challenge.FromJson(result);
        })
    }

    save(all=false){
        this.challenge.save()
    }

    newGen(){
        let result = []
        for(let i = 0; i< this.size-1; i++){
            result.push(new Rocket())
        }
        return result;
    }

    update(){
        if(this.livingPop < 1){
            this.nextPop()
            this.targetHitLastGen = false;
        }
        for(var rocket of this.pop){
            if(rocket.death == undefined){
                rocket.update()
                if(
                    rocket.pos.x > worldSize || rocket.pos.x < 0 ||
                    rocket.pos.y > worldSize || rocket.pos.y < 0
                ){
                    this.endRocket(rocket)
                }

                let challengeCheck = this.challenge.checkPosition(rocket.pos)
                if(challengeCheck){
                    if(challengeCheck == "target"){
                        if(!this.targetHit){
                            this.hitGen = this.generation;
                        }
                        this.targetHit = true;
                        this.targetHitLastGen = true;
                    }
                    this.endRocket(rocket, challengeCheck=="target")
                }
            }
        }
    }

    nextPop(){
        this.generation ++;
        let scores = [];
        let i = 0;
        for(let rocket of this.pop){
            scores.push({i:i, score: 0-((rocket.distance*2) + (rocket.fuelUsed()/100))})
            i++
        }

        scores.sort((a, b) =>{
            return abs(a.score) - abs(b.score)
        })

        let matingPool = []
        for(let i = 0; i< this.poolSize; i++){
            matingPool.push(this.pop[scores[i].i]);
        }

        if(matingPool[0].distance == 0){
            this.bestTime = this.bestTime != undefined ? min(round(matingPool[0].fuelUsed()/10)/100, this.bestTime) : round(matingPool[0].fuelUsed()/10)/100
        }
        this.bestScore = this.bestScore != undefined ? max(floor(scores[0].score), this.bestScore) : floor(scores[0].score)

        this.pop = this.breed(matingPool);
        this.livingPop = this.pop.length;
    }

    breed(best){
        let children = []
        let champ = best[0].copy()
        champ.isChamp = true;
        for(let i = 0; i< this.size-(1+this.epsilon); i++){
            children.push(new Rocket(DNA.FromCrossover(champ.dna, best[i%best.length].dna, this.mutationRate, this.targetHitLastGen)));
        }
        for(let i = 0; i< this.epsilon; i++){
            children.push(new Rocket());
        }
        champ.dna.i = 0;
        children.push(champ)
        return children;
    }

    endRocket(rocket, hitTarget){
        rocket.death = millis();
        rocket.distance = hitTarget ? 0 : this.challenge.distanceFromTarget(rocket.pos);
        this.livingPop--;
    }

    render(){
        for(var rocket of this.pop){
            rocket.render()
        }
        this.challenge.render()
    }
}