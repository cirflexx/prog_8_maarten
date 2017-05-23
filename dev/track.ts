class Track extends gameobject {

    public speed:number;
    public div:HTMLElement;
    public parent:HTMLElement;

    public removeMe:boolean;
            
    constructor(parent:HTMLElement) {
        super(parent,"block");
        this.startPosition(Math.random() * window.innerWidth+200,Math.random() * window.innerHeight);
        this.speed = -5;
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
        //this.parent = document.getElementById("container");
        //this.parent.removeChild(this.div);
    }

}