# Registrering och Inloggning REST API

Denna repository innehåller koden för ett enkelt REST API byggt med Express, som möjliggör registrering och inloggning av användare. API:et hanterar användarautentisering med hjälp av JSON Web Tokens (JWT). Grundläggande funktionalitet för CRUD (Create, Read, Update, Delete) är implementerad för användare.

## Installation och Databas

API:et använder en MongoDB-databas för lagring av användarinformation. Följ dessa steg för att installera och köra API:et lokalt:

1. Klona detta repository till din lokala maskin.

2. Kör kommandot `npm install` för att installera alla nödvändiga npm-paket.

3. Konfigurera din `.env`-fil med nödvändiga miljövariabler för att ansluta till din MongoDB-databas och skapa en hemlig nyckel för att signera JWT. Se till att du har en MongoDB-databas igång.

4. Kör installations-skriptet `install.js` för att skapa de nödvändiga databastablerna.

## Användning

API:et kan nås med olika HTTP-metoder och ändpunkter för att utföra olika åtgärder. Nedan beskrivs hur man använder API:et:

| Metod | Ändpunkt      | Beskrivning                                          |
|-------|---------------|------------------------------------------------------|
| GET   | /api/users    | Hämtar alla användare                                |
| POST  | /api/register | Registrerar en ny användare. Kräver användarnamn och lösenord i begäran. |
| POST  | /api/login    | Loggar in en befintlig användare. Kräver användarnamn och lösenord i begäran. |
| PUT   | /api/users/:id | Uppdaterar lösenordet för en befintlig användare. Kräver användar-ID och nytt lösenord i begäran. |
| DELETE| /api/users/:id | Raderar en användare med angivet ID.                |

## Kursobjekt

Nedan är strukturen för ett objekt som returneras eller skickas i JSON-format:

```json
{
   "username": "Gustav",
    "password": "$2b$10$m.7RMpEfPNozp06sZXOoTeoUqSNmyN.vHadSOqiyCGqLC8znT87/O",
    "created": "2024-05-13T20:18:53.481Z",
    }

  