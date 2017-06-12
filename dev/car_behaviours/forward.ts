namespace Drive {
    export class Forward implements Behaviour {
    
    private car:Car;
        
    constructor(c:Car){
        this.car = c;
        this.car.speed = 4;
    }
    draw(){
        this.car.x += this.car.speed;
    }
    onKeyDown(){
        
    }
}
}