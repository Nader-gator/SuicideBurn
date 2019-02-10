/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! exports provided: width, height */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "width", function() { return width; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "height", function() { return height; });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/ship.js");
/* harmony import */ var _surface__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./surface */ "./src/surface.js");
/* harmony import */ var _game_handler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game_handler */ "./src/game_handler.js");



var width = 3000;
var height = 700;
document.addEventListener("DOMContentLoaded", function () {
  var canvasEl = document.getElementById('layer1');
  var ctx = canvasEl.getContext("2d");
  var shipcanvasEl = document.getElementById('layer2');
  var shipCtx = shipcanvasEl.getContext("2d");
  var statsEl = document.getElementById('layer3');
  var statsCtx = statsEl.getContext("2d");
  var textEl = document.getElementById('layer4');
  var textCtx = textEl.getContext("2d");
  canvasEl.height = height;
  canvasEl.width = window.innerWidth;
  shipcanvasEl.height = height;
  shipcanvasEl.width = window.innerWidth;
  statsEl.height = height;
  statsEl.width = window.innerWidth;
  textEl.height = height;
  textEl.width = window.innerWidth;
  textEl.style.height = height;
  textEl.style.width = window.innerWidth;
  var surface = new _surface__WEBPACK_IMPORTED_MODULE_1__["default"]({
    width: width,
    height: height,
    gravity: 0.0035,
    ctx: ctx
  });
  var ship = new _ship__WEBPACK_IMPORTED_MODULE_0__["default"]({
    hSpeed: 2,
    vSpeed: 0.5,
    coords: [50, 50],
    ctx: shipCtx,
    gravity: surface.gravity,
    statsCtx: statsCtx,
    textCtx: textCtx
  });
  var game = new _game_handler__WEBPACK_IMPORTED_MODULE_2__["default"](surface, ship);
  game.start();
});

/***/ }),

/***/ "./src/game_handler.js":
/*!*****************************!*\
  !*** ./src/game_handler.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return GameHandler; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GameHandler =
/*#__PURE__*/
function () {
  function GameHandler(surface, ship) {
    _classCallCheck(this, GameHandler);

    this.ship = ship;
    this.surface = surface;
  }

  _createClass(GameHandler, [{
    key: "isOver",
    value: function isOver() {
      if (this.surface.collisionHappened(this.ship.boardX + 30, this.ship.boardY + 30) || this.surface.collisionHappened(this.ship.boardX + 30, this.ship.boardY) || this.surface.collisionHappened(this.ship.boardX, this.ship.boardY + 30) || this.surface.collisionHappened(this.ship.boardX, this.ship.boardY)) {
        return true;
      }

      return false;
    }
  }, {
    key: "checkLanding",
    value: function checkLanding() {
      var fX;
      var fY;
      var lX;
      var lY;

      for (var i = 0; i < this.surface.points.length; i++) {
        if (this.surface.points[i][0] > this.ship.boardX + 30) {
          lX = this.surface.points[i][0];
          lY = this.surface.points[i][1];
          fX = this.surface.points[i - 1][0];
          fY = this.surface.points[i - 1][1];
          break;
        }
      }

      if (Math.abs(fY - lY) <= 5 && Math.abs(fX - lX) > 20 && this.ship.vSpeed < 0.35 && Math.abs(this.ship.hSpeed) < 0.2 && (this.ship.angle === 0 || this.ship.angle === -10 || this.ship.angle === 10)) {
        console.log('good');
      } else {
        console.log('bad'); // console.log(Math.abs(fY - lY))
        // console.log(Math.abs(fX - lX))
        // console.log((this.ship.vSpeed))
        // console.log(Math.abs(this.ship.hSpeed))
      }
    }
  }, {
    key: "start",
    value: function start() {
      var _this = this;

      this.interval = setInterval(function () {
        _this.ship.step();

        _this.ship.render();

        if (_this.isOver()) {
          _this.ship.fire = false;

          _this.ship.render();

          clearInterval(_this.interval);

          _this.checkLanding();
        }
      }, 20);
    }
  }]);

  return GameHandler;
}();



/***/ }),

/***/ "./src/point.js":
/*!**********************!*\
  !*** ./src/point.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Point; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Point = function Point(coords) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    star: false,
    bonus: false
  };

  _classCallCheck(this, Point);

  this.x = coords[0];
  this.y = coords[1];
  this.star = options.star;
  this.bonus = options.bonus;
};



/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Ship; });
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app */ "./src/app.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


"hSpeed = pixes/ms";

