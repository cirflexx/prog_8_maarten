class Off implements Behaviour {
    
    private car:Car;
    
    constructor(c:Car){
        this.car = c;
    }
    draw(){
        this.car.speed = 0;;
    }
    onKeyDown(event:KeyboardEvent){
        switch(event.keyCode){
        case 39:            
            this.car.behaviour = new Driving(this.car);
            break;
        }
    }
}