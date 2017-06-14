Link: https://xdbullit.github.io/prog_8_maarten/

De typscript code is te vinden in de dev folder.

### Singleton:
In game.ts wordt er een instance gemaakt van de game, daardoor is die in alle bestand aanspreekbaar.
Zo wordt deze aangesproken in track.ts en oil.ts 
Ook in car om de game te eindigen.

### Observer:
De observerable is de Car, De wielen zijn de observers. Als de Car crasht krijgen de wielen een notificatie d.m.v. van notify()

### Namespaces:
De namespaces gebruik ik voor verduidelijking van de code. Zo heb ik het gebruikt voor de behaviours van de car. Elk behaviour heeft een namespace drive, met daar achter zijn eigen speciefieke functie. Zo staat er duidelijk in de code, Drive.Forward. 

### Polymorphism:
Track en oil worden in de gameobjects array gestopt. Hierdoor kan in de game 1 for loop gemaakt worden. Waarna de functie van hitcar uitgevoerd wordt van oil en track.

### Enumeraties:
De enumeraties slaan de key codes op, zo kan ik in de code duidelijk maken om welke key het gaat ipv alleen het nummer staat er nu keys.up 

### Abstract:
Gameobject.ts en util.ts zijn een abstracte class. Zo kan ik nooit een instance maken van gameobject.

### Static:
De game instance is static, zo kan het in elk bestand aangeroepen worden.
Ook de util functies zijn static, deze kunnen ook in elk bestand aangeroepen worden.

### Gameloop:
De gameloop wordt aangemaakt en aangeroepen in game.ts

### Inheritance: 
Car en track erven de div,x en y positie van gameobject.ts
De functie draw wordt geërfd in alle gameobjects. De functie hitcar alleen bij de track en de oil.

### Composition:
De Car en Wheel maken gebruik van composition.

### Encapsulation:
Ik maak gebruik van private,protected en public. In game.ts bijvoorbeeld is te zien dat de functie spawnobject private is, en dus alleen maar in de game aangeroepen kan worden. Public is de instance van de game, zo kan de functie endgame overal aangeroepen worden.
Gameobject.ts maakt gebruik van protected startposition(). Zo kunnen alleen de classen erbij die overerven van gameobject.

### Strategy:
De car heeft verschillende behaviours, de behaviour.ts is een interface die wordt aangeroepen door strategy calls. 
Zo heeft de car de volgende behaviours:
-Forward
-Down
-Reverse
-Up
-off
-speedUp

UML: http://imgur.com/PtvGWds
UML_week7: http://imgur.com/362vwyJ

### Installatie instructies:

Open typescript en open de folder van dit bestand. 
Om te testen open de folder docs op uw localhost.(vergeet niet in visual studio code te compileren)
