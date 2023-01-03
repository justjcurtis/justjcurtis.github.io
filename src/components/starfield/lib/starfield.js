import { getRandomInt } from '../../../utils/helpers'
import { Star } from './star'

class Starfield {
    constructor(w, h, count) {
        this.w = w
        this.h = h
        this.count = count
        this.stars = this.newStars()
    }
    newStars() {
        return new Array(this.count).fill(0).map(_ => new Star(getRandomInt(this.w), getRandomInt(this.h), getRandomInt(4, 1)))
    }
    setStarCount(count) {
        this.count = count
        this.stars = this.newStars()
    }
    update() {
        for (const star of this.stars) {
            star.update()
        }
    }
    render(p5, scrollX, scrollY) {
        for (const star of this.stars) {
            star.render(p5, scrollX, scrollY)
        }
    }
}

export { Starfield }