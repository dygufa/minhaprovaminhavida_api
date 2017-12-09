var dotenv = require('dotenv').config();

import * as express from "express";
import { Request, Response, NextFunction } from "express";
import * as fs from "fs";
import * as bodyParser from "body-parser";
import * as multer from "multer";
import * as passport from "passport";
import * as cors from "cors";
import sequelize from "./sequelize";

/**
 * Controllers
 */

import * as fileController from "./controllers/file";
import * as userController from "./controllers/user";

const app = express();
const api = express.Router();
var cwd = process.cwd();

var upload = multer({ dest: cwd + '/temporary_files' });

var SESSION_SECRET = process.env.SESSION_SECRET || 'mySecretKey';
var NODE_ENV = process.env.NODE_ENV || 'development';
var PORT = process.env.PORT || 5020;

app.use(express.static(cwd + '/browser/build'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var auth = function (req: Request, res: Response, next: NextFunction) {
    next();
    // if (!req.isAuthenticated()) {
    //     res.status(401).send({ error: [{ message: 'Você precisa estar logado para fazer esta operação.' }] });
    // } else {
    //     next();
    // }
};

api.get('/files', fileController.getFiles);
api.get('/files/:id', fileController.getFile);
api.post('/files', auth, upload.array("uploads[]", 12), fileController.postFile);
api.delete('/files/:id', fileController.deleteFile);

// api.get('/courses', controllers.courses.getIndex);
// api.post('/courses', controllers.courses.addCourse);
// api.delete('/courses/:id', controllers.courses.removeCourse);

// api.get('/universities', controllers.universities.getIndex);
// api.post('/universities', controllers.universities.addUniversity);
// api.delete('/universities/:id', controllers.universities.removeUniversity);

// api.get('/users/isLogged', controllers.users.isLogged);
// api.get('/users/logout', controllers.users.logout);
// api.get('/users/login/facebook', controllers.users.loginFacebook(passport));
// api.get('/users/login/facebook/callback', controllers.users.loginFacebookCallback(passport));

app.use('/v1', api);

/**
 * Only starts to listen the respective port after the initialization of the connection with the database.
 */
sequelize.sync().then(() => {
    app.listen(PORT, (err: any) => {
        if (err) {
            console.error(err);
        } else {
            console.log('App is ready at : ' + PORT);
        }
    })
});