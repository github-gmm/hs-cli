const chalk = require('chalk')
const ora = require('ora')
const path = require('path')
const fs = require('fs-extra')
const inquirer = require('inquirer')
const download = require('download-git-repo')
const outputConfig = require('./outputConfig/index');

// const log = (msg)=>console.log(chalk.blue(msg));

function downloadtemp (projectName) {
  url = 'git@github.com:github-gmm/hs-template.git';
  const spinner = ora("下载中...");
  spinner.start();
  return new Promise((resolve) => {
    download(`direct:${url}`, `./${projectName}`, { clone: true }, (err) => {
      if (err) {
        spinner.fail();
        console.log(chalk.red(`Generation failed. ${err}`));
        resolve(false);
      } else {
        spinner.succeed();
        console.log(chalk.red(`开始自动生成配置文件...`));
        resolve(true);
      }
    })
  })
}

let questions = [
  {
    type: 'list',
    message: '创建平台还是金融子系统？',
    name: 'type',
    choices: [
        {
            name: '平台',
            value: 'vtrade'
        },
        {
            name: '金融',
            value: 'vbkr'
        }
    ]
  },
  {
      type: 'input',
      message: '请输入静态资源域名:',
      name: 'sourceName',
      when: (answer)=>{
          return answer.type
      },
      default: '.xxx.com',
  },
  {
      type: 'input',
      message: '请输入平台接口域名:',
      name: 'interfaceVtrade',
      when: (answer)=>{
          return answer.type === 'vtrade'
      },
      default: '.xxx.com.cn',
  },
  {
      type: 'input',
      message: '请输入金融接口域名:',
      name: 'interfaceVbkr',
      when: (answer)=>{
        return answer.type === 'vbkr'
      },
      default: '.xxx.com',
  },
]

module.exports = async function (projectName, option) {
  inquirer.prompt(questions).then(async answer=>{
    // log(JSON.stringify(answer))
    if (!answer.type) {
      return
    } else {
      //  创建项目
      //  命名重复
      // 1. 获取当前执行目录
      const cwd = process.cwd(); 
      const targetDir = path.join(cwd, projectName)
      if (fs.existsSync(targetDir)) {
        if (option.force) {
          // 强制创建,加入 -f 命令后如果文件存在重名会强制移除上一个文件，新建一个文件
          await fs.remove(targetDir);
        } else {
            // 这个是用户没有加入 -f强制命令进行是否覆盖处理 提示用户是否确定要覆盖,用户选项提示
          let { action } = await inquirer.prompt([
            {
              name: 'action',
              type: 'list',
              massage: '当前文件名重复是否覆盖?',
              choices: [
                { name: '覆盖', value: 'overwrite' },
                { name: '取消', value: false }
              ]
            }
          ])
          // 如果用户不覆盖，直接取消
          if (!action) {
            console.log(`\r\n 取消构建`);
            return 
          } else if (action == 'overwrite') {
            // 如果要覆盖直接将之前文件进行移除 然后覆盖
            console.log(`\r\n 正在移除...`);
            await fs.remove(targetDir);
          } 
        }
      }
      const res = await downloadtemp(projectName);
      if (res) {
        await outputConfig({
          ...answer,
          projectName
        })
        console.log(`\r\n ${chalk.green('创建成功！')}`);
      }
    }
  })
}


