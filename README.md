# warcraft-scraper-tools
scrape warcraft game data and allocate them to PostgreSQL database

## SETUP

1. Create an .env file and input your own credentials from this template
```
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_HOST=
POSTGRES_PORT=
BNETID=
BNETSECRET=
```

2. Create a database in PostgreSQL called `warcraft`

3. Create two tables

warcraft_connected_realms
| name        | type     |
| ---         | ---      |
| realm_id    | integer  |
| name        | varchar  |
| connected_id| integer |

warcraft_items
| name        | type     |
| ---         | ---      |
| id          | integer  |
| name        | varchar  |

## How to run

run the command `node scrapers/<file name>`
