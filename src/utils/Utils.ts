import * as jwt from 'jsonwebtoken'
import btoa from 'btoa'
import uuidv1 from 'uuid/v1';

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

    //Implementações futura
    generateJWTRequest(idConsent: string, privateKey:string): string {
        const appCallback = 'https://yourapplication.com/auth/callback';
        const getExp = (minutes = 60) => Math.floor(Date.now() / 1000) + (minutes * 60);
        const getClaims = (type: string, consentId: string) => ({
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
        const tokenSetup = (type: string, consentId: string) => ({
            algorithm: 'RS256',
            aud: 'https://auth.obiebank.banfico.com/',
            responseType: 'code id_token',
            scope: `openid profile email ${type}`,
            redirectUri: appCallback,
            claims: getClaims(type, consentId),
            state: uuidv1(),
            nonce: uuidv1()
        })

        const createRequestObj = (privateKey: string, consentId: string, clientId: string, type: string) => {
            try {
                const { aud, claims, scope, state, nonce, algorithm, responseType, redirectUri } = tokenSetup(type, consentId);
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
                return jwt.sign(payload, privateKey, { algorithm: 'RS256', header});
            } catch (e) {
                console.error('* jwt sign error:', e.message);
                return 'JWT sign error: private key is missing or invalid';
            }
        }

        let token = createRequestObj(privateKey, idConsent, 'PSDBR-NCA-ISCREDIT', 'accounts');

        return token;
    }
}

export default new Util();