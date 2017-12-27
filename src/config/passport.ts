import * as passport from "passport";
import * as FacebookTokenStrategy from "passport-facebook-token";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { User, Provider } from "../models/";
import getEnv from "../helpers/env";

const GoogleTokenStrategy = require("passport-google-token");

// TODO: definir avatar
/**
 * Google Strategy
 */
passport.use(new FacebookTokenStrategy({
    clientID: getEnv("FACEBOOK_APP_ID"),
    clientSecret: getEnv("FACEBOOK_APP_SECRET"),
    profileFields: ["id", "email", "name", "link", "location", "picture"]
}, async (accessToken, refreshToken, profile, done) => {
    let provider;
    try {
        provider = await Provider.findOne({ where: { type: "facebook", externalId: profile.id }});
    } catch (err) {
        return done(err, false);
    }

    if (provider) {
        return done(null, provider.userId);
    }

    const newUser = await User.create({ name: profile.name.givenName, email: profile.emails[0].value});            

    const newProvider = await Provider.create({
        type: "facebook", 
        externalId: profile.id,
        externalToken: accessToken,
        userId: newUser.id
    });
    
    done(null, newUser.id);
}));

/**
 * Google Strategy
 */
// TODO: definir avatar
passport.use(new GoogleTokenStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
}, async (accessToken: any, refreshToken: any, profile: any, done: any) => {
    let provider;
    try {
        provider = await Provider.findOne({ where: { type: "google", externalId: profile.id } });
    } catch (err) {
        return done(err, false);
    }

    if (provider) {
        return done(null, provider.userId);
    }

    const newUser = await User.create({ name: profile.displayName, email: profile.emails[0].value });

    const newProvider = await Provider.create({
        type: "google",
        externalId: profile.id,
        externalToken: accessToken,
        userId: newUser.id
    });

    done(null, newUser.id);
}));

/**
 * JWT Strategy
 */
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
    issuer: "accounts.examplesoft.com",
    audience: "yoursite.net"
}, async (jwt_payload, done) => {
    let user;

    try {
        user = await User.findById(jwt_payload.id);
    } catch (err) {
        return done(err, false);
    }
        
    if (user) {
        return done(null, user);
    } else {
        return done(null, false);
    }
}));
