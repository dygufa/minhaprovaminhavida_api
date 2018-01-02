# Minha prova, minha vida (MPMV) API

MPMV API uses Node.js, Typescript, Express and Postgres to help college students to find study material like exams from previous years.

[![Build Status](https://travis-ci.org/dygufa/minhaprovaminhavida_api.svg?branch=master)](https://travis-ci.org/dygufa/minhaprovaminhavida_api)

## Using

### Response 

The response from the API is formatted as:

```
{
    ok: boolean
    data: any | Error
} 

Error {
    error: string
    msg: string
}
```

In case of success the API will return a 200 HTTP Code along with the "ok" parameter defined as true. In case of error the HTTP code will be the one that best fit the situation, "ok" will be false and "data" will return an object with the error name and the message related to the error.

### Endpoints

All the comunication is encoded using JSON (`application/json`), except for the endpoint `POST /files` that uses `multipart/form-data` in order to handle the file upload.

URL | Content-Type | Data | Success Response |
--- | --- | --- | ---
GET /files | - | - | File[]
GET /files/:id | - | - | File
POST /files | `multipart/form-data` | Keys: i) json: containing a `NewFile` JSON object; ii) files: the files to be uploaded. | File
DELETE /files/:id | - | - | -
GET /universities | - | - | BasicUniversity[]
GET /universities/:id | - | - | University
POST /universities | `application/json` | `NewUniversity` | University
DELETE /universities/:id | - | - | -
GET /courses | - | - | Course[]
GET /courses/:id | - | - | Course
POST /courses | `application/json` | `NewCourse` | Course
DELETE /courses/:id | - | - | -
GET /users/me | - | - | User
POST /users/login/facebook | `application/json` | `{ access_token: string }` | JWTAndUser
POST /users/login/google | `application/json` | `{ access_token: string }` | JWTAndUser

### Types


#### NewCourse
```
NewCourse {
    id: number
    name: string
    code: string
    universityId: number
}
```
#### Course
```
Course {
    id: number
    name: string
    code: string
}
```

#### NewUniversity
```
NewUniversity {
    name: string
    acronym: string
}
```
#### BasicUniversity
```
BasicUniversity {
    id: number
    name: string
    acronym: string
}
```

#### University
```
University {
    id: number
    name: string
    acronym: string
    courses: Course[]
}
```

#### User
```
User {
    id: number
    name: string
    email: string
    avatar: string
}
```
#### PublicUser
```
PublicUser {
    id: number
    name: string
    email: string
    avatar: string
}
```

#### JWTAndUser
```
JWTAndUser {
    jwt: string
    user: User
}
```

#### File
```
File {
    id: number
    name: string
    file: string
    createdAt: Date 
    type: "exam" | "test"
    course: Course
    university: BasicUniversity
    user: PublicUser
}
```

#### NewFile
```
NewFile {
    name: string
    file: Blob File
    type: "exam" | "test"
    universityId: string
    courseId: string
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
2. ~~Implement sessions with JWT;~~
3. ~~Implement file upload;~~
4. Add user roles;
5. Add location related data to university;
6. PUT methods;
7. Allow administrator to review files before making it public;
8. Implement virus verification on the files before making it public using [clamscan](https://www.npmjs.com/package/clamscan);
