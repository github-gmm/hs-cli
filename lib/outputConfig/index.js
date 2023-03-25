const template = require('./template');
const path = require('path')
const ora = require('ora')
const fes = require('fs-extra')
const chalk = require('chalk')

module.exports = async function outputConfig(answer) {
  const { projectName } = answer;
  // 判断文件夹是否存在
  await waiting(``, generateFolder,  `./${projectName}/config`,);
  await waiting(``, generateFolder,  `./${projectName}/config/settings`,);
  // 生成文件
  await waiting(
    '', 
    generateFile, 
    `./${projectName}/config/settings`,
    'constants.ts', 
    JSON.parse(JSON.stringify(template(answer))),
  )
}

// 生成文件并写入
function generateFile(location, name, date = {}) {
  return new Promise((resolve)=>{
    const targetFile = path.resolve(location, name);
    fes.writeFileSync(targetFile, date)
    resolve(true)
  })
}

// 生成文件夹
function generateFolder(targetFolder) {
  const spinner = ora('请稍等。。。');
  spinner.start();
  return new Promise((resolve)=>{
    if (fes.existsSync(targetFolder)) {
      spinner.stop();
      // spinner.fail(chalk.yellow('文件夹存在！'));
      resolve(true);
    } else {
      fes.mkdirsSync(targetFolder);
      spinner.stop();
      // spinner.succeed(chalk.yellow('文件夹创建成功！'))
      resolve(true);
    }
  })
}

// 包裹执行的方法等待加载
async function waiting(msg, fn, ...args) {
  const spinner = ora('请稍等。。。');
  spinner.start();
  try {
      await fn(...args)
      spinner.stop();
      if (msg) {
        setTimeout(() => {
          spinner.succeed(chalk.yellow(msg)); // 成功
        });
      }
  } catch (error) {
      setTimeout(() => {
          spinner.stop();
          spinner.fail(chalk.red(error)); // 失败 
      });
  } 
}

