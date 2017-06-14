class Oil extends gameobject {

    public speed: number;
    public div: HTMLElement;
    public parent: HTMLElement;

    constructor(parent: HTMLElement) {
        super(parent, "oil");
        this.x = window.innerWidth + 700;
        this.y = 45 * Math.ceil(Math.random() * 10);
        // this.startPosition(Math.random() * window.innerWidth+200,45 * Math.random()* 10);
        this.speed = -5;
        this.width = 250;
        this.height = 250;
    }

    public draw(): void {
        this.x += this.speed;
        if (this.x < 0 - this.width) {
            Util.removeFromGame((this), Game.getInstance().gameobjects);
        }
        super.draw();

    }

    public hitCar(c: Car) {
        c.behaviour = new Drive.speedUp(c); 
        console.log("hitoil");
    }
}