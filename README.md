# Minha prova, minha vida (MPMV) API

MPMV API was developed using Node.js, Typescript, Express and Postgres to help college students to find study material like exams from previous years. It uses JSON to exchange data.

## Using

### Response 

The response from the API is formatted as:

```
{
    ok: boolean
    data: any | Error
} 

Error {
    code: number
    msg: string
}
```

In case of success the API will return a 200 HTTP Code and "ok" will be true. In case of error the HTTP code will be the one that best fit the situation, "ok" will be false and "data" will return an object with the code and message related to the error.

### Endpoints

URL | Data | Success Response |
--- | --- | ---
GET /files | - | File[]
GET /files/:id | - | File
POST /files | NewFile | File
DELETE /files:id | - | -



### Types

#### File
```
File {
    id: number
    name: string
    file: string
    createdAt: Date 
    type: "exam" | "test"
    course: {
        id: string
        name: string
    }
    university: {
        id: string
        name: string
        acronym: string
    }
    user: {
        id: string
        name: string
    } | null
}
```

#### NewFile
```
NewFile {
    name: string
    file: Blob File
    type: "exam" | "test"
    course: {
        id: string
        name: string
    } | string
    university: {
        id: string
        name: string
        acronym: string
    } | string
    user: {
        id: string
        name: string
    } | string
}
```

## Development

### Requirements:

* Node.js
* Postgres
* AWS Account

### Get the code:
```
git clone https://github.com/dygufa/minhaprovaminhavida_api.git
cd minhaprovaminhavida_api
yarn
```

### Define the environment variables

In order to run this webserver you need to define the `.env` file using the `.env.example`:

```
cp .env.example .env
nano .env
```

### Commands:

- `yarn dev` will start a express webserver (mpmv.js) using nodemon and a tsc --watch instance to auto compile on file change. The port can be defined on the `.env` file.

## Todos (by priority)

1. ~~Convert code to ES6 (babel + gulp);~~
2. Implement sessions with JWT;
3. Allow administrator to review files before making it public;
4. Implement virus verification on the files before making it public using [clamscan](https://www.npmjs.com/package/clamscan);
