class Crashing implements Behaviour {
    
    car:Car;
    private jumpDirection: number;
    constructor(c:Car){
        this.car = c;
        this.jumpDirection = -3;
    }
    draw(){
        this.car.wheel1.speed = -2;
            this.car.wheel2.speed = 2;
            this.car.div.classList.add("crashed");

            // gameOver functie van game aanroepen via singleton
            document.getElementById("plateau").classList.add("animationpaused");
            document.getElementById("sky").classList.add("animationpaused");
    }
    onKeyDown(){
        
    }
}


