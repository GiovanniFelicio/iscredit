import { NextFunction, Request, Response } from "express";
import axios from "axios";

class EleicaoController {

    async index(request: Request, response: Response) {        

        const req = axios.get('https://resultados.tse.jus.br/oficial/ele2020/divulgacao/oficial/426/dados-simplificados/pr/pr74934-c0011-e000426-r.json');

        var candidatosPrefeito = await req;    

        var prefeitos = candidatosPrefeito.data['cand'];

        prefeitos.forEach((prefeito: []) => {
            switch (prefeito['nm']) {
                case 'LEONALDO PARANHOS':
                    prefeito['id'] = "0";
                    break;
                case 'MARCIO PACHECO':
                    prefeito['id'] = "1";
                    break;
                case 'ROMAN':
                    prefeito['id'] = "2";
                    break;
                case 'PAULO PORTO':
                    prefeito['id'] = "3";
                    break;
                case 'INÊS DE PAULA':
                    prefeito['id'] = "4";
                    break;
                case 'JUAREZ BERTE':
                    prefeito['id'] = "5";
                    break;
                case 'MAJOR ARSÊNIO':
                    prefeito['id'] = "6";
                    break;
                case 'CARLOS MORAES':
                    prefeito['id'] = "7";
                    break;
            }
        });
        prefeitos.sort((a, b) => {
            if (a['id'] < b['id']) {
                return -1;
            }
            if (a['id'] < b['id']) {
                return 1;
            }
            return 0;
        });

        const reqVereador = axios.get('https://resultados.tse.jus.br/oficial/ele2020/divulgacao/oficial/426/dados-simplificados/pr/pr74934-c0013-e000426-r.json');

        var candidatosVerador = await reqVereador;    

        var vereadores = candidatosVerador.data['cand'];

        vereadores.sort((a, b) => {
            if (a['vap'] < b['vap']) {
                return -1;
            }
            if (a['vap'] < b['vap']) {
                return 1;
            }
            return 0;
        });

        return response.render('eleicao/index', {
            layout: 'defaultEleicao',
            prefeitos: prefeitos,
            vereadores: vereadores
        });

    }
    compare(a, b) {
        if (a.last_nom < b.last_nom) {
            return -1;
        }
        if (a.last_nom > b.last_nom) {
            return 1;
        }
        return 0;
    }    
}

export default new EleicaoController();