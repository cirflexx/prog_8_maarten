var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Wheel = (function () {
    function Wheel(parent, offset) {
        this.div = document.createElement("wheel");
        parent.appendChild(this.div);
        this.x = offset;
        this.y = 20;
        this.speed = 0;
    }
    Wheel.prototype.draw = function () {
        this.x += this.speed;
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    return Wheel;
}());
var gameobject = (function () {
    function gameobject(tagname, divname) {
        this.div = document.createElement(divname);
        tagname.appendChild(this.div);
    }
    gameobject.prototype.startPosition = function (PosX, PosY) {
        this.x = PosX;
        this.y = PosY;
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    return gameobject;
}());
var Keys;
(function (Keys) {
    Keys[Keys["Shift"] = 16] = "Shift";
    Keys[Keys["Up"] = 38] = "Up";
    Keys[Keys["Down"] = 40] = "Down";
    Keys[Keys["Left"] = 37] = "Left";
    Keys[Keys["Right"] = 39] = "Right";
})(Keys || (Keys = {}));
var Car = (function (_super) {
    __extends(Car, _super);
    function Car(parent) {
        var _this = this;
        _super.call(this, parent, "car");
        this.startPosition(0, 225);
        this.width = 145;
        this.height = 45;
        this.behaviour = new Off(this);
        this.speed = 2;
        this.wheel1 = new Wheel(this.div, 3);
        this.wheel2 = new Wheel(this.div, 101);
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
    }
    Car.prototype.onKeyDown = function (e) {
        switch (e.keyCode) {
            case Keys.Shift:
                this.behaviour = new speedUp(this);
                break;
            case Keys.Right:
                this.behaviour = new Driving(this);
                break;
            case Keys.Up:
                this.behaviour = new DrivingUp(this);
                break;
            case Keys.Down:
                this.behaviour = new DrivingDown(this);
                break;
            case Keys.Left:
                this.behaviour = new drivingReverse(this);
                break;
        }
        this.behaviour.onKeyDown(e);
    };
    Car.prototype.draw = function () {
        if (this.y < 0) {
            this.behaviour = new DrivingDown(this);
        }
        if (this.x > 675) {
            this.speed = -1;
            this.x += this.speed;
        }
        if (this.x < 0) {
            this.behaviour = new Driving(this);
        }
        if (this.y > 550) {
            this.behaviour = new DrivingUp(this);
        }
        this.behaviour.draw();
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
        this.wheel1.draw();
        this.wheel2.draw();
    };
    return Car;
}(gameobject));
var Driving = (function () {
    function Driving(c) {
        this.car = c;
        this.car.speed = 4;
    }
    Driving.prototype.draw = function () {
        this.car.x += this.car.speed;
    };
    Driving.prototype.onKeyDown = function () {
    };
    return Driving;
}());
var DrivingDown = (function () {
    function DrivingDown(c) {
        this.car = c;
        this.jumpDirection = +45;
    }
    DrivingDown.prototype.draw = function () {
        this.car.x += this.car.speed;
        this.car.y += this.jumpDirection;
        if (this.car.y > 0) {
            this.jumpDirection = 0;
        }
    };
    DrivingDown.prototype.onKeyDown = function () {
    };
    return DrivingDown;
}());
var drivingReverse = (function () {
    function drivingReverse(c) {
        this.car = c;
        this.car.speed = -3;
    }
    drivingReverse.prototype.draw = function () {
        this.car.x += this.car.speed;
    };
    drivingReverse.prototype.onKeyDown = function () {
    };
    return drivingReverse;
}());
var DrivingUp = (function () {
    function DrivingUp(c) {
        this.car = c;
        this.jumpDirection = -45;
    }
    DrivingUp.prototype.draw = function () {
        this.car.x += this.car.speed;
        this.car.y += this.jumpDirection;
        if (this.car.y > 0) {
            this.jumpDirection = 0;
        }
    };
    DrivingUp.prototype.onKeyDown = function () {
    };
    return DrivingUp;
}());
var Game = (function () {
    function Game() {
        var _this = this;
        this.tracks = new Array();
        this.spawnCounter = 0;
        this.container = document.getElementById("container");
        this.car = new Car(this.container);
        requestAnimationFrame(function () { return _this.gameLoop(); });
    }
    Game.getInstance = function () {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    };
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.spawnCounter++;
        if (this.spawnCounter > 180) {
            this.tracks.push(new Track(this.container));
            this.spawnCounter = 0;
        }
        this.updateElements();
        this.car.draw();
        for (var _i = 0, _a = this.tracks; _i < _a.length; _i++) {
            var t = _a[_i];
            if (t.x < 0 - t.width) {
                Util.removeFromGame(t, this.tracks);
            }
            if (Util.checkCollision(this.car, t)) {
                console.log("CRASH");
            }
        }
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.updateElements = function () {
        for (var _i = 0, _a = this.tracks; _i < _a.length; _i++) {
            var t = _a[_i];
            t.draw();
        }
    };
    Game.prototype.endGame = function () {
    };
    return Game;
}());
window.addEventListener("load", function () {
    var g = Game.getInstance();
});
var Off = (function () {
    function Off(c) {
        this.car = c;
    }
    Off.prototype.draw = function () {
        this.car.speed = 0;
        ;
    };
    Off.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case 39:
                this.car.behaviour = new Driving(this.car);
                break;
        }
    };
    return Off;
}());
var speedUp = (function () {
    function speedUp(c) {
        this.car = c;
    }
    speedUp.prototype.draw = function () {
        this.car.speed = 5;
        this.car.x += this.car.speed;
    };
    speedUp.prototype.onKeyDown = function () {
    };
    return speedUp;
}());
var Track = (function (_super) {
    __extends(Track, _super);
    function Track(parent) {
        _super.call(this, parent, "block");
        this.x = window.innerWidth + 700;
        this.y = 45 * Math.ceil(Math.random() * 10);
        this.speed = -5;
        this.width = 626;
        this.height = 45;
    }
    Track.prototype.draw = function () {
        this.x += this.speed;
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
    };
    return Track;
}(gameobject));
var Util = (function () {
    function Util() {
    }
    Util.checkCollision = function (go1, go2) {
        return (go1.x < go2.x + go2.width &&
            go1.x + go1.width > go2.x &&
            go1.y < go2.y + go2.height &&
            go1.height + go1.y > go2.y);
    };
    Util.removeFromGame = function (go, arr) {
        go.div.remove();
        var i = arr.indexOf(go);
        if (i != -1) {
            arr.splice(i, 1);
        }
    };
    return Util;
}());
//# sourceMappingURL=main.js.map