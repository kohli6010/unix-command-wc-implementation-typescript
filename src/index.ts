#!/usr/bin/env node

import { Command } from 'commander';
import * as fs from 'fs';

const program = new Command();

program
    .version('1.0.0')
    .description('Count words, lines, and characters in a file')
    .option('-c, --byte-count', 'byte count')
    .option('-m, --character-count', 'count characters in a file')
    .option('-l, --line-count', 'count characters in a file')
    .option('-w, --word-count', 'count words in a file')
    .argument('[file]', 'file to process')
    .action((file, options) => {
        if (file == undefined) {
            let data = '';
            const readableStream = process.stdin
            let characters = 0;
            let lines = 0;
            let words = 0;
            let byteSize = 0;

            // accumulate data
            readableStream.on('data', (buffer: Buffer) => {
                let dataString = buffer.toString()
                data += dataString
                byteSize += buffer.length
            });

            readableStream.on('error', (err) => {
                console.error(`Error reading input: ${err.message}`);
                process.exit(1);
            });

            // process data only when all the data is available
            readableStream.on('end', (args: any) => {
                characters = data.length;
                if(data != undefined) {
                    lines = data.split('\n').length - (data.endsWith('\n') ? 0 : 1)
                }

                words = data.split(/\s+/).filter(Boolean).length;         
                
                if (options && Object.keys(options).length) {
                    if (options.characterCount) {
                        console.log(`${characters}`);
                    }

                    if (options.lineCount) {
                        console.log(`${lines - 1}`);
                    }

                    if (options.wordCount) {
                        console.log(`${words}`);
                    }

                    if (options.byteCount) {
                        console.log(`${byteSize}`)
                    }
                } else {
                    console.log(`${lines - 1} ${words} ${byteSize}`)
                }
            });
        } else {
            fs.readFile(file, 'utf8', (err, data) => {
                if (err) {
                    console.error(`Error reading file: ${err.message}`);
                    process.exit(1);
                }

                if (options && Object.keys(options).length) {
                    if (options.characterCount) {
                        const characters = data.length;
                        console.log(`${characters} ${file}`);
                    }

                    if (options.lineCount) {
                        const lines = data.split('\n').length;
                        console.log(`${lines - 1} ${file}`);
                    }

                    if (options.wordCount) {
                        const words = data.split(/\s+/).filter(Boolean).length;
                        console.log(`${words} ${file}`);
                    }

                    if (options.byteCount) {
                        let stats = fs.statSync(file);
                        console.log(`${stats.size} ${file}`)
                    }
                } else {
                    const lines = data.split('\n').length;

                    const words = data.split(/\s+/).filter(Boolean).length;

                    let stats = fs.statSync(file);

                    console.log(`${lines - 1} ${words} ${stats.size} ${file}`)
                }
            });
        }
    });

program.parse(process.argv);
