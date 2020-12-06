import { User } from 'src/app/models/User';
import { Controller } from '@decorators/Controller'
import qs from 'qs';
import Util from '@utils/Utils';
import axios from "axios";
import { Authorization } from '@models/Authorization';
import { getRepository } from 'typeorm';

@Controller('/consent')
export class ConsentController {

    public async index(user: User) {

        if (typeof(user) == undefined) {
            return false;
        }
        if (typeof(user.authorizationToken) != undefined && user.authorizationToken != null) {
            if (user.authorizationToken.expireAt < new Date()) {
                return true;
            }
        }

        const dataAuth = qs.stringify({
            scope: 'accounts',
            grant_type: 'client_credentials'
        });

        let request = axios.post('https://gw-dev.obiebank.banfico.com/obie-aisp/v3.1/aisp/account-access-consents', 
            dataAuth,
            {
                headers: {
                    "Content-Type": "application/json",
                    "x-fapi-financial-id": "ISCREDIT"
            }
        })

        const {data} = await request;

        const {access_token} = data;

        let auth: Authorization = new Authorization();

        auth.accessToken = access_token;
        auth.user = user

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