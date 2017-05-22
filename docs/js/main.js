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
var Car = (function () {
    function Car(parent) {
        var _this = this;
        this.div = document.createElement("car");
        parent.appendChild(this.div);
        this.behaviour = new Off(this);
        this.speed = 2;
        this.x = 0;
        this.y = 220;
        this.wheel1 = new Wheel(this.div, 3);
        this.wheel2 = new Wheel(this.div, 101);
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
    }
    Car.prototype.onKeyDown = function (e) {
        console.log(e.key);
        switch (e.keyCode) {
            case 66:
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
        this.behaviour.draw();
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
        this.wheel1.draw();
        this.wheel2.draw();
    };
    return Car;
}());
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
        this.tracks.push(new Track(this.container, Math.random() * window.innerWidth, Math.random() * window.innerHeight));
        console.log("test");
    };
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.spawnCounter++;
        if (this.spawnCounter > 60) {
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
var Track = (function () {
    function Track(parent, xpos, ypos) {
        this.div = document.createElement("block");
        parent.appendChild(this.div);
        this.speed = -5;
        this.x = xpos;
        this.y = ypos;
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
}());
//# sourceMappingURL=main.js.map