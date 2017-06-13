class Track extends gameobject {

    public speed: number;
    public div: HTMLElement;
    public parent: HTMLElement;
    

    constructor(parent: HTMLElement) {
        super(parent, "block");
        this.x = window.innerWidth + 700;
        this.y = 45 * Math.ceil(Math.random() * 10);
        // this.startPosition(Math.random() * window.innerWidth+200,45 * Math.random()* 10);
        this.speed = -5;
        this.width = 626;
        this.height = 45;
    }

    public draw(): void {
        this.x += this.speed;
        if (this.x < 0 - this.width) {
            Util.removeFromGame((this), Game.getInstance().gameobjects);
        }
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
    }

    public hitCar(c: Car) {
        Util.removeFromGame((this), Game.getInstance().gameobjects);
        Game.getInstance().reduceLife();
        
    }
}