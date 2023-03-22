const chalk = require('chalk')
const path = require('path')
const ora = require('ora')
const fs = require('fs-extra')
const inquirer = require('inquirer')
const download = require('download-git-repo')

function downloadtemp (projectName) {
  url = 'https://github.com/github-gmm/hs-template.git';
  console.log(chalk.white('\n Start generating... \n'))
  // 出现加载图标
  const spinner = ora("Downloading...");
  spinner.start();
  download(`direct:${url}`, `./${projectName}`, { clone: true }, (err) => {
    if (err) {
      spinner.fail()
      console.log(chalk.red(`Generation failed. ${err}`))
      return
    }
    // 结束加载图标
    spinner.succeed()
    console.log(chalk.green('Generation completed!'))
    console.log('\n To get started')
    console.log(`\n    cd ${projectName} \n`)
  })
}
module.exports = async function (projectName, option) { 
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
  downloadtemp(projectName); 
  console.log(`\r\n ${chalk.blue('创建成功！')}`);
}