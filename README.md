Link: https://xdbullit.github.io/prog_8_maarten/


De typscript code is te vinden in de dev folder.

### Singleton:
In game.ts wordt er een instance gemaakt van de game, daardoor is die in alle bestand aanspreekbaar.

### Static:
De game instance is static, zo kan het in elk bestand aangeroepen worden.

### Inheritance: 
Car en track erven de div,x en y positie van gameobject.ts

### Composition:
De Car en Wheel maken gebruik van composition.

### Encapsulation:
Ik maak gebruik van private,protected en public. In game.ts bijvoorbeeld is te zien dat de functie spawnobject private is, en dus alleen maar in de game aangeroepen kan worden. Public is de instance van de game, zo kan de functie endgame overal aangeroepen worden.
Gameobject.ts maakt gebruik van protected startposition(). Zo kunnen alleen de classen erbij die overerven van gameobject.


### Strategy:
De car heeft verschillende behaviours, de behaviour.ts is een interface die wordt aangeroepen door strategy calls. 
Zo heeft de car de volgende behaviours:
-driving
-drivingDown
-drivingReverse
-drivingUp
-off
-speedUp

UML: http://imgur.com/PtvGWds

### Installatie instructies:

Open typescript en open de folder van dit bestand. 
Om te testen open de folder docs op uw localhost.(vergeet niet in visual studio code te compileren)