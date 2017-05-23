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

    private spawnObject(): void {
        this.tracks.push(new Track(this.container));
        console.log("test");
    } 

    private gameLoop(){
        
        this.spawnCounter ++;
        if(this.spawnCounter > 180){ 
            this.spawnObject();
            this.spawnCounter = 0; 
        }
        this.updateElements(); 
        this.car.draw();
        requestAnimationFrame(() => this.gameLoop());
    }

    private updateElements(): void {
        
        for (var t of this.tracks) {
            if (t.removeMe) {
                var i = this.tracks.indexOf(t);
                this.tracks.splice(i, 1);
            }
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