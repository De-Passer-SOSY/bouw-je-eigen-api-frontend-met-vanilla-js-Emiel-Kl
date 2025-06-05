## 1. Wat is het onderwerp

Deze applicatie beheert een lijst van wereldkampioenen schaken. 
Gebruikers kunnen kampioenen bekijken, toevoegen, bewerken en verwijderen via een eenvoudige frontend. 
De gegevens worden opgeslagen in een database en zijn bereikbaar via een REST API. 
Swagger-documentatie is beschikbaar.

## 2. Het opstarten van de backend
    1. installeer de Node.js dependencies
* type - npm install - in de terminal


    2. start de server
* open de correcte map met - cd backend - in de terminal.

* type - node app.js - om de sever te starten.


## 3. Welke endpoints zijn er
    1. GET 'http://localhost:3333/chessChampions'
* Geeft een lijst van alle schaakkampioenen terug.


    2. GET 'http://localhost:3333/chessChampion/:id'
* Haalt één kampioen op via ID.


    3. POST 'http://localhost:3333/newChessChampion'
* Voegt een nieuwe kampioen toe. Vereist `naam`, `nationaliteit`, `jaar` om een nieuwe speler toe te voegen.


    4. PUT	'http://localhost:3333/updateChessChampion/:id'
* Wijzigt een bestaande kampioen op basis van ID. Vereist alle velden.


    5. DELETE	'http://localhost:3333/deleteChessChampion/:id'
* Verwijdert een kampioen op basis van ID.


    6. GET	'http://localhost:3333/api-docs'
* Swagger UI met documentatie van alle endpoints.


## 4.werking van de frontend

De frontend is een eenvoudige webpagina waarmee je gegevens van schaakkampioenen beheert. Deze communiceert met de backend via HTTP-verzoeken.

### Functies:
#### Gegevens ophalen `function fetchChampions()`
Haalt de lijst van kampioenen op via een GET-verzoek naar /chessChampions en toont deze in een tabel, gesorteerd op jaar.

#### Toevoegen van een kampioen `function handleFormSubmit(e)`
Toont een formulier waarmee een nieuwe kampioen wordt toegevoegd via een POST-verzoek naar /newChessChampion.

#### Bewerken van een kampioen `function editChampion(id)`
Laadt bestaande gegevens in het formulier bij klikken op de wijzig-knop. Het bijwerken gebeurt via een PUT-verzoek naar /updateChessChampion/:id.

#### Verwijderen van een kampioen `function deleteChampion(id)`
Verstuurt een DELETE-verzoek naar /deleteChessChampion/:id bij klikken op de verwijderknop.

#### Meldingen tonen `function showAlert(message, type = 'success')`
Bij elke actie toont de interface kort een statusmelding (bv. toegevoegd, gewijzigd, verwijderd).