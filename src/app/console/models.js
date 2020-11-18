#!/usr/bin/env node

const program = require('commander');
const package = require('../../../package.json');
const fs = require('fs');

program.version(package);

program
    .command('make <name>')
    .description('Make a Controller')
    .action((name) => {
        if (fs.existsSync('./src/app/http/models/' + name + '.ts')) {
            console.log("This file already exists in that directory");
            return;
        }
        makeModel(name);
    });

program.parse(process.argv);

function makeModel(name) {

    let content = `import {Entity,PrimaryGeneratedColumn,Column} from "typeorm";\n`;
    content += `\n@Entity('${name.toUpperCase()}')`;
    content += `\nexport class ${name} {\n`;
    content += `\n  @PrimaryGeneratedColumn()`;
    content += `\n  id: number;\n`;
    content += `\n}`;

    fs.writeFile('./src/app/models/' + name + '.ts', content, { enconding: 'utf-8', flag: 'a' }, function (err) {
        if (err) throw err;
        console.log(name + '.ts file successfully created');
    });
}
