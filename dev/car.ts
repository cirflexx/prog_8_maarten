/// <reference path="wheel.ts"/>
/// <reference path="gameobject.ts" />
/// <reference path="enum.ts" />

class Car extends gameobject implements Subject {
    public behaviour : Behaviour;

    public observers:Array<Observer> = new Array<Observer>();


    public speed: number;
    public div: HTMLElement;
    public wheel1: Wheel;
    public wheel2: Wheel;
    private crashValue: boolean;

    constructor(parent: HTMLElement) {
        super(parent, "car");
        this.startPosition(0,225);

        this.width = 145;
        this.height = 45;

        this.behaviour = new Drive.Off(this);

        this.speed = 2;

        this.wheel1 = new Wheel(this.div, 3,this);
        this.wheel2 = new Wheel(this.div, 101,this);
            
        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e));

    }

    private onKeyDown(e: KeyboardEvent) {
        switch(e.keyCode){
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
    }

    public draw(): void {
        if(this.y < 0){
            this.behaviour = new Drive.Down(this);
        }
        if(this.x > 675){
            this.behaviour = new Drive.Reverse(this);
        }
        if(this.x < 0){
            this.behaviour = new Drive.Forward(this);
        }
        if(this.y > 550){
            this.behaviour = new Drive.Up(this);
        }


        this.behaviour.draw();
        
        
        if(this.crashValue){
            for (let o of this.observers){
                    o.notify();
                }
            TweenLite.to(this.div, 3, {x:1000, y:200, rotation: 600});
             setTimeout(()=> this.removeCar(),2000);
        }
        
        else{
           super.draw();
        }

        this.wheel1.draw();
        this.wheel2.draw();
    } 

    public crash(): void {
        console.log("crash");
        this.crashValue = true;
    }

    private removeCar(): void{
        console.log("remove");
        this.div.remove();
        let g = Game.getInstance();
        g.endGame();
    }

    subscribe(o:Observer){
        this.observers.push(o);
    }

    unsubscribe(o:Observer){
        
    }
}