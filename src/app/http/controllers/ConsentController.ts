import { User } from 'src/app/models/User';
import { Controller } from '@decorators/Controller'
import axios from "axios";
import { getRepository } from 'typeorm';
import { Consent } from '@models/Consent';
import Utils from '@utils/Utils';
import { HttpRequest } from '@models/decorators/HttpRequest';
import Auth from '@middlewares/auth';
import { Request, Response } from 'express';

@Controller('/consent')
export class ConsentController {

    private privateKey:string = `-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCf/crE4dptc21t9IQ6q/QS/CNEVk6DezEp7p3UHpDV2Q8w/IdjDI4rEgGT+c93ijfq6rz50SUU6zZLCDbEj/7h/YYx7x1nlEUBmz14Q04IML5bucxhRXsr+cfBynAlbFeyrRW6iQf4ynvVrjBvyyfSL3DSggFNMZzJ3kR5nf6mLYeu3xjd9mbqVan9QJe0PcozX7FEO8ihYBAzd/zXLYJOM1sO9xZotyjR5psgGLh+Xz3cO2gyHtzKPlY2I8FjgxoGMJMlBN2sNA7ZIXDJWnZWyxR3Jd4RYSiQV/VLBOL/avXTOqt2eA03pD8d/X/hhJiAd14jQ0AYtGeJU9SaMgDNAgMBAAECggEAM4b2bjBbO9LoFHiiuY613gNsjE7LnJbpf5rFJBLwDJ+Kv/kk1WauxvpWncTf550RY0xUrpSIP9N9Oe8cTHQf38LaHGzpaHmdO+Y2huwOTp78P+h4BX/uKnyYtDYxpivdlsMd82S8t4jnFyuxl9+zJIN476NFLgpjd7RpE04qPHR8BsjvukOWvNRVvOGzcMU8ffoVBN4wNmvzcDwn1JQ3Lyq+tw2qhSxzCL6BfsiYh9j/W0+rMX/OQIJz5dIbpZ4f2FIw+yUIvWloyebbwiF15J762z6g7LufdBgr4bmM4ELg/Z1F9TxaVu+uq3mVxys5eW1YJe6/Nmu9Rgm+oDCU1QKBgQDmDj2kra4BP3TwUHdfDh/ixslBtah0ZVLFvEhVjbShDQsHwApbhbyJJRDTkY1HBczCDo15RDVbSCach6SZYJuQEVl1OQfywuk7By6omI/KrCM4ov2v2bf+JbuqxjGCHgTtB1P/RcLx836rhnWaJs14dvhFu0Ck7obkjj2qemmkQwKBgQCyCMezlTCHIze6w47wZ58k3Y8u0I2RIyyMVYvObfFL2UzuY1Upwb8ttjQ4/inv3uU8L02HSapkKkKn6OiJZVTZW4JVcV3pfKExfHIKSsGrue1f3vUtaZy4KvCDTnvmLUpqEAAZecE0Nh0XWyB/UVp9mhjFVWfzmuPh1GuN9MJ9rwKBgQCzNzjSRvKcykBgzW6QwEIaud0isU9PjXdTzv9Slpe2NqD3IqVu8toSxKs9BdBXGa+PJSMU6wvd1nEt04VobpgBPWLBLPKCLVDfyRKSCHdL3Zl6j46tJSBufhqaSNdck+ImfGT1IfVh4tw05wRKWBwM0jFKsTsEwUSYXC6x1bbiXQKBgECs799NU1PEd3phkIvFGQtLcbiQCt2u6YARk7hqOD5VspzneQiyWcFBb7dEnfeGAcDbbk63dC7vK0fUVKWVKj3MAI0JohQwMl7H1qXmgnTgFlu9o1PcChLdhoItANWdnmrpZR/cG1PcVLUnZaba5wS59kW5wQm+OwrPIENxpzYBAoGALoS0chN6GrgggST13N7PC1Rdd9KTzDF6uls03N8I/lPaKc73ExtJPE7AnO27qVWc6IlEZnrbWlfQamjQTCGPPXko2ncCpOGNn0RrGSxwdLuXQHyq8ey8YVx5ZtGMPe5CsEozEX+amxrMqLZDD4jmJmWDL1i3WVciBrkscCgti1c=\n-----END PRIVATE KEY-----`;

    //Implementações futura
    @HttpRequest('post', '/return')
    public returnConsent(req:Request, res:Response) {        
        res.send(req.body);
    }

    //Implementações futura
    @HttpRequest('post', '/', [Auth.isAuth])
    public async index(req: Request, res:Response) {

        let user = await getRepository(User).createQueryBuilder('USER')
            .where('USER.id = :id', { id: req.user['id'] })
            .leftJoinAndSelect("USER.authorizationToken", "authorizationToken")
            .getOne();

        let date: Date = new Date(Date.now() - (1000*60*60*3));
        let dateExpire: Date = new Date(Date.now() - (1000*60*58.5*3));

        let json = `
        {
            "Data": {
              "ExpirationDateTime": "${dateExpire.toJSON()}",
              "Permissions": [
                "ReadAccountsBasic",
                "ReadAccountsDetail",
                "ReadBalances",
                "ReadBeneficiariesDetail",
                "ReadDirectDebits",
                "ReadProducts",
                "ReadStandingOrdersDetail",
                "ReadTransactionsCredits",
                "ReadTransactionsDebits",
                "ReadTransactionsDetail",
                "ReadOffers",
                "ReadPAN",
                "ReadParty",
                "ReadPartyPSU",
                "ReadScheduledPaymentsDetail",
                "ReadStatementsDetail"
              ],
              "TransactionFromDateTime": "${date.toJSON()}",
              "TransactionToDateTime": "${date.toJSON()}"
            },
            "Risk": {}
          }`;

        let request = axios.post('https://gw-dev.obiebank.banfico.com/obie-aisp/v3.1/aisp/account-access-consents', 
        json,
            {
                headers: {
                    "Content-Type": "application/json",
                    "x-fapi-financial-id": "ISCREDIT",
                    "Authorization": `Bearer ${user.authorizationToken.accessToken}`
            }
        })

        const {data} = await request;
        const {Data} = data;
        const {ConsentId} = Data;

        let consent = new Consent();

        consent.consentId = ConsentId;
        consent.expirationDateTime = dateExpire;
        consent.user = user;
        consent.permissions = ["ReadAccountsBasic","ReadAccountsDetail","ReadBalances","ReadBeneficiariesDetail","ReadDirectDebits","ReadProducts","ReadStandingOrdersDetail","ReadTransactionsCredits","ReadTransactionsDebits","ReadTransactionsDetail","ReadOffers","ReadPAN","ReadParty","ReadPartyPSU","ReadScheduledPaymentsDetail","ReadStatementsDetail"];

        consent = getRepository(Consent).create(consent);
        
        consent = await getRepository(Consent).save(consent)        

        if (typeof(consent) != undefined){
            let token:string = Utils.generateJWTRequest(consent.consentId, this.privateKey);

            if (typeof(token) != undefined && token != '') {
                let uri = `https://auth.obiebank.banfico.com/auth/realms/provider/protocol/openid-connect/auth?response_type=code&client_id=PSDBR-NCA-ISCREDIT&redirect_uri=https://developer.obiebank.banfico.com/callback&state=1531373357552&nonce=1151092814432&request=${token}`;
            }

            return true;
        }

        return false;
    }
}