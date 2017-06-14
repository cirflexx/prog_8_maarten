var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Wheel = (function () {
    function Wheel(parent, offset, c) {
        this.div = document.createElement("wheel");
        parent.appendChild(this.div);
        this.x = offset;
        this.y = 20;
        this.speed = 0;
        this.car = c;
        this.car.subscribe(this);
    }
    Wheel.prototype.notify = function () {
        this.speed = 2;
        console.log("test");
    };
    Wheel.prototype.draw = function () {
        this.x += this.speed;
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    return Wheel;
}());
var gameobject = (function () {
    function gameobject(tagname, divname) {
        this.div = document.createElement(divname);
        tagname.insertBefore(this.div, tagname.firstChild);
    }
    gameobject.prototype.startPosition = function (PosX, PosY) {
        this.x = PosX;
        this.y = PosY;
    };
    gameobject.prototype.draw = function () {
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    gameobject.prototype.hitCar = function (c) {
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
        this.observers = new Array();
        this.startPosition(0, 225);
        this.width = 145;
        this.height = 45;
        this.behaviour = new Drive.Off(this);
        this.speed = 2;
        this.wheel1 = new Wheel(this.div, 3, this);
        this.wheel2 = new Wheel(this.div, 101, this);
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
    }
    Car.prototype.onKeyDown = function (e) {
        switch (e.keyCode) {
            case Keys.Shift:
                this.behaviour = new Drive.speedUp(this);
                break;
            case Keys.Right:
                this.behaviour = new Drive.Forward(this);
                break;
            case Keys.Up:
                this.behaviour = new Drive.Up(this);
                break;
            case Keys.Down:
                this.behaviour = new Drive.Down(this);
                break;
            case Keys.Left:
                this.behaviour = new Drive.Reverse(this);
                break;
        }
        this.behaviour.onKeyDown(e);
    };
    Car.prototype.draw = function () {
        var _this = this;
        if (this.y < 0) {
            this.behaviour = new Drive.Down(this);
        }
        if (this.x > 675) {
            this.behaviour = new Drive.Reverse(this);
        }
        if (this.x < 0) {
            this.behaviour = new Drive.Forward(this);
        }
        if (this.y > 550) {
            this.behaviour = new Drive.Up(this);
        }
        this.behaviour.draw();
        if (this.crashValue) {
            for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
                var o = _a[_i];
                o.notify();
            }
            TweenLite.to(this.div, 3, { x: 1000, y: 200, rotation: 600 });
            setTimeout(function () { return _this.removeCar(); }, 2000);
        }
        else {
            _super.prototype.draw.call(this);
        }
        this.wheel1.draw();
        this.wheel2.draw();
    };
    Car.prototype.crash = function () {
        console.log("crash");
        this.crashValue = true;
    };
    Car.prototype.removeCar = function () {
        console.log("remove");
        this.div.remove();
        var g = Game.getInstance();
        g.endGame();
    };
    Car.prototype.subscribe = function (o) {
        this.observers.push(o);
    };
    Car.prototype.unsubscribe = function (o) {
    };
    return Car;
}(gameobject));
var Game = (function () {
    function Game() {
        var _this = this;
        this.gameobjects = new Array();
        this.score = 0;
        this.spawnCounter = 0;
        this.end = false;
        this.lives = 1;
        this.container = document.getElementById("container");
        this.car = new Car(this.container);
        document.getElementById("lives").innerHTML = "lives: " + this.lives.toString();
        document.getElementById("score").innerHTML = "Score: " + this.score.toString();
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
            this.gameobjects.push(new Track(this.container), new Oil(this.container));
            this.spawnCounter = 0;
            this.updateScore(1);
        }
        this.car.draw();
        for (var _i = 0, _a = this.gameobjects; _i < _a.length; _i++) {
            var go = _a[_i];
            go.draw();
            if (Util.checkCollision(this.car, go)) {
                go.hitCar(this.car);
            }
        }
        if (!this.end) {
            requestAnimationFrame(function () { return _this.gameLoop(); });
        }
    };
    Game.prototype.reduceLife = function () {
        this.lives--;
        if (this.lives == -1) {
            this.car.crash();
        }
        document.getElementById("lives").innerHTML = "Levens: " + this.lives.toString();
    };
    Game.prototype.updateScore = function (n) {
        this.score += n;
        document.getElementById("score").innerHTML = "Score: " + this.score.toString();
    };
    Game.prototype.endGame = function () {
        this.end = true;
    };
    return Game;
}());
window.addEventListener("load", function () {
    var g = Game.getInstance();
});
var Oil = (function (_super) {
    __extends(Oil, _super);
    function Oil(parent) {
        _super.call(this, parent, "oil");
        this.x = window.innerWidth + 700;
        this.y = 45 * Math.ceil(Math.random() * 10);
        this.speed = -5;
        this.width = 250;
        this.height = 250;
    }
    Oil.prototype.draw = function () {
        this.x += this.speed;
        if (this.x < 0 - this.width) {
            Util.removeFromGame((this), Game.getInstance().gameobjects);
        }
        _super.prototype.draw.call(this);
    };
    Oil.prototype.hitCar = function (c) {
        c.behaviour = new Drive.speedUp(c);
        console.log("hitoil");
    };
    return Oil;
}(gameobject));
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
        if (this.x < 0 - this.width) {
            Util.removeFromGame((this), Game.getInstance().gameobjects);
        }
        _super.prototype.draw.call(this);
    };
    Track.prototype.hitCar = function (c) {
        Util.removeFromGame((this), Game.getInstance().gameobjects);
        Game.getInstance().reduceLife();
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
var Drive;
(function (Drive) {
    var Down = (function () {
        function Down(c) {
            this.car = c;
            this.jumpDirection = +45;
        }
        Down.prototype.draw = function () {
            this.car.x += this.car.speed;
            this.car.y += this.jumpDirection;
            if (this.car.y > 0) {
                this.jumpDirection = 0;
            }
        };
        Down.prototype.onKeyDown = function () {
        };
        return Down;
    }());
    Drive.Down = Down;
})(Drive || (Drive = {}));
var Drive;
(function (Drive) {
    var Forward = (function () {
        function Forward(c) {
            this.car = c;
            this.car.speed = 4;
        }
        Forward.prototype.draw = function () {
            this.car.x += this.car.speed;
        };
        Forward.prototype.onKeyDown = function () {
        };
        return Forward;
    }());
    Drive.Forward = Forward;
})(Drive || (Drive = {}));
var Drive;
(function (Drive) {
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
                    this.car.behaviour = new Drive.Forward(this.car);
                    break;
            }
        };
        return Off;
    }());
    Drive.Off = Off;
})(Drive || (Drive = {}));
var Drive;
(function (Drive) {
    var Reverse = (function () {
        function Reverse(c) {
            this.car = c;
            this.car.speed = -3;
        }
        Reverse.prototype.draw = function () {
            this.car.x += this.car.speed;
        };
        Reverse.prototype.onKeyDown = function () {
        };
        return Reverse;
    }());
    Drive.Reverse = Reverse;
})(Drive || (Drive = {}));
var Drive;
(function (Drive) {
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
    Drive.speedUp = speedUp;
})(Drive || (Drive = {}));
var Drive;
(function (Drive) {
    var Up = (function () {
        function Up(c) {
            this.car = c;
            this.jumpDirection = -45;
        }
        Up.prototype.draw = function () {
            this.car.x += this.car.speed;
            this.car.y += this.jumpDirection;
            if (this.car.y > 0) {
                this.jumpDirection = 0;
            }
        };
        Up.prototype.onKeyDown = function () {
        };
        return Up;
    }());
    Drive.Up = Up;
})(Drive || (Drive = {}));
//# sourceMappingURL=main.js.map