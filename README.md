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


## Review week 7 Joost
- Zet comments in de code. Hierdoor wordt het al gouw minder uitzoeken wat de code doet. Dit was niet zo erg in jouw code aangezien dit goed gestructureerd was, dus redelijk te lezen.
- Singleton - Dit is goed toegepast in elk van de aangegeven files.
- Observer - De implementatie is goed, alleen is het voordeel van een observer dat je iets kan versturen naar meerdere objecten als er iets gebeurd. Je had bijvoorbeeld oil en tracks slomer kunnen laten gaan voor een paar seconden. Dit gaat op dezelfde manier maar dan zet je de notifier van wheel naar oil en track.
- Namespaces - Erg duidelijk en goed toegepast in car.ts.
- Polymorfisme - Dit is goed toegepast. Het is duidelijk te zien dat je de draw en hitcar functies van beide objecten uit de array worden aangeroepen in 1 regel code.
- Enumeraties - Goed toegepast. Zonder naar de Readme te kijken wist ik precies wat elke key deed. Dit zou ik niet hebben gehad bij nummertjes (keyCodes).
- Abstract class - Je hebt een abstract class gebruikt als een beveiliging van de classes. Je kan namelijk geen instances maken van deze classes want dan krijg je een error. Hierdoor kan je geen onnodige fouten maken.
- Static class - Dit is ook op een goed manier toegepast.
- GameLoop - Dit is ook goed toegepast.
- Inhetirance - Car en track erft alleen de div niet van gameobject. Deze staat gewoon nog gedeclareerd bovenaan de classes en kan weg. Nu haalt hij gewoon div van zichzelf.
Draw wordt inderdaad gerft met de super() functie. Eigenlijk voegt dit niet veel toe aangezien hier maar 1 regel code in zit, dus de super kon je ook gewoon vervangen door deze regel code. In de toekomst als er meer code in het spel en in de gameobject draw() komt is dit een hele slimme implementatie. Hitcar is in gameobject leeg en staat in track en oil gewoon nog, dus daar is geen overerving.
- Composition - Dit is goed toegepast, er worden wheels in Car gemaakt en deze zitten aan de car vast.
- Encapsulation - In sommige files, zoals car.ts heb je properties die onnodig op public staan zoals speed en wheel. Deze worden alleen in car gebruikt en kunnen dus private worden.
- Strategy pattern - De strategy pattern is op de goede manier toegepast. De controls maken een nieuwe instance van bv. de MoveLeft behavior aan aan en in de update wordt de draw functie van elke movement behavior geupdated. Het spel voelt hier vloeiend door aan.
- Library - Dit was niet vermeld in je README maar het is wel te zien dat je Greensock hebt gebruikt voor animaties in je game. Zo heb je een animatie gemaakt die gaat draaien zodra je dood/ gecrashed bent. De implementatie van deze library was dus goed.
- Interface - Ook vergeten te melden in je README. Dit gebruikt i.v.m. de Strategy pattern. Er staat geen code in de Interface dus dit is goed geimplementeerd.
- UML - Je UML is duidelijk op een paar foutjes na. Zo staat er dan gameobject een game heeft, maar dit is natuurlijk andersom. Er staat ook een lijn met een battleje eraan van car naar de Interface Behavior, een battletje met rondje is niets. Het lijkt ook dat Utils en Enum geen connectie heeft met andere classes, maar game gebruikt Utils en Car gebruikt Enum. 


## Beoordeling
Voldoende

### Uitleg beoordeling
Elk onderdeel was goed uitgewerkt, sommige beter dan de andere. Soms zitten er kleine aandachtspunten of foutjes is die ik bij het onderdeel zelf heb geschreven. Deze aandachtspunten en foutjes zijn veelal klein en kan makkelijk verbeterd worden. Om deze reden heb ik je een voldoende gegeven, want de game draaide soepel zonder fouten en de code was ook goed gestructureerd, alleen comments mogen erbij.

Goed gedaan!



 
