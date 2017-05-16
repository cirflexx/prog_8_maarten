class Jumping implements Behaviour {
    
    car:Car;
    private jumpDirection: number;
    constructor(c:Car){
        this.car = c;
        this.jumpDirection = -3;
    }
    draw(){
        this.car.x += this.car.speed;
        this.car.y += this.jumpDirection;
        if (this.car.y < 140) this.jumpDirection = 3;
        if (this.car.y > 217) {
            this.car.behaviour = new Crashing(this.car);
        }
    }
    onKeyDown(){
        
    }
}


