import { User } from "@models/User";
import * as pass from "passport-local"
import { AuthorizationController } from "src/app/http/controllers/AuthorizationController";
import { getRepository } from 'typeorm'

const LocalStrategy = pass.Strategy

export function pp(passport) {
    passport.use(new LocalStrategy({ usernameField: 'login', passwordField: 'password' }, (login: string, password: string, done) => {
        getRepository(User).createQueryBuilder('USER')
            .where('USER.document = :login', { login: login })
            .orWhere('USER.email = :login', { login: login })
            .leftJoinAndSelect("USER.authorizationToken", "authorizationToken")
            .getOne().then(async (user: User) => {
                if (!user) {
                    return done(null, false, { message: 'This account does not exist' });
                }
                if (password !== user.password) {
                    return done(null, false, { message: 'Incorrect Password' });
                } else {

                    let authorizationController = new AuthorizationController();

                    let isAuth: boolean = await authorizationController.index(user);
                    
                    if (isAuth) {
                        return done(null, user, { message: 'Authenticated' });
                    } else {
                        return done(null, false, { message: 'Error when authenticating' });
                    }
                }
            }).catch((err) => {
                return done(err);
            });
    }));
    
    passport.serializeUser((user: User, done) => {
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