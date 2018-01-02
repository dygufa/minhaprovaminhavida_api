const dotenv = require("dotenv");

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
import "./config/passport";

/**
 * Controllers
 */

import * as fileController from "./controllers/file";
import * as userController from "./controllers/user";
import * as universityController from "./controllers/university";
import * as courseController from "./controllers/course";

const app = express();
const api = express.Router();
var cwd = process.cwd();

var upload = multer({ dest: cwd + "/temporary_files" });

var NODE_ENV = getEnv("NODE_ENV") || "development";
var PORT = getEnv("PORT") || 5020;

app.use(express.static(cwd + "/browser/build"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(cors());

var auth = function (req: Request, res: Response, next: NextFunction) {
    passport.authenticate("jwt", { session: false }, function (err, user, info) {
        if (err) { 
            return res.status(500).json({
                ok: false,
                data: {
                    error: "internalError",
                    msg: "Erro interno no autenticador."
                }
            })
        }

        if (!user) { 
            return res.status(401).json({ 
                ok: false,
                data: {
                    error: "notAllowed", 
                    msg: "Você precisa estar logado para fazer esta operação." 
                } 
            });
        }

        req.user = user;
        next();
    })(req, res, next);
};

app.options('*', cors())
api.get("/_status", (req: Request, res: Response) => {
    res.status(200).json({ "ok": true });
});

api.get("/files", fileController.getFiles);
api.get("/files/:id", fileController.getFile);
api.post("/files", auth, upload.array("files", 10), fileController.postFile);
api.delete("/files/:id", fileController.deleteFile);

api.get("/courses", courseController.getCourses);
api.post("/courses", auth, courseController.addCourse);
api.delete("/courses/:id", auth, courseController.removeCourse);

api.get("/universities", universityController.getUniversities);
api.get("/universities/:id", universityController.getUniversity);
api.post("/universities", auth, universityController.addUniversity);
api.delete("/universities/:id", auth, universityController.removeUniversity);

api.get("/users/me", auth, userController.me);
api.post("/users/login/facebook", passport.authenticate("facebook-token", { session: false }), userController.loginFacebook);
api.post("/users/login/google", passport.authenticate("google-token", { session: false }), userController.loginGoogle);

app.use("/v1", api);

app.listen(PORT, (err: any) => {
    if (err) {
        console.error(err);
    } else {
        console.log("MPMV is ready at : " + PORT);
    }
});