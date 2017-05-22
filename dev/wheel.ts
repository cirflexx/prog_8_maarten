class Wheel {

    private div:HTMLElement;
    private x:number;
    public y:number;
    

    // new wheel

    public speed:number;
                        
    constructor(parent:HTMLElement, offset:number) {
        this.div = document.createElement("wheel");
        parent.appendChild(this.div);

        this.x = offset;
        this.y = 20;
        this.speed = 0;
    }


    public draw():void {
        this.x += this.speed;
        this.div.style.transform ="translate("+this.x+"px, "+this.y+"px)";
    }
}