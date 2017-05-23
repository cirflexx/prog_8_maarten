/// <reference path="wheel.ts"/>
/// <reference path="gameobject.ts" />


class Car extends gameobject {
    public behaviour : Behaviour;

    public speed: number;
    public div: HTMLElement;
    public wheel1: Wheel;
    public wheel2: Wheel;

    constructor(parent: HTMLElement) {
        super(parent, "car");
        this.startPosition(0,220);

        this.behaviour = new Off(this);

        this.speed = 2;

        this.wheel1 = new Wheel(this.div, 3);
        this.wheel2 = new Wheel(this.div, 101);

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e));
    }


    private onKeyDown(e: KeyboardEvent) {
        console.log(e.key);
        switch(e.keyCode){
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
    }

    public draw(): void {
        if(this.y < 0){
            this.behaviour = new DrivingDown(this);
        }
        if(this.x > 675){
            this.speed = -1;
            this.x += this.speed;
        }
        if(this.x < 0){
            this.behaviour = new Driving(this);
        }
        if(this.y > 550){
            this.behaviour = new DrivingUp(this);
        }
        
        // if car is crashed, end game;
        // if(Car crashed){
        //    let g : Game = Game.getInstance();
        //    g.endGame();
        // }

        this.behaviour.draw();

        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
        this.wheel1.draw();
        this.wheel2.draw();
    } 
    


}