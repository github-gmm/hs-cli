#! /usr/bin/env node 
const program = require("commander");
const create = require('../lib/create');
// 定义指令
program
  .version('0.0.1')
  .usage('<command> [options]')
  .command(`create <app-name>`)
  .action((name, cmd) => {
    // 回调函数
  	console.log('脚手架HS-CLI');
    create(name,cmd);
  })
program
  .on('--help',()=>{
    console.log('');
    console.log(`Run ${chalk.cyan(' hscli <command> --help')} show details `);
    console.log('');
  }) 
// 解析命令行参数
program.parse(process.argv);