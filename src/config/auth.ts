import { User } from "@models/User";
import * as pass from "passport-local"
import {getRepository} from 'typeorm'

const LocalStrategy = pass.Strategy

export function pp (passport) {
    passport.use(new LocalStrategy({ usernameField: 'login', passwordField: 'password' }, (login: string, password: string, done) => {
        getRepository(User).createQueryBuilder('user')
            .where('user.login = :login', {login: login})
            .getOne().then((user: User)=>{
                if (!user) {
                    return done(null, false, { message: 'This account does not exist' });
                }
                if (password !== user.password) {
                    return done(null, false, { message: 'Incorrect Password' });
                } else {
                    return done(null, user);
                }
            }).catch((err) => {
                return done(err);
            });
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id: number, done) => {
        getRepository(User).findOne(id).then((user: User) => {
            done(null, user);
        })
        .catch((err) => {
            done(err, null);
        });
    });
}