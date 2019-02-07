export default class Point{
  constructor(coords,options={ star: false, bonus: false}){
    this.x = coords[0]
    this.y = coords[1]
    this.star = options.star
    this.bonus = options.bonus
  }
}