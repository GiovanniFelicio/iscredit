import { NextFunction, Request, Response } from "express";
import axios from "axios";
import { Controller } from "@decorators/Controller";
import { HttpRequest } from "@decorators/HttpRequest";

@Controller('/eleicao')
export class EleicaoController {

    @HttpRequest('get', '/')
    async index(request: Request, response: Response) {        

        const req = axios.get('https://resultados.tse.jus.br/oficial/ele2020/divulgacao/oficial/426/dados-simplificados/pr/pr74934-c0011-e000426-r.json');

        var candidatosPrefeito = await req;

        var prefeitos = candidatosPrefeito.data['cand'];

        var brancosNulosPrefeito: [] = [];

        brancosNulosPrefeito['vb'] = candidatosPrefeito.data['vb'];
        brancosNulosPrefeito['vn'] = candidatosPrefeito.data['vn'];
        brancosNulosPrefeito['pvb'] = candidatosPrefeito.data['pvb'];
        brancosNulosPrefeito['pvn'] = candidatosPrefeito.data['pvn'];
        brancosNulosPrefeito['nmCargo'] = 'Prefeito';

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

        var brancosNulosVereador: [] = [];

        brancosNulosVereador['vb'] = candidatosVerador.data['vb'];
        brancosNulosVereador['vn'] = candidatosVerador.data['vn'];
        brancosNulosVereador['pvb'] = candidatosVerador.data['pvb'];
        brancosNulosVereador['pvn'] = candidatosVerador.data['pvn'];
        brancosNulosVereador['nmCargo'] = 'Vereador';

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
            vereadores: vereadores,
            brancosNulosPrefeito: brancosNulosPrefeito,
            brancosNulosVereador: brancosNulosVereador
        });

    }
}