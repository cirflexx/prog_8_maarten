namespace Drive {
export class Reverse implements Behaviour {
    
    private car:Car;
    
    constructor(c:Car){
        this.car = c;
        this.car.speed = -3;
    }
    draw(){
        this.car.x += this.car.speed;
    }
    onKeyDown(){
        
    }
}
}