class DNA {
    constructor(length) {
        this.genome = DNA.NewGenome(length)
        this.i = 0;
    }
    static NewGenome(length) {
        let genome = [];
        for (let i = 0; i < length; i++) {
            genome.push(createVector(random(-1, 1), random(-1, 1)))
        }
        return genome
    }
    static FromGenome(genome) {
        var d = new DNA(0);
        var newGenome = []
        for (var gene of genome) {
            newGenome.push(createVector(gene.x, gene.y))
        }
        d.genome = newGenome
        return d;
    }
    static FromCrossover(dnaA, dnaB, mutationRate, targetHit) {
        let _dnaA = dnaA.copy()
        let _dnaB = dnaB.copy()
        let mutationTypeA = random()<0.5 && !targetHit
        let maxDNAUsed = max(_dnaA.i, _dnaB.i)
        let weight = targetHit ? _dnaB.i / (_dnaA.i + _dnaB.i) : 0.6
        var newGenome = [];
        for (let i = 0; i < _dnaA.genome.length; i++) {
            if(i > maxDNAUsed){
                mutationTypeA = true
            }
            if(!targetHit && _dnaA.i < _dnaB.i && i > _dnaA.i){
                weight = 0.3
            }else if(!targetHit && _dnaA.i > _dnaB.i && i > _dnaB.i){
                weight = 0.7
            }
            let xy = random()
            let genome = xy < weight ? _dnaA.genome : _dnaB.genome
            var newGene = genome[i]
            let mutate = random()
            if (mutationTypeA) {
                if (mutate < mutationRate) {
                    newGene = createVector(random(-1, 1), random(-1, 1))
                }
            } else {
                if (mutate < mutationRate * 2) {
                    let mutationTypeB = random() < 0.5
                    if (mutationTypeB) {
                        let sign = newGene.x < 0 ? -1 : 1
                        newGene.x += random(-0.5, 0.5)
                        newGene.x = min(abs(newGene.x), 1) * sign
                    } else {
                        let sign = newGene.y < 0 ? -1 : 1
                        newGene.y += random(-0.5, 0.5)
                        newGene.y = min(abs(newGene.y), 1) * sign
                    }
                }
            }
            newGenome.push(newGene)
        }
        return DNA.FromGenome(newGenome);
    }
    copy() {
        let newDna = DNA.FromGenome(this.genome)
        newDna.i = this.i;
        return newDna
    }
    nextGene() {
        if (this.i < this.genome.length) {
            this.i++;
            return this.genome[this.i]
        }
        return undefined;
    }
}