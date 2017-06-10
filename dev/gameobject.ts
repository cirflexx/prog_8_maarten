class gameobject {

    public div : HTMLElement;
    public x : number;
    public y : number;
    public width: number;
    public height: number;

    constructor(tagname:HTMLElement,divname:string){
        
        this.div = document.createElement(divname);
        tagname.appendChild(this.div);
    }

    protected startPosition(PosX:number,PosY:number){
       this.x = PosX;
       this.y = PosY;

        // div location
        this.div.style.transform = "translate("+this.x+"px, "+this.y+"px)";
   }
    
}


