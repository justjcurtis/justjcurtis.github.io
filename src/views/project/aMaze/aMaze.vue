<template>
  <div>
    <div class="content">
      <div class="p5sketch">
          <h1 class="mobile">aMaze</h1>
        <vue-p5 @sketch="sketch" />
        <div class="instructions">
          <h1>aMaze</h1>
          <p>This simulation will generate random mazes and then solve them using the A* algorithm in the least steps possible.</p>
          <p>Green squares represent potential paths to the end, yet to be explored.</p>
          <p>Red squares represent squres already visited and evaluated.</p>
          <p>The blue path shown at the end of each simulation is the most optimal path through the maze.</p>
          <span class="highlight">
            <p>Click / Tap the screen to play or pause the simulation.</p>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AStarSeeker from "./aStarSeeker";
import Maze from "./maze";
import VueP5 from "vue-p5";
export default {
  name: "aMaze",
  components: {
    "vue-p5": VueP5
  },
  methods: {
    sketch(sk) {
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

      function progress() {
        if (!start) {
          start = true;
          return;
        }
        if (searchDone) {
          reset();
        }
        if (generationDone) {
          if (!search) {
            search = true;
          }
        }
      }

      function reset() {
        if (generationDone && search && searchDone) {
          generationDone = false;
          search = false;
          searchDone = false;
          seeker.reset();
          maze.reset();
        }
      }
      sk.touchStarted = () => {
        run = !run;
      };
      sk.mouseClicked = () => {
        run = !run;
      };
      sk.keyPressed = e => {
        if (e.key == "a") {
          autoloop = !autoloop;
          return;
        }
        progress();
      };
      sk.setup = () => {
        if(window.innerWidth>=window.innerHeight){
          w = window.innerWidth * 0.6;
          h = window.innerHeight * 0.9;
        }else{
          w = window.innerWidth * 0.9;
          h = window.innerHeight * 0.6;
        }
        let MazeMargin = 50;
        divisions = 25;
        maze = new Maze(
          sk,
          w - MazeMargin,
          h - MazeMargin,
          Math.floor(Math.min(w, h) / divisions),
          MazeMargin / 2,
          MazeMargin / 2
        );
        seeker = new AStarSeeker(sk, false, false);
        sk.createCanvas(w, h);
      };
      sk.draw = () => {
        if (!run && generationIndex == 1) {
          return;
        }
        sk.background(sk.color("#191c31"));
        if (!generationDone) {
          generationIndex = 0;
          for (let i = 0; i < Math.floor((divisions / 25) * 20); i++) {
            if (start) {
              search = false;
              searchDone = false;
              maze.generate(revisitRate);
              generationDone = maze.generated;
              generationIndex = 1;
              if (!run) {
                break;
              }
            }
          }
        } else {
          if (search) {
            if (!seeker.grid) {
              seeker.setGrid(maze.grid, maze.cols, maze.rows);
            }
            for (let i = 0; i < Math.floor((divisions / 25) * 6); i++) {
              // for(let i = 0; i<100000; i++){
              let result = seeker.seek();
              if (result) {
                if (result[0] || result[1]) {
                  if (!searchDone) {
                    if (autoloop) {
                      setTimeout(() => {
                        searchDone = true;
                      }, 3000);
                    }
                  }
                }
              }
            }
          }
        }
        maze.render(seeker);
        if (autoloop) {
          progress();
        }
      };
    }
  }
};
</script>

<style scoped>
.content {
  position: fixed;
  height: 100vh;
  background: #191c31;
  overflow: hidden;
}
h1 {
  color: #ff9c40;
}
@media (orientation: landscape) {
  .p5sketch {
    display: flex;
    justify-content: start;
    width: 100%;
    height: 90vh;
    padding: 0;
  }
  .p5Canvas {
    display: inline-block;
    width: 100%;
    height: 90vh;
  }
  .instructions {
    display: inline-block;
    width: 30vw;
  }
  .instructions > p {
    margin: 1em;
    font-size: 1.5vw;
    text-align: start;
  }
  .highlight > p {
    color: #ff9c40;
    font-size: 1.5vw;
    text-align: start;
    margin: 1em;
  }
  .mobile{
    display: none;
  }
}
@media (orientation: portrait) {
  .p5sketch {
    display: block;
    justify-content: start;
    width: 100%;
    height: 90vh;
  }
  .p5Canvas {
    display: block;
    width: 100vw;
    height: 90vh;
  }
  .instructions {
    display: block;
    width: 100%;
  }
  .instructions h1 {
    display: none;
  }
  .instructions > p {
    margin-top: 0;
    margin-left: 1em;
    margin-right: 1em;
    font-size: 2vw;
    text-align: start;
  }
  .highlight > p {
    margin-right: 1em;
    margin-top: 0;
    color: #ff9c40;
    font-size: 2vw;
    text-align: start;
    margin-left: 1em;
  }
  h1{
    margin: 0;
  }
}
</style>