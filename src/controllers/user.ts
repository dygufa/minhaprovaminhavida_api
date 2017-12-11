import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import getEnv from "../helpers/env";

function generateJWT(payload: any) {
    return jwt.sign(payload, getEnv("JWT_SECRET"));
}

export let loginFacebook = (req: Request, res: Response) => {
    const payload = generateJWT({
        id: req.user
    });

    res.send({
        ok: true,
        data: {
            jwt: payload
        }
    });
};

export let loginGoogle = (req: Request, res: Response) => {
    const payload = generateJWT({
        id: req.user
    });

    res.send({
        ok: true,
        data: {
            jwt: payload
        }
    });
};