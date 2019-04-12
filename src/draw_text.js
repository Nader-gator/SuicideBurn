import { width, height } from "./app";

export default class DrawText {
  constructor(options, ship) {
    this.statsCtx = options.statsCtx;
    this.textCtx = options.textCtx;
    this.ship = ship;
  }
  drawStats() {
    const ctx = this.statsCtx;
    const text = this.textCtx;

    ctx.beginPath();
    ctx.lineWidth = "1";

    ctx.fillStyle = "black";
    ctx.rect(window.innerWidth * 0.865, 30, 160, 90);
    ctx.fill();
    ctx.stroke();

    ctx.strokeStyle = "white";
    text.clearRect(0, 0, window.innerWidth, window.innerHeight);
    text.beginPath();
    text.font = `normal ${window.innerWidth * 0.008955}px Arial`;
    text.lineWidth = "1";
    text.textAlign = "left";

    let style = this.changeStyle();

    text.fillStyle = style.hSpeed;
    text.fillText(
      `Horizontal Speed: ${Math.ceil(this.ship.hSpeed * 100)}`,
      window.innerWidth * 0.872,
      60
    );
    text.fillStyle = style.vSpeed;
    text.fillText(
      `Vertical Speed: ${Math.ceil(this.ship.vSpeed * 100)}`,
      window.innerWidth * 0.872,
      80
    );
    text.fillStyle = style.fuel;
    text.fillText(
      `Fuel: ${Math.ceil(this.ship.fuel)}`,
      window.innerWidth * 0.872,
      100
    );
  }

  changeStyle() {
    let style = {
      hSpeed: "grey",
      vSpeed: "grey",
      fuel: "grey"
    };
    if (this.ship.vSpeed > 0.35) {
      style.vSpeed = "red";
    }
    if (Math.abs(this.ship.hSpeed) > 0.2) {
      style.hSpeed = "red";
    }
    if (this.ship.fuel < 500) {
      style.fuel = "red";
    }

    return style;
  }

  preGame() {
    const ctx = this.statsCtx;
    const text = this.textCtx;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    text.clearRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.beginPath();
    ctx.lineWidth = "1";
    ctx.strokeStyle = "white";
    ctx.fillStyle = "#252626";
    ctx.rect(
      window.innerWidth * 0.15,
      window.innerHeight / 5,
      window.innerWidth * 0.7,
      window.innerHeight / 2.2
    );
    ctx.fill();
    ctx.stroke();

    text.beginPath();
    text.font = `normal ${window.innerWidth * 0.0124}px Arial`;
    console.log(window.innerWidth);
    text.fillStyle = "white";
    text.lineWidth = "1";
    text.textAlign = "center";
    text.fillText(
      `Welcome to SuicideBurn, the objective of the game is to land the ship on a flat surface preserving as much fuel as possible.`,
      window.innerWidth * 0.5,
      window.innerHeight / 3.9
    );

    text.fillText(
      `Fire your engine by pressing space, and rotate the ship by left and right arrow keys`,
      window.innerWidth * 0.5,
      window.innerHeight / 3.2
    );
    text.fillText(
      `press SPACE to START`,
      window.innerWidth * 0.5,
      window.innerHeight / 2.5
    );
    this.drawAssistText();
    text.fillStyle = "#5f93e8";
    text.fillText(
      `About The Landing Assistance: the line drawn shows your predicted trajectory.`,
      window.innerWidth * 0.5,
      window.innerHeight / 1.8
    );
    text.fillText(
      `The line color changes to red at the 'suicide burn' point,the last possible point to fire your engines`,
      window.innerWidth * 0.5,
      window.innerHeight / 1.7
    );
    text.fillText(
      ` and still kill your horizonal/vertical velocity before crashing.The game uses your current ship angle to calculate this point`,
      window.innerWidth * 0.5,
      window.innerHeight / 1.6
    );
    window.onkeyup = e => {
      if (e.keyCode === 65) {
        this.ship.assist = !this.ship.assist;
        this.preGame();
      }
    };
  }
  drawAssistText() {
    const text = this.textCtx;

    if (this.ship.assist) {
      text.fillStyle = "#e85e5e";
      text.fillText(
        `Press A to disable landing assistance (your highscore will not be recorded with assistance ON)`,
        window.innerWidth * 0.5,
        window.innerHeight / 2.1
      );
    } else {
      text.fillStyle = "#e85e5e";
      text.fillText(
        `Press A to enable landing assistance (your highscore will not be recorded with assistance ON)`,
        window.innerWidth * 0.5,
        window.innerHeight / 2.1
      );
    }
  }

