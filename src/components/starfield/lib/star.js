class Star {
    constructor(x, y, r) {
        this.x = x
        this.y = y
        this.r = r
        this.opacity = Math.random()
    }
    update() {
        const half = (Math.random() - 0.5)
        const next = -1.37 * Math.pow((this.opacity - 0.9), 3)
        this.opacity += (next * ((Math.random() * 0.02) + 0.01)) + (Math.random() < 0.006 ? half * 1.2 : 0)
        this.opacity = Math.min(1, this.opacity)
        this.opacity = Math.max(0, this.opacity)

    }
    render(p5, scrollX, scrollY) {
        const paralax = 0.05
        p5.noStroke()
        p5.fill(166, 173, 186, this.opacity * 255)
        p5.circle(this.x + (scrollX * paralax), this.y - (scrollY * paralax), this.r)
    }
}

export { Star }