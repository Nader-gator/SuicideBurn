export default class Point{
  constructor(coords,options={ground: false, star: false}){
    this.x = coords[0]
    this.y = coords[1]
    this.ground = options.ground
    this.star = options.star
  }
}