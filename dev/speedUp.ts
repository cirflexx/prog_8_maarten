class speedUp implements Behaviour {
    
    private car:Car;

    constructor(c:Car){
        this.car = c;
    
    }
    draw(){
        this.car.speed = 5;
        this.car.x += this.car.speed;
    }

    onKeyDown(){
        
    }

}







