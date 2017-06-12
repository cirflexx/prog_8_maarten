class Wheel implements Observer {

    private div:HTMLElement;
    private x:number;
    public y:number;

    private car:Car;
    

    // new wheel

    public speed:number;
                        
    constructor(parent:HTMLElement, offset:number, c:Car) {
        this.div = document.createElement("wheel");
        parent.appendChild(this.div);

        this.x = offset;
        this.y = 20;
        this.speed = 0;
        this.car = c;
        this.car.subscribe(this);
    }

    public notify():void {
        this.speed = 2;
        console.log("test");
    }

    public draw():void {
        this.x += this.speed;
        this.div.style.transform ="translate("+this.x+"px, "+this.y+"px)";
    }
}