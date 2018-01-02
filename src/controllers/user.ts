import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import getEnv from "../helpers/env";
import { User } from "../models/";
import { only } from "sanitize-object";

const _generateJWT = (payload: any) => {
    return jwt.sign(payload, getEnv("JWT_SECRET"));
}

const _sanitizeUser = (user: User) => {
    const sanitizer = only("name", "email", "id", "avatar");
    return sanitizer(user);
}

export let me = (req: Request, res: Response) => {
    res.send({
        ok: true,
        data: {
            user: _sanitizeUser(req.user)
        }
    });
};

export let loginFacebook = (req: Request, res: Response) => {
    const payload = _generateJWT({
        id: req.user.id
    });

    res.send({
        ok: true,
        data: {
            jwt: payload,
            user: _sanitizeUser(req.user)
        }
    });
};

export let loginGoogle = (req: Request, res: Response) => {
    const payload = _generateJWT({
        id: req.user.id
    });

    res.send({
        ok: true,
        data: {
            jwt: payload,
            user: _sanitizeUser(req.user)
        }
    });
};