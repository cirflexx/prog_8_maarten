class drivingReverse implements Behaviour {
    
    car:Car;
    
    constructor(c:Car){
        this.car = c;
        console.log("reverse");
        this.car.speed = -3;
    }
    draw(){
        this.car.x += this.car.speed;
    }
    onKeyDown(){
        
    }
}