#!/usr/bin/env node

const program = require('commander');
const package = require('../../../package.json');
const fs = require('fs');

program.version(package);

program
    .command('make <name>')
    .description('Make a Controller')
    .action((name) => {
        if (fs.existsSync('./src/app/http/controllers/' + name + '.ts')) {
            console.log("This file already exists in that directory");
            return;
        }
        makeController(name);
    });

program.parse(process.argv);

function makeController(name) {

    let content = `import {Controller} from '@decorators/Controller'`;
    content += "\nimport { Request, Response } from 'express';";
    content += `\n\n@Controller('')\nexport class ${name}{\n}`;

    fs.writeFile('./src/app/http/controllers/' + name + '.ts', content, { enconding: 'utf-8', flag: 'a' }, function (err) {
        if (err) throw err;
        console.log(name +'.ts file successfully created');
    });
}
