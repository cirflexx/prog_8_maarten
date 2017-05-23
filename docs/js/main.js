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
var Car = (function (_super) {
    __extends(Car, _super);
    function Car(parent) {
        var _this = this;
        _super.call(this, parent, "car");
        this.startPosition(0, 220);
        this.behaviour = new Off(this);
        this.speed = 2;
        this.wheel1 = new Wheel(this.div, 3);
        this.wheel2 = new Wheel(this.div, 101);
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
    }
    Car.prototype.onKeyDown = function (e) {
        console.log(e.key);
        switch (e.keyCode) {
            case 16:
                console.log("speedUp");
                this.behaviour = new speedUp(this);
                break;
            case 39:
                console.log("Driving");
                this.behaviour = new Driving(this);
                break;
            case 38:
                console.log("Drivingup");
                this.behaviour = new DrivingUp(this);
                break;
            case 40:
                console.log("DrivingDown");
                this.behaviour = new DrivingDown(this);
                break;
            case 37:
                console.log("DrivingDown");
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
        this.jumpDirection = +20;
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
        console.log("reverse");
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
        this.jumpDirection = -20;
    }
    DrivingUp.prototype.draw = function () {
        this.car.x += this.car.speed;
        this.car.y += this.jumpDirection;
        if (this.car.y > 0) {
            this.jumpDirection = 0;
        }
        console.log(this.car.y);
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
    Game.prototype.spawnObject = function () {
        this.tracks.push(new Track(this.container));
        console.log("test");
    };
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.spawnCounter++;
        if (this.spawnCounter > 180) {
            this.spawnObject();
            this.spawnCounter = 0;
        }
        this.updateElements();
        this.car.draw();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.updateElements = function () {
        for (var _i = 0, _a = this.tracks; _i < _a.length; _i++) {
            var t = _a[_i];
            if (t.removeMe) {
                var i = this.tracks.indexOf(t);
                this.tracks.splice(i, 1);
            }
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
        this.startPosition(Math.random() * window.innerWidth + 200, Math.random() * window.innerHeight);
        this.speed = -5;
    }
    Track.prototype.draw = function () {
        if (this.x > window.innerHeight + 200) {
            this.removeFromGame();
        }
        else {
            this.x += this.speed;
            this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
        }
    };
    Track.prototype.removeFromGame = function () {
        this.removeMe = false;
    };
    return Track;
}(gameobject));
//# sourceMappingURL=main.js.map