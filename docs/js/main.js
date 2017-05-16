var Block = (function () {
    function Block(parent) {
        this.div = document.createElement("block");
        parent.appendChild(this.div);
        this.speed = -4;
        this.x = 800;
        this.y = 240;
    }
    Block.prototype.draw = function () {
        this.x += this.speed;
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
    };
    return Block;
}());
var Wheel = (function () {
    function Wheel(parent, offset) {
        this.div = document.createElement("wheel");
        parent.appendChild(this.div);
        this.x = offset;
        this.y = 30;
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
        this.behaviour = new Driving(this);
        this.speed = 2;
        this.x = 0;
        this.y = 220;
        this.wheel1 = new Wheel(this.div, 20);
        this.wheel2 = new Wheel(this.div, 100);
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
    }
    Car.prototype.onKeyDown = function (e) {
        console.log(e.key);
        this.behaviour.onKeyDown();
    };
    Car.prototype.draw = function () {
        this.behaviour.draw();
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
        this.wheel1.draw();
        this.wheel2.draw();
    };
    return Car;
}());
var CarSwitch = (function () {
    function CarSwitch(parent) {
        var _this = this;
        this.div = document.createElement("car");
        parent.appendChild(this.div);
        this.state = 1;
        this.speed = 2;
        this.jumpDirection = -3;
        this.x = 0;
        this.y = 220;
        this.wheel1 = new Wheel(this.div, 20);
        this.wheel2 = new Wheel(this.div, 100);
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
    }
    CarSwitch.prototype.onKeyDown = function (e) {
        if (this.state == 1) {
            this.state = 2;
        }
    };
    CarSwitch.prototype.draw = function () {
        switch (this.state) {
            case 1:
                this.driving();
                break;
            case 2:
                this.jumping();
                break;
            case 3:
                this.crashing();
                break;
        }
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
        this.wheel1.draw();
        this.wheel2.draw();
    };
    CarSwitch.prototype.driving = function () {
        this.x += this.speed;
    };
    CarSwitch.prototype.jumping = function () {
        this.x += this.speed;
        this.y += this.jumpDirection;
        if (this.y < 140)
            this.jumpDirection = 3;
        if (this.y > 217)
            this.state = 3;
    };
    CarSwitch.prototype.crashing = function () {
        this.wheel1.speed = -2;
        this.wheel2.speed = 2;
        this.div.classList.add("crashed");
        document.getElementById("plateau").classList.add("animationpaused");
        document.getElementById("sky").classList.add("animationpaused");
    };
    return CarSwitch;
}());
var Crashing = (function () {
    function Crashing(c) {
        this.car = c;
        this.jumpDirection = -3;
    }
    Crashing.prototype.draw = function () {
        this.car.wheel1.speed = -2;
        this.car.wheel2.speed = 2;
        this.car.div.classList.add("crashed");
        document.getElementById("plateau").classList.add("animationpaused");
        document.getElementById("sky").classList.add("animationpaused");
    };
    Crashing.prototype.onKeyDown = function () {
    };
    return Crashing;
}());
var Driving = (function () {
    function Driving(c) {
        this.car = c;
    }
    Driving.prototype.draw = function () {
        this.car.x += this.car.speed;
    };
    Driving.prototype.onKeyDown = function () {
        this.car.behaviour = new Jumping(this.car);
    };
    return Driving;
}());
var Game = (function () {
    function Game() {
        var _this = this;
        var container = document.getElementById("container");
        this.car = new Car(container);
        this.block = new Block(container);
        requestAnimationFrame(function () { return _this.gameLoop(); });
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.car.draw();
        this.block.draw();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    return Game;
}());
window.addEventListener("load", function () {
    var g = new Game();
});
var Jumping = (function () {
    function Jumping(c) {
        this.car = c;
        this.jumpDirection = -3;
    }
    Jumping.prototype.draw = function () {
        this.car.x += this.car.speed;
        this.car.y += this.jumpDirection;
        if (this.car.y < 140)
            this.jumpDirection = 3;
        if (this.car.y > 217) {
            this.car.behaviour = new Crashing(this.car);
        }
    };
    Jumping.prototype.onKeyDown = function () {
    };
    return Jumping;
}());
//# sourceMappingURL=main.js.map