  clearCanvas() {
    const ctx = this.statsCtx;
    const text = this.textCtx;

    ctx.clearRect(0, 0, width, height);
    text.clearRect(0, 0, width, height);
  }

  result(status) {
    const ctx = this.statsCtx;
    const text = this.textCtx;

    ctx.beginPath();
    ctx.lineWidth = "1";
    ctx.strokeStyle = "white";
    ctx.fillStyle = "#252626";

    text.beginPath();
    text.font = "normal 25px Arial ";
    `normal ${window.innerWidth * 0.017222}px Arial`;
    text.fillStyle = "white";
    text.lineWidth = "1";
    text.textAlign = "center";
    if (status === "good") {
      ctx.rect(
        window.innerWidth * 0.3,
        window.innerHeight / 6,
        window.innerWidth * 0.4,
        window.innerHeight / 1.5
      );
      text.fillText(
        `The Eagle Has Landed!`,
        window.innerWidth * 0.5,
        window.innerHeight / 4
      );
      if (this.ship.assist) {
        text.fillStyle = "#e85e5e";
        text.fillText(
          `Press A to disable landing assistance`,
          window.innerWidth * 0.5,
          window.innerHeight / 1.4
        );
      } else {
        text.fillStyle = "#e85e5e";
        text.fillText(
          `Press A to enable landing assistance`,
          window.innerWidth * 0.5,
          window.innerHeight / 1.4
        );
      }
      window.onkeyup = e => {
        if (e.keyCode === 65) {
          this.ship.assist = !this.ship.assist;
          text.clearRect(
            window.innerWidth * 0.325,
            window.innerHeight / 6,
            window.innerWidth * 0.35,
            window.innerHeight / 1.7
          );
          this.result("good");
        }
      };
      // this.drawAssistText()
    } else if (status === "bad") {
      ctx.rect(
        window.innerWidth * 0.325,
        window.innerHeight / 6,

        window.innerWidth * 0.35,
        window.innerHeight / 3.5
      );
      text.fillText(
        `You left a 2 mile crater on the Moon!`,
        window.innerWidth * 0.5,
        window.innerHeight / 4
      );
      text.fillText(
        `Press space to start a new game`,
        window.innerWidth * 0.5,
        window.innerHeight / 3
      );
      if (this.ship.assist) {
        text.fillStyle = "#e85e5e";
        text.fillText(
          `Press A to disable landing assistance`,
          window.innerWidth * 0.5,
          window.innerHeight / 2.4
        );
      } else {
        text.fillStyle = "#e85e5e";
        text.fillText(
          `Press A to enable landing assistance`,
          window.innerWidth * 0.5,
          window.innerHeight / 2.4
        );
      }
      window.onkeyup = e => {
        if (e.keyCode === 65) {
          this.ship.assist = !this.ship.assist;
          text.clearRect(
            window.innerWidth * 0.325,
            window.innerHeight / 6,
            window.innerWidth * 0.35,
            window.innerHeight / 3.5
          );
          this.result("bad");
        }
      };
    }

    ctx.fill();
    ctx.stroke();
  }

  drawLastCommand(ranked) {
    const text = this.textCtx;
    text.fillStyle = "white";
    text.fillText(
      `Press ${ranked ? "ENTER" : "SPACE"} to start a new game`,
      window.innerWidth * 0.5,
      window.innerHeight / 1.28
    );
    text.stroke();
  }
}
