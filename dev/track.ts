class Track {

    public speed:number;
    public div:HTMLElement;
    public x:number;
    public y:number;

    public removeMe:boolean;
            
    constructor(parent:HTMLElement, xpos:number, ypos:number) {
        this.div = document.createElement("block");
        parent.appendChild(this.div);

        this.speed = -5;
        this.x = xpos;
        this.y = ypos; 
    }

    public draw():void {
        if(this.x > window.innerHeight+200){       
            this.removeFromGame();        
        }
        else{
            this.x += this.speed;
            this.div.style.transform ="translate("+this.x+"px,"+this.y+"px)";
        }
        
    }

    private removeFromGame(){
        this.removeMe = false;

        // remove of tracks not working yet.
        // parent.removeChild(this.div);
    }

}