var Ship =
/*#__PURE__*/
function () {
  function Ship(options) {
    _classCallCheck(this, Ship);

    this.hSpeed = options.hSpeed;
    this.vSpeed = options.vSpeed;
    this.x = options.coords[0];
    this.y = options.coords[1];
    this.boardX = options.coords[0];
    this.boardY = options.coords[1];
    this.ctx = options.ctx;
    this.gravity = options.gravity;
    this.statsCtx = options.statsCtx;
    this.textCtx = options.textCtx;
    this.fuel = 5000;
    this.ctx.height = _app__WEBPACK_IMPORTED_MODULE_0__["height"];
    this.ctx.width = _app__WEBPACK_IMPORTED_MODULE_0__["width"];
    this.offset = 90;
    this.keyAction = this.keyAction.bind(this);
    this.keyAction({}, 90);
    this.angle = 90;
    this.fire = false;
    this.firing = false;
    this.step = this.step.bind(this);
  }

  _createClass(Ship, [{
    key: "radians",
    value: function radians(deg) {
      return deg * (Math.PI / 180);
    }
  }, {
    key: "step",
    value: function step() {
      var x = this.calculateX();
      var y = this.calculateY();
      this.boardX = this.boardX + this.hSpeed;
      this.boardY = this.boardY + this.vSpeed;
      this.x = x;
      this.y = y;
    }
  }, {
    key: "fireEngine",
    value: function fireEngine() {
      this.updateVSpeed(0.009);
      this.updateHSpeed(0.009);
    }
  }, {
    key: "updateVSpeed",
    value: function updateVSpeed(force) {
      this.vSpeed -= force * Math.cos(this.radians(this.angle));
    }
  }, {
    key: "updateHSpeed",
    value: function updateHSpeed(force) {
      this.hSpeed -= force * Math.sin(this.radians(this.angle));
    }
  }, {
    key: "gravityChange",
    value: function gravityChange() {
      this.vSpeed += this.gravity;
    }
  }, {
    key: "calculateX",
    value: function calculateX() {
      //for x axis
      var offset = Math.cos(this.radians(this.angle));
      var result = offset * this.hSpeed; //for y axis

      var offsetY = Math.sin(this.radians(this.angle)) * -1;
      return this.x + offsetY * this.vSpeed + result;
    }
  }, {
    key: "calculateY",
    value: function calculateY() {
      //for x axis
      var offset = Math.sin(this.radians(this.angle));
      var result = offset * this.hSpeed; //for y axis

      var offsetY = Math.cos(this.radians(this.angle));
      return this.y + offsetY * this.vSpeed + result;
    }
  }, {
    key: "keyAction",
    value: function keyAction(e, deg) {
      var offsetX = this.x + 30 / 2;
      var offsetY = this.y + 30 / 2;
      this.ctx.translate(offsetX, offsetY);

      if (e.code === "ArrowRight" && this.angle < 90) {
        this.ctx.rotate(-10 * Math.PI / 180);
        this.angle += 10;
      }

      if (e.code === "ArrowLeft" && this.angle > -90) {
        this.ctx.rotate(10 * Math.PI / 180);
        this.angle -= 10;
      }

      if (deg) {
        this.ctx.rotate(-deg * Math.PI / 180);
      }

      if (e.code === "Space") {
        this.firing = true;
        this.fire = true;
      }

      this.ctx.translate(-1 * offsetX, -1 * offsetY);
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      window.onkeydown = this.keyAction;

      window.onkeyup = function (e) {
        if (e.code === "Space") {
          _this.fire = false;
          _this.firing = false;
        }
      };

      this.gravityChange();
      this.ctx.clearRect(this.x - 10, this.y - 10, _app__WEBPACK_IMPORTED_MODULE_0__["height"], _app__WEBPACK_IMPORTED_MODULE_0__["width"]);
      this.drawStats();

      if (this.fire) {
        var shipFiring = document.getElementById("ship-firing");
        this.ctx.drawImage(shipFiring, this.x + 10, this.y + 25, 10, 10);
        this.fuel -= 10;
      }

      if (this.firing) {
        this.fireEngine();
      }

      var ship = document.getElementById("ship");
      this.ctx.drawImage(ship, this.x, this.y, 30, 30);
    }
  }, {
    key: "drawStats",
    value: function drawStats() {
      var ctx = this.statsCtx;
      var text = this.textCtx;
      debugger;
      ctx.beginPath();
      ctx.lineWidth = "1";
      ctx.strokeStyle = "white";
      ctx.fillStyle = "black";
      ctx.rect(window.innerWidth * 0.865, 30, 160, 90);
      ctx.fill();
      ctx.stroke();
      text.clearRect(window.innerWidth * 0.865, 30, 160, 90);
      text.beginPath();
      text.font = "normal 13px Arial ";
      text.fillStyle = "grey";
      text.lineWidth = "1";
      text.textAlign = "right";
      console.log(this.vSpeed);
      text.fillText("Horizontal Speed: ".concat(Math.ceil(this.hSpeed * 100)), window.innerWidth * 0.955, 60);
      text.fillText("Vertical Speed: ".concat(Math.ceil(this.vSpeed * 100)), window.innerWidth * 0.955, 80);
      text.fillText("Fuel: ".concat(Math.ceil(this.fuel)), window.innerWidth * 0.955, 100);
    }
  }]);

  return Ship;
}();



