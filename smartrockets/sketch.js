let p;
let run = true;
let proposedObstical;
let drawing = false;

let bestTimeP;
let genP;
let hitP;
let instructions = document.getElementById("instructions")
let startTime;

function setup() {
  startTime = millis();
  let cnv = createCanvas(worldSize, worldSize)
  cnv.style('display', 'block');
  cnv.style('margin', 'auto');
  p = new Population(250, 50, 0.1, 0.2);
  genP = createP()
  bestTimeP = createP(`Best Time: ???`)
  hitP = createP(`Target hit on gen: ??`)
  genP.addClass("infop")
  bestTimeP.addClass("infop")
  hitP.addClass("infop")
  p.load();
}

function keyPressed(){
  if(key == ' '){
    run = run ? false:true
  }
  if(key == 'r'){
    p = new Population(250, 50, 0.1, 0.2);
  }
}

function mouseClicked(e){
  if(run){
    return
  }
  if(!drawing){
    if(e.shiftKey){
      p.challenge.removeObstical(createVector(mouseX, mouseY))
      return
    }
    if(e.altKey){
      p.challenge.target.pos = createVector(mouseX, mouseY)
      return
    }
    if(e.ctrlKey){
      proposedObstical = undefined
      proposedObstical = {
        x1:mouseX, 
        x2:undefined,
        y1:mouseY,
        y2:undefined
      }
      drawing = true;
    }
  }else{
    if(!e.ctrlKey){
      drawing = false
      proposedObstical = undefined
    }else{
      proposedObstical.x2 = mouseX
      proposedObstical.y2 = mouseY
      p.challenge.addObstical(proposedObstical)
      drawing = false;
    }
  }
}

function draw() {
  if(startTime + 1000 - millis() < 0){
    instructions.classList.add("hide");
  }else{
    return;
  }
  background(50)
  if(run){
    p.update()
  }
  if(drawing){
    fill("darkRed")
    rect(proposedObstical.x1, proposedObstical.y1, mouseX-proposedObstical.x1, mouseY-proposedObstical.y1)
  }
  if(p.bestTime != undefined){
    bestTimeP.html(`Best Time: ${p.bestTime}s`)
    hitP.html(`Target hit on gen: ${p.hitGen+1}`)
  }
  genP.html(`Generation: ${p.generation+1}`)
  p.render()

}