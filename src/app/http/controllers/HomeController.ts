
import { User } from 'src/app/models/User';
import { Request, response, Response } from 'express';
import { HttpRequest } from '@models/decorators/HttpRequest';
import { Controller } from '@decorators/Controller'
import Auth from '@middlewares/auth';
import { getRepository } from 'typeorm';
import { Authorization } from '@models/Authorization';
import jwt from 'jsonwebtoken';
        import uuidv1 from 'uuid/v1';

@Controller('/')
export class HomeController {

    private privateKey:string = `-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCf/crE4dptc21t9IQ6q/QS/CNEVk6DezEp7p3UHpDV2Q8w/IdjDI4rEgGT+c93ijfq6rz50SUU6zZLCDbEj/7h/YYx7x1nlEUBmz14Q04IML5bucxhRXsr+cfBynAlbFeyrRW6iQf4ynvVrjBvyyfSL3DSggFNMZzJ3kR5nf6mLYeu3xjd9mbqVan9QJe0PcozX7FEO8ihYBAzd/zXLYJOM1sO9xZotyjR5psgGLh+Xz3cO2gyHtzKPlY2I8FjgxoGMJMlBN2sNA7ZIXDJWnZWyxR3Jd4RYSiQV/VLBOL/avXTOqt2eA03pD8d/X/hhJiAd14jQ0AYtGeJU9SaMgDNAgMBAAECggEAM4b2bjBbO9LoFHiiuY613gNsjE7LnJbpf5rFJBLwDJ+Kv/kk1WauxvpWncTf550RY0xUrpSIP9N9Oe8cTHQf38LaHGzpaHmdO+Y2huwOTp78P+h4BX/uKnyYtDYxpivdlsMd82S8t4jnFyuxl9+zJIN476NFLgpjd7RpE04qPHR8BsjvukOWvNRVvOGzcMU8ffoVBN4wNmvzcDwn1JQ3Lyq+tw2qhSxzCL6BfsiYh9j/W0+rMX/OQIJz5dIbpZ4f2FIw+yUIvWloyebbwiF15J762z6g7LufdBgr4bmM4ELg/Z1F9TxaVu+uq3mVxys5eW1YJe6/Nmu9Rgm+oDCU1QKBgQDmDj2kra4BP3TwUHdfDh/ixslBtah0ZVLFvEhVjbShDQsHwApbhbyJJRDTkY1HBczCDo15RDVbSCach6SZYJuQEVl1OQfywuk7By6omI/KrCM4ov2v2bf+JbuqxjGCHgTtB1P/RcLx836rhnWaJs14dvhFu0Ck7obkjj2qemmkQwKBgQCyCMezlTCHIze6w47wZ58k3Y8u0I2RIyyMVYvObfFL2UzuY1Upwb8ttjQ4/inv3uU8L02HSapkKkKn6OiJZVTZW4JVcV3pfKExfHIKSsGrue1f3vUtaZy4KvCDTnvmLUpqEAAZecE0Nh0XWyB/UVp9mhjFVWfzmuPh1GuN9MJ9rwKBgQCzNzjSRvKcykBgzW6QwEIaud0isU9PjXdTzv9Slpe2NqD3IqVu8toSxKs9BdBXGa+PJSMU6wvd1nEt04VobpgBPWLBLPKCLVDfyRKSCHdL3Zl6j46tJSBufhqaSNdck+ImfGT1IfVh4tw05wRKWBwM0jFKsTsEwUSYXC6x1bbiXQKBgECs799NU1PEd3phkIvFGQtLcbiQCt2u6YARk7hqOD5VspzneQiyWcFBb7dEnfeGAcDbbk63dC7vK0fUVKWVKj3MAI0JohQwMl7H1qXmgnTgFlu9o1PcChLdhoItANWdnmrpZR/cG1PcVLUnZaba5wS59kW5wQm+OwrPIENxpzYBAoGALoS0chN6GrgggST13N7PC1Rdd9KTzDF6uls03N8I/lPaKc73ExtJPE7AnO27qVWc6IlEZnrbWlfQamjQTCGPPXko2ncCpOGNn0RrGSxwdLuXQHyq8ey8YVx5ZtGMPe5CsEozEX+amxrMqLZDD4jmJmWDL1i3WVciBrkscCgti1c=\n-----END PRIVATE KEY-----`;

    @HttpRequest('get', '/', [Auth.isAuth])
    public async index(req: Request, res: Response) {                

        getRepository(User).findOne(req.user['id'])
            .then((user: User) => {
                let {id,name,email,document} = user;
                res.status(200).json({
                    id: id,
                    name: name,
                    email: email,
                    document: document
                });
            })
            .catch((err) => {
                res.status(500);
            });

    }

    @HttpRequest('get', 'user')
    public async findUser(req: Request, res: Response) {    

        let user = await getRepository(User)
                    .createQueryBuilder("USER")
                    .getMany();

        res.json(user);
    }

    @HttpRequest('get', 'autho')
    public async findAuths(req: Request, res: Response) {                

        let auth = await getRepository(Authorization)
                    .createQueryBuilder("AUTHORIZATION")
                    .getMany();
        res.json(auth);
    }

    @HttpRequest('get', 'teste')
    public teste(req:Request, res:Response) {        
        const appCallback = 'https://yourapplication.com/auth/callback';
        const getExp = (minutes = 60) => Math.floor(Date.now() / 1000) + (minutes * 60);
        const getClaims = (type: string,consentId: string) => ({
            userinfo: {
                openbanking_intent_id: {
                    value: `urn:obiebank:${type}:${consentId}`,
                    essential: true
                }
            },
            id_token: {
                openbanking_intent_id: {
                    value: `urn:obiebank:${type}:${consentId}`,
                    essential: true
                },
                acr: {
                    essential: true,
                    values: [
                        'urn:openbanking:psd2:sca',
                        'urn:openbanking:psd2:ca'
                    ]
                }
            }
        });
        const tokenSetup = (type: string,consentId: string) => ({
            algorithm: 'RS256',
            aud: 'https://auth.obiebank.banfico.com',
            responseType: 'code id_token',
            scope: `openid profile email ${type}`,
            redirectUri: appCallback,
            claims: getClaims(type, consentId),
            state: uuidv1(),
            nonce: uuidv1()
        })

        const createRequestObj = (privateKey: string,consentId: string, clientId: string, type: string) => {
            try {
                const {aud,claims,scope,state,nonce,algorithm,responseType,redirectUri} = tokenSetup(type, consentId);
                const header = {};
                const payload = {};
                payload['aud'] = aud;
                payload['iss'] = clientId;
                payload['client_id'] = clientId;
                payload['redirect_uri'] = redirectUri;
                payload['scope'] = scope;
                payload['state'] = state;
                payload['nonce'] = nonce;
                payload['exp'] = getExp();
                payload['response_type'] = responseType;
                payload['claims'] = claims;
                console.log(privateKey)
                return jwt.sign(payload, privateKey, { algorithm: "RS256", header });
            } catch (e) {
                console.error('* jwt sign error:', e.message);
                return 'JWT sign error: private key is missing or invalid';
            }
        }        

        let t = createRequestObj(this.privateKey, '890742f8-3042-48ca-ae75-fb1d9b5801ed', 'PSDBR-NCA-ISCREDIT', 'accounts');

        res.send(t);
    }
}