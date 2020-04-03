let w; 
let h;
let divisions;
let maze;
let seeker;
let start = false;
let generationDone = false;
let searchDone = false;
let search = false;
let autoloop = true;
let revisitRate = 0.5;
let run = false;
let generationIndex = 0;

function setup() {
  w = windowWidth;
  h = windowHeight;
  let MazeMargin = 50
  divisions = 25
  maze = new Maze(w-MazeMargin, h-MazeMargin, floor(min(w, h)/divisions), MazeMargin/2, MazeMargin/2);
  seeker = new AStarSeeker(false, false);
  createCanvas(w, h)
}

function keyPressed(){
  if(key == "a"){
    autoloop = !autoloop
    return;
  }
  progress()
}

function touchStarted(){
  run = !run
}

function progress(){
  if(!start){
    start = true;
    return;
  }
  if(searchDone){
    reset()
  }
  if(generationDone){
    if(!search){
      search = true;
    }
  }
}

function reset(){
  if(generationDone && search && searchDone){
    generationDone = false;
    search = false;
    searchDone = false;
    seeker.reset();
    maze.reset()
  }
}

function draw() {
  if(!run && generationIndex == 1){
    return;
  }
  background(51);
  if(!generationDone){
    generationIndex = 0
    for(let i = 0; i<floor((divisions/25)*20); i++){
      if(start){
        search = false;
        searchDone = false;
        maze.generate(revisitRate);
        generationDone = maze.generated
        generationIndex = 1
        if(!run){
          break;
        }
      }
    }
  }else{
    generationDone = true
    if(generationDone && search){
      if(!seeker.grid){
        seeker.setGrid(maze.grid, maze.cols, maze.rows)
      }
      for(let i = 0; i<floor((divisions/25)*6); i++){
        // for(let i = 0; i<100000; i++){
          let result = seeker.seek();
          if(result){
            if(result[0]||result[1]){
              if(!searchDone){
                if(autoloop){
                  setTimeout(()=>{
                    searchDone = true;
                  }, 3000)
                }else{
                  searchDone = true;
              }
            }
          }
        }
      }
    }

  }
  maze.render(seeker);
  if(autoloop){
    progress()
  }
}