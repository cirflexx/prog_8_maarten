class DrivingUp implements Behaviour {
    
    private car:Car;
    private jumpDirection: number;
    constructor(c:Car){
        this.car = c;
        this.jumpDirection = -20;
    }
    draw(){
        this.car.x += this.car.speed;
        this.car.y += this.jumpDirection;
        if(this.car.y > 0){
            this.jumpDirection = 0;
        }
        console.log(this.car.y)     
    }
    onKeyDown(){
        
    }
}


