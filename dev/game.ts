class Game {

    private car: Car;
    private track: Track;

    private oil: Oil;
    private gameobject: gameobject;
    public gameobjects: Array<gameobject> = new Array<gameobject>();

    private container: HTMLElement;
    private score: number = 0;

    private static instance: Game;

    private spawnCounter: number = 0;
    private end: boolean = false;

    private lives: number = 1;

    constructor() {
        this.container = document.getElementById("container");
        this.car = new Car(this.container);
        
        document.getElementById("lives").innerHTML = "lives: " + this.lives.toString();
        document.getElementById("score").innerHTML = "Score: " + this.score.toString();
        requestAnimationFrame(() => this.gameLoop());
    }

    public static getInstance() {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    }

    private gameLoop() {

        this.spawnCounter++;
        if (this.spawnCounter > 180) {

            this.gameobjects.push(new Track(this.container), new Oil(this.container));
            this.spawnCounter = 0;
            this.updateScore(1);
        }

        this.car.draw();

        for (let go of this.gameobjects) {
            go.draw();

            if (Util.checkCollision(this.car, go)) {
                go.hitCar(this.car);
            }
        }

        if (!this.end) {
            requestAnimationFrame(() => this.gameLoop());
        }
    }

    public reduceLife() {
        this.lives--;
        if (this.lives == -1) {
            this.car.crash();
        }
        document.getElementById("lives").innerHTML = "Levens: " + this.lives.toString();
    }

     public updateScore(n:number) {
        this.score += n;
        document.getElementById("score").innerHTML = "Score: " + this.score.toString();
    }

    public endGame() {
        this.end = true;
    }
}

// load
window.addEventListener("load", function () {
    let g = Game.getInstance();
});

