class Driving implements Behaviour {
    
    car:Car;
    Behaviour:Behaviour;
    
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