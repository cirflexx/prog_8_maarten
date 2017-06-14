abstract class Util {
    /**
     * deze formule rekent uit of twee gameobjecten elkaar overlappen
     */
    public static checkCollision(go1:gameobject, go2:gameobject):boolean {
        return (go1.x < go2.x + go2.width &&
                go1.x + go1.width > go2.x &&
                go1.y < go2.y + go2.height &&
                go1.height + go1.y > go2.y)
    }
    /**
     * verwijder een item uit een array, en verwijder meteen het dom element uit de body
     */
    public static removeFromGame(go:gameobject, arr:Array<any>){
        go.div.remove();
        let i:number = arr.indexOf(go);
        if(i != -1) {
            arr.splice(i, 1);
        }
    }
}