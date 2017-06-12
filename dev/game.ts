class Game {

    private car : Car;
    private track : Track;
    private tracks : Array<Track> = new Array<Track>();

    private container : HTMLElement;
    private score : number = 0;

    private static instance: Game;

    private spawnCounter : number = 0;
    private end: boolean = false;

    public lives: number = 1;

    constructor() {
        this.container = document.getElementById("container");
        this.car = new Car(this.container);

        document.getElementById("lives").innerHTML = "lives: " + this.lives.toString();
        document.getElementById("score").innerHTML = "Score: " + this.score.toString();
        // this.track = new Track(this.container,);
        requestAnimationFrame(() => this.gameLoop());
    }

    public static getInstance() {
    if (! Game.instance) {
    Game.instance = new Game();
    }
    return Game.instance;
    }

    private gameLoop(){

        this.spawnCounter ++;
        if(this.spawnCounter > 180){ 
            this.tracks.push(new Track(this.container));
            this.spawnCounter = 0; 
            this.score ++;
            document.getElementById("score").innerHTML = "Score: " + this.score.toString();
        }

        this.updateElements(); 
        this.car.draw();

        for(let t of this.tracks){
            if(t.x < 0 - t.width){
                Util.removeFromGame(t, this.tracks);
            }
            if(Util.checkCollision(this.car,t)){
                Util.removeFromGame(t, this.tracks);
                this.lives --;
                if(this.lives == -1){
                this.car.crash();
        }

                document.getElementById("lives").innerHTML = "Levens: " + this.lives.toString();
            }            
        }        
            if(this.end){
                console.log("stop");
            }
            else{
                requestAnimationFrame(() => this.gameLoop());
            }
            
        
    }

    private updateElements(): void {
        
        for (var t of this.tracks) {
                t.draw();
        }
    }

    public endGame(){
        this.end = true;
    }
}

// load
window.addEventListener("load", function() {
    let g = Game.getInstance();
});

