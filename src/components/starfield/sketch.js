import { Starfield } from "./lib/starfield";

let starfield;
let w;
let h;
const setup = (p5, canvasParentRef) => {
    w = p5.windowWidth
    h = p5.windowHeight
    starfield = new Starfield(w * 2.5, h * 2, 500)
    p5.createCanvas(w * 2.5, w < h ? h * 1.2 : h).parent(canvasParentRef);
}

const draw = (p5) => {
    p5.background(17, 19, 24);
    starfield.update()
    starfield.render(p5, window.scrollX, window.scrollY)
}

export { setup, draw }