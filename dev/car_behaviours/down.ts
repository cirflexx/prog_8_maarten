namespace Drive {
export class Down implements Behaviour {
    
    private car:Car;
    private jumpDirection: number;
    constructor(c:Car){
        this.car = c;
        this.jumpDirection = +45;
    }
    draw(){
        this.car.x += this.car.speed;
        this.car.y += this.jumpDirection;
        if(this.car.y > 0){
            this.jumpDirection = 0;
        }
    
    }
    onKeyDown(){
        
    }
}
}


