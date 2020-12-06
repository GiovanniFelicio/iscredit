import * as jwt from 'jsonwebtoken'
import btoa from 'btoa'

class Util{
    compare(a, b) {
        if (a.last_nom < b.last_nom) {
            return -1;
        }
        if (a.last_nom > b.last_nom) {
            return 1;
        }
        return 0;
    }

    generateBearerToken(secret: string): string {
        let token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            data: 'foobar'
          }, secret);

        return token;
    }

    generateBasicAuth(username:string, passowrd: string) {
        let join = username + ':' + passowrd;

        let token:string = 'Basic ' + btoa(join)

        return token;
    }
}

export default new Util();