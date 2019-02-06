export default class Point{
  constructor(coords,options={ground: false, star: false, bonus: false}){
    this.x = coords[0]
    this.y = coords[1]
    this.ground = options.ground
    this.star = options.star
    this.bonus = options.bonus
  }
}