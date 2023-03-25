"use strict";

var template = require('./template');

var path = require('path');

var ora = require('ora');

var fes = require('fs-extra');

var chalk = require('chalk');

module.exports = function outputConfig(answer) {
  var projectName;
  return regeneratorRuntime.async(function outputConfig$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          projectName = answer.projectName; // 判断文件夹是否存在

          _context.next = 3;
          return regeneratorRuntime.awrap(waiting("", generateFolder, "./".concat(projectName, "/config")));

        case 3:
          _context.next = 5;
          return regeneratorRuntime.awrap(waiting("", generateFolder, "./".concat(projectName, "/config/settings")));

        case 5:
          _context.next = 7;
          return regeneratorRuntime.awrap(waiting('', generateFile, "./".concat(projectName, "/config/settings"), 'constants.ts', JSON.parse(JSON.stringify(template(answer)))));

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
}; // 生成文件并写入


function generateFile(location, name) {
  var date = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return new Promise(function (resolve) {
    var targetFile = path.resolve(location, name);
    fes.writeFileSync(targetFile, date);
    resolve(true);
  });
} // 生成文件夹


function generateFolder(targetFolder) {
  var spinner = ora('请稍等。。。');
  spinner.start();
  return new Promise(function (resolve) {
    if (fes.existsSync(targetFolder)) {
      spinner.stop(); // spinner.fail(chalk.yellow('文件夹存在！'));

      resolve(true);
    } else {
      fes.mkdirsSync(targetFolder);
      spinner.stop(); // spinner.succeed(chalk.yellow('文件夹创建成功！'))

      resolve(true);
    }
  });
} // 包裹执行的方法等待加载


function waiting(msg, fn) {
  var spinner,
      _len,
      args,
      _key,
      _args2 = arguments;

  return regeneratorRuntime.async(function waiting$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          spinner = ora('请稍等。。。');
          spinner.start();
          _context2.prev = 2;

          for (_len = _args2.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            args[_key - 2] = _args2[_key];
          }

          _context2.next = 6;
          return regeneratorRuntime.awrap(fn.apply(void 0, args));

        case 6:
          spinner.stop();

          if (msg) {
            setTimeout(function () {
              spinner.succeed(chalk.yellow(msg)); // 成功
            });
          }

          _context2.next = 13;
          break;

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](2);
          setTimeout(function () {
            spinner.stop();
            spinner.fail(chalk.red(_context2.t0)); // 失败 
          });

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[2, 10]]);
}