import { User } from 'src/app/models/User';
import { Controller } from '@decorators/Controller'
import qs from 'qs';
import Util from '@utils/Utils';
import axios from "axios";
import { Authorization } from '@models/Authorization';
import { getRepository } from 'typeorm';

@Controller('/authorization')
export class AuthorizationController {

    public async index(user: User) {

        if (typeof(user) == undefined) {
            return false;
        }

        let basicToken = Util.generateBasicAuth("PSDBR-NCA-ISCREDIT", "iscredit");

        const dataAuth = qs.stringify({
            scope: 'accounts',
            grant_type: 'client_credentials'
        });

        let request = axios.post('https://auth.obiebank.banfico.com/auth/realms/provider/protocol/openid-connect/token', 
            dataAuth,
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": basicToken
            }
        })

        const {data} = await request;

        const {access_token} = data;

        let auth: Authorization = new Authorization();

        let result = new Date(Date.now() - (1000*60*58.5*3));

        auth.accessToken = access_token;
        auth.user = user
        auth.expireAt = result

        auth = getRepository(Authorization).create(auth);
        
        auth = await getRepository(Authorization).save(auth)

        user.authorizationToken = auth;

        if (typeof(auth) != undefined){
            getRepository(User).save(user)
            return true;
        }

        return false;
    }
}