/// <reference path="wheel.ts"/>
/// <reference path="gameobject.ts" />
/// <reference path="enum.ts" />

class Car extends gameobject {
    public behaviour : Behaviour;

    public speed: number;
    public div: HTMLElement;
    public wheel1: Wheel;
    public wheel2: Wheel;

    constructor(parent: HTMLElement) {
        super(parent, "car");
        this.startPosition(0,225);

        this.width = 145;
        this.height = 45;

        this.behaviour = new Off(this);

        this.speed = 2;

        this.wheel1 = new Wheel(this.div, 3);
        this.wheel2 = new Wheel(this.div, 101);

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e));
    }

    private onKeyDown(e: KeyboardEvent) {
        switch(e.keyCode){
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

        this.behaviour.draw();

        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
        this.wheel1.draw();
        this.wheel2.draw();
    } 
    


}