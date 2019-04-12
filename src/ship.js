import { width, height } from "./app";
export const ENGINE_THRUST = 0.009;

export default class Ship {
  constructor(options, angle = 60) {
    this.hSpeed = options.hSpeed;
    this.vSpeed = options.vSpeed;
    this.x = options.coords[0];
    this.y = options.coords[1];
    this.boardX = options.coords[0];
    this.boardY = options.coords[1];
    this.ctx = options.ctx;
    this.gravity = options.gravity;
    this.fuel = options.fuel;
    this.offset = angle;
    this.angle = angle;
    this.firing = false;
    this.history = [];
    this.sHistory = [];
    this.assist = true;
    this.keyAction({}, angle);
    this.step = this.step.bind(this);
    this.keyAction = this.keyAction.bind(this);
    this.paused = false;
  }

  radians(deg) {
    return deg * (Math.PI / 180);
  }
  step() {
    const x = this.calculateX();
    const y = this.calculateY();
    this.history.push([this.boardX + 15, this.boardY + 15]);
    this.sHistory.push([this.hSpeed, this.vSpeed]);
    this.boardX = this.boardX + this.hSpeed;
    this.boardY = this.boardY + this.vSpeed;
    this.x = x;
    this.y = y;
  }

  fireEngine() {
    this.updateVSpeed(ENGINE_THRUST);
    this.updateHSpeed(ENGINE_THRUST);
  }

  updateVSpeed(force) {
    this.vSpeed -= force * Math.cos(this.radians(this.angle));
  }
  updateHSpeed(force) {
    this.hSpeed -= force * Math.sin(this.radians(this.angle));
  }

  gravityChange() {
    this.vSpeed += this.gravity;
  }

  calculateX() {
    //for x axis
    const offset = Math.cos(this.radians(this.angle));
    let result = offset * this.hSpeed;
    //for y axis
    const offsetY = Math.sin(this.radians(this.angle)) * -1;
    return this.x + offsetY * this.vSpeed + result;
  }

  calculateY() {
    //for x axis
    const offset = Math.sin(this.radians(this.angle));
    let result = offset * this.hSpeed;
    //for y axis
    const offsetY = Math.cos(this.radians(this.angle));
    return this.y + offsetY * this.vSpeed + result;
  }

  keyAction(e, deg) {
    const offsetX = this.x + 30 / 2;
    const offsetY = this.y + 30 / 2;

    this.ctx.translate(offsetX, offsetY);

    if (e.code === "ArrowRight" && this.angle < 90) {
      this.ctx.rotate((-10 * Math.PI) / 180);
      this.angle += 10;
    }
    if (e.code === "ArrowLeft" && this.angle > -90) {
      this.ctx.rotate((10 * Math.PI) / 180);
      this.angle -= 10;
    }
    if (deg) {
      this.ctx.rotate((-deg * Math.PI) / 180);
    }
    if (e.code === "Space") {
      this.firing = true;
    }
    this.ctx.translate(-1 * offsetX, -1 * offsetY);
  }

  render() {
    window.onkeydown = this.keyAction;
    window.onkeyup = e => {
      if (e.code === "Space") {
        this.firing = false;
      }
    };
    this.gravityChange();
    this.ctx.clearRect(this.x - 10, this.y - 10, height, width);

    if (this.fuel < 8) {
      this.firing = false;
    }
    if (this.firing) {
      const shipFiring = document.getElementById("ship-firing");
      this.ctx.drawImage(shipFiring, this.x + 10, this.y + 25, 10, 10);
      this.fireEngine();
      this.fuel -= 8;
    }
    const ship = document.getElementById("ship");

    this.ctx.drawImage(ship, this.x, this.y, 30, 30);
  }

  animateExplosion() {
    const explodeFrameOne = document.getElementById("explosion1");
    const explodeFrameTwo = document.getElementById("explosion2");
    const explodeFrameThree = document.getElementById("explosion3");

    this.ctx.clearRect(this.x - 10, this.y - 10, height, width);
    this.ctx.drawImage(explodeFrameOne, this.x, this.y, 50, 50);
    setTimeout(() => {
      this.ctx.clearRect(this.x - 10, this.y - 10, height, width);
      this.ctx.drawImage(explodeFrameTwo, this.x, this.y, 50, 50);
    }, 100);
    setTimeout(() => {
      this.ctx.clearRect(this.x - 10, this.y - 10, height, width);
      this.ctx.drawImage(explodeFrameThree, this.x, this.y, 50, 50);
      setTimeout(() => {
        this.ctx.clearRect(this.x - 10, this.y - 10, height, width);
      }, 50);
    }, 100);
  }
}
