## Run tasks

To run the dev server for your app, use:

```sh
npx nx serve statsMaraton
```

To create a production bundle:

```sh
npx nx build statsMaraton
```

## Funcionalidades principales

### Backend

API REST con CRUD de:

#### Ciudades
```
GET /ciudades

POST /ciudades

PUT /ciudades/:id

DELETE /ciudades/:id
```
#### Atletas
```
GET /atletas → devuelve atletas con nombre de ciudad

POST /atletas → valida que no se repita el DNI

PUT /atletas/:id

DELETE /atletas/:id
```