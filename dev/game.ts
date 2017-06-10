class Game {

    private car : Car;
    private track : Track;
    private tracks : Array<Track> = new Array<Track>();
    private container : HTMLElement;

    private static instance: Game;

    private spawnCounter : number = 0;

    constructor() {
        this.container = document.getElementById("container");
        this.car = new Car(this.container);
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
        }
        this.updateElements(); 
        this.car.draw();

        for(let t of this.tracks){
            if(t.x < 0 - t.width){
                Util.removeFromGame(t, this.tracks);
            }
            if(Util.checkCollision(this.car,t)){
                console.log("CRASH");
            }            
        }        

        requestAnimationFrame(() => this.gameLoop());
    }

    private updateElements(): void {
        
        for (var t of this.tracks) {
                t.draw();
        }
    }

    public endGame(){
        // endgame
    }
}


// load
window.addEventListener("load", function() {
    let g = Game.getInstance();
});

