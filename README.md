<h1 align="center">
🌐 MERN Stack
</h1>
<p align="center">
MongoDB, Expressjs, React, Nodejs
</p>

> MERN is a fullstack implementation in MongoDB, Expressjs, React, Nodejs.

MERN stack is the idea of using Javascript/Node for fullstack web development.

## clone or download

```terminal
$ git clone https://github.com/Najmul-Islam/mern-boilerplate.git
$ npm i
```

## project structure

```terminal
backend
    /config
        /db.js
    /controllers
        /index.js
    /middlewares
        /errorMiddleware.js
    /models
        /index.js
    /routes
        /index.js
    server.js
frontend
    /public
    /src
        /components
            /Home.jsx
        /pages
            /Home.jsx
        App.js
        index.js
        package.json
        README.md
.env
    NODE_ENV=development
    PORT=5000
    MONGO_URI=your mongo uri gose to here
.gitignore
package-lock.json
package.json
README.md
...
```

# Usage (run fullstack app on your machine)

## Prerequisites

- [MongoDB](https://gist.github.com/nrollr/9f523ae17ecdbb50311980503409aeb3)
- [Node](https://nodejs.org/en/download/) ^10.0.0
- [npm](https://nodejs.org/en/download/package-manager/)

## Client-side usage(PORT: 3000)

```terminal
$ cd frontend   // go to frontend folder
$ npm i       // npm install packages
```

## Server-side usage(PORT: 5000)

```terminal
run the script at the first level:

(You need to add a .env file and add NODE_ENV=development PORT=5000 MONGO_URI=your mongo uri gose to here  to connect to MongoDB)

### Start
go to root folder
$ npm i             // npm install packages
$ npm run server    // run only backend
$ npm run client    // run only frontend
$ npm run dev       // run backend and forntend concurrently
```
