import * as pass from "passport-local"

const LocalStrategy = pass.Strategy

export function pp (passport) {
    passport.use(new LocalStrategy({ usernameField: 'username', passwordField: 'password' }, (username, password, done) => {

    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        // knex('sbr_users').where({ id }).first()
            // .then((user) => {
            //     done(null, user);
            // })
            // .catch((err) => {
            //     done(err, null);
            // });
    });
}

// .then((user) => {
//     if (!user) {
//         return done(null, false, { message: 'This account does not exist' });
//     }
//     if (!password == user.password) {
//         return done(null, false, { message: 'Incorrect Password' });
//     } else {
//         return done(null, user);
//     }
// })
//     .catch((err) => {
//         return done(err);
//     });