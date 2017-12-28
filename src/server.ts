var dotenv = require("dotenv");

// Handling cases where .env does not exist
try {
    dotenv.config();
} catch (err) {
    console.log(err);
}

import * as express from "express";
import { Request, Response, NextFunction } from "express";
import * as fs from "fs";
import * as bodyParser from "body-parser";
import * as multer from "multer";
import * as passport from "passport";
import * as cors from "cors";
import sequelize from "./sequelize";
import getEnv from "./helpers/env";

/**
 * Controllers
 */

import * as fileController from "./controllers/file";
import * as userController from "./controllers/user";

const app = express();
const api = express.Router();
var cwd = process.cwd();

var upload = multer({ dest: cwd + '/temporary_files' });

// var SESSION_SECRET = process.env.SESSION_SECRET || 'mySecretKey';
var NODE_ENV = getEnv("NODE_ENV") || 'development';
var PORT = getEnv("PORT") || 5020;

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

api.get('/_status', (req: Request, res: Response) => {
    res.status(200).json({ 'ok': true });
});

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

api.get('/me');
api.post('/users/login/facebook', passport.authenticate('facebook-token'), userController.loginFacebook);
api.post('/users/login/google', passport.authenticate('google-token'), userController.loginGoogle);

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