/***/ }),

/***/ "./src/surface.js":
/*!************************!*\
  !*** ./src/surface.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Surface; });
/* harmony import */ var _point__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./point */ "./src/point.js");
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app */ "./src/app.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var Surface =
/*#__PURE__*/
function () {
  function Surface(options) {
    _classCallCheck(this, Surface);

    this.width = options.width;
    this.height = options.height;
    this.gravity = options.gravity;
    this.generateGrid();
    this.ctx = options.ctx;
    this.render();
    this.ceiling = this.height * 0.3;
    this.floor = this.height * 0.9;
    this.points = [];
    this.generateRandom();
    this.insertStars();
  }

  _createClass(Surface, [{
    key: "render",
    value: function render() {
      this.ctx.fillRect(0, 0, _app__WEBPACK_IMPORTED_MODULE_1__["width"], _app__WEBPACK_IMPORTED_MODULE_1__["height"]);
      this.ctx.fillStyle = 'black';
    }
  }, {
    key: "generateGrid",
    value: function generateGrid() {
      var grid = [];

      for (var i = 0; i < this.height; i++) {
        grid.push([]);

        for (var j = 0; j < this.width; j++) {
          grid[i].push(new _point__WEBPACK_IMPORTED_MODULE_0__["default"]([j, i]));
        }
      }

      this.grid = grid;
    }
  }, {
    key: "collisionHappened",
    value: function collisionHappened(sX, sY) {
      var fX;
      var fY;
      var lX;
      var lY;

      for (var i = 0; i < this.points.length; i++) {
        if (this.points[i][0] > sX) {
          lX = this.points[i][0];
          lY = this.points[i][1];
          fX = this.points[i - 1][0];
          fY = this.points[i - 1][1];
          break;
        }
      }

      var dx = lX - fX;
      var dY = lY - fY;

      if (dY <= 0) {
        //going up
        if (sY > fY) {
          return true;
        } else if (sY < lY) {
          return false;
        }
      }

      if (dY > 0) {
        if (sY > lY) {
          return true;
        } else if (sY < fY) {
          return false;
        }
      }

      var sxP = (sX - fX) / dx;
      var syP = (fY - sY) / dY;

      if (syP === 0 && sxP === 0) {
        return true;
      }

      if (Math.abs(syP) > sxP) {
        if (dY > 0) {
          return true;
        }

        return false;
      }

      if (dY > 0) {
        return false;
      }

      return true;
    }
  }, {
    key: "insertStars",
    value: function insertStars() {
      var _this = this;

      this.grid.forEach(function (row) {
        row.forEach(function (point) {
          if (Math.floor(Math.random() * 7000) === 1) {
            if (!_this.collisionHappened(point.x, point.y)) {
              point.star = true;
            }
          }
        });
      });
      this.grid.forEach(function (row, y) {
        row.forEach(function (el, x) {
          if (el.star === true) {
            _this.ctx.beginPath();

            _this.ctx.arc(x, y, 1, 0, 2 * Math.PI);

            _this.ctx.fillStyle = "white";

            _this.ctx.fill();
          }
        });
      });
    }
  }, {
    key: "generateRandom",
    value: function generateRandom() {
      "4 bonus, 3 flat, 3hills, 2 mountain";

      var _this2 = this;

      var draws = {
        flat: 'flat',
        bonus: 'flatBonus',
        hill: ['hill', 'valley'],
        mountain: ['mountain', 'fall']
      };
      var randAr = [];
      [1, 2].forEach(function (i) {
        randAr.push(draws.bonus);
      });
      [1, 2].forEach(function (i) {
        randAr.push(draws.flat);
      });
      [1, 2].forEach(function (i) {
        randAr.push(draws.hill);
      });
      [1, 2, 3].forEach(function (i) {
        randAr.push(draws.mountain);
      });
      randAr = randAr.concat(randAr);
      randAr = this.shuffle(randAr);
      randAr.unshift(draws.hill);
      randAr = randAr.flat();
      this.ctx.beginPath();
      this.ctx.strokeStyle = "white";
      this.ctx.lineWidth = 0.5;
      var startCoords = [0, this.floor];
      randAr.forEach(function (action) {
        startCoords = _this2.draw(startCoords, action);
      });
      this.ctx.stroke();
      this.ctx.save();
    }
  }, {
    key: "shuffle",
    value: function shuffle(a) {
      for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var _ref = [a[j], a[i]];
        a[i] = _ref[0];
        a[j] = _ref[1];
      }

      return a;
    }
  }, {
    key: "draw",
    value: function draw(begin, type) {
      var xStart = begin[0];
      var yStart = begin[1];
      var newX = xStart + 1;
      var newY = yStart; //----modifiable random generator parameters

      var yRand;
      var yPeak;
      var length;
      var xEnd;
      var xTravel;
      var yFloor; //----modifiable random generator parameters

      switch (type) {
        case 'flat':
          yRand = {
            max: 2,
            type: 0
          };
          yPeak = {
            max: 40,
            type: 1
          };
          yFloor = {
            max: 20,
            type: -1
          };
          length = 0.03 * this.width;
          xEnd = xStart + length;
          xTravel = Math.round(length * 0.6);
          break;

        case 'flatBonus':
          yRand = {
            max: 2,
            type: 0
          };
          yPeak = {
            max: 40,
            type: -1
          };
          yFloor = {
            max: 20,
            type: -1
          };
          length = Math.round(0.01 * this.width);
          xEnd = xStart + length;
          xTravel = Math.round(length * 0.6);
          break;

        case 'valley':
          yRand = {
            max: 20,
            type: 1
          };
          yPeak = {
            max: 5,
            type: 1
          };
          yFloor = {
            max: 20,
            type: -1
          };
          length = Math.round(0.04 * this.width);
          xEnd = xStart + length;
          xTravel = Math.round(length * 0.15);
          break;

        case 'hill':
          yRand = {
            max: 20,
            type: -1
          };
          yPeak = {
            max: 5,
            type: 1
          };
          yFloor = {
            max: 20,
            type: -1
          };
          length = Math.round(0.02 * this.width);
          xEnd = xStart + length;
          xTravel = Math.round(length * 0.08);
          break;

        case 'mountain':
          yRand = {
            max: 150,
            type: -1
          };
          yPeak = {
            max: 20,
            type: 1
          };
          yFloor = {
            max: 20,
            type: -1
          };
          length = Math.round(0.08 * this.width);
          xEnd = xStart + length;
          xTravel = Math.round(length * 0.15);
          break;

        case 'fall':
          yRand = {
            max: 150,
            type: 1
          };
          yPeak = {
            max: 20,
            type: 1
          };
          yFloor = {
            max: 20,
            type: -1
          };
          length = Math.round(0.04 * this.width);
          xEnd = xStart + length;
          xTravel = Math.round(length * 0.15);
          break;
      }

      while (true) {
        this.drawToCoords([xStart, yStart], [newX, newY]);

        if (newX >= xEnd) {
          return [newX, newY];
        }

        xStart = newX;
        yStart = newY;
        newY = newY + this.randomNum(yRand);

        while (newY < this.ceiling) {
          newY = newY + this.randomNum(yPeak);
        }

        while (newY > this.floor) {
          newY = newY + this.randomNum(yFloor);
        }

        newX = newX + xTravel;
      }
    }
  }, {
    key: "randomNum",
    value: function randomNum(options) {
      var num = Math.floor(Math.random() * options.max) + 1;

      if (options.type === 0) {
        num *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
      } else if (options.type === -1) {
        num *= -1;
      }

      return num;
    }
  }, {
    key: "pointOn",
    value: function pointOn(x, y) {
      return this.grid[y][x];
    }
  }, {
    key: "drawToCoords",
    value: function drawToCoords(from, to) {
      var ctx = this.ctx;
      var fromX = from[0];
      var fromY = from[1];
      var toX = to[0];
      var toY = to[1]; // ctx.beginPath();

      this.points.push([fromX, fromY]);
      ctx.moveTo(fromX, fromY);
      ctx.lineTo(toX, toY);
    }
  }]);

  return Surface;
}();



/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map