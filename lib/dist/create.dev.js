"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var chalk = require('chalk');

var ora = require('ora');

var path = require('path');

var fs = require('fs-extra');

var inquirer = require('inquirer');

var download = require('download-git-repo');

var outputConfig = require('./outputConfig/index'); // const log = (msg)=>console.log(chalk.blue(msg));


function downloadtemp(projectName) {
  url = 'https://github.com/github-gmm/hs-template.git';
  var spinner = ora("下载中...");
  spinner.start();
  return new Promise(function (resolve) {
    download("direct:".concat(url), "./".concat(projectName), {
      clone: true
    }, function (err) {
      if (err) {
        spinner.fail();
        console.log(chalk.red("Generation failed. ".concat(err)));
        resolve(false);
      } else {
        spinner.succeed();
        console.log(chalk.red("\u5F00\u59CB\u81EA\u52A8\u751F\u6210\u914D\u7F6E\u6587\u4EF6..."));
        resolve(true);
      }
    });
  });
}

var questions = [{
  type: 'list',
  message: '创建平台还是金融子系统？',
  name: 'type',
  choices: [{
    name: '平台',
    value: 'vtrade'
  }, {
    name: '金融',
    value: 'vbkr'
  }]
}, {
  type: 'input',
  message: '请输入静态资源域名:',
  name: 'sourceName',
  when: function when(answer) {
    return answer.type;
  },
  "default": '.xxx.com'
}, {
  type: 'input',
  message: '请输入平台接口域名:',
  name: 'interfaceVtrade',
  when: function when(answer) {
    return answer.type === 'vtrade';
  },
  "default": '.xxx.com.cn'
}, {
  type: 'input',
  message: '请输入金融接口域名:',
  name: 'interfaceVbkr',
  when: function when(answer) {
    return answer.type === 'vbkr';
  },
  "default": '.xxx.com'
}];

module.exports = function _callee2(projectName, option) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          inquirer.prompt(questions).then(function _callee(answer) {
            var cwd, targetDir, _ref, action, res;

            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    if (answer.type) {
                      _context.next = 4;
                      break;
                    }

                    return _context.abrupt("return");

                  case 4:
                    //  创建项目
                    //  命名重复
                    // 1. 获取当前执行目录
                    cwd = process.cwd();
                    targetDir = path.join(cwd, projectName);

                    if (!fs.existsSync(targetDir)) {
                      _context.next = 25;
                      break;
                    }

                    if (!option.force) {
                      _context.next = 12;
                      break;
                    }

                    _context.next = 10;
                    return regeneratorRuntime.awrap(fs.remove(targetDir));

                  case 10:
                    _context.next = 25;
                    break;

                  case 12:
                    _context.next = 14;
                    return regeneratorRuntime.awrap(inquirer.prompt([{
                      name: 'action',
                      type: 'list',
                      massage: '当前文件名重复是否覆盖?',
                      choices: [{
                        name: '覆盖',
                        value: 'overwrite'
                      }, {
                        name: '取消',
                        value: false
                      }]
                    }]));

                  case 14:
                    _ref = _context.sent;
                    action = _ref.action;

                    if (action) {
                      _context.next = 21;
                      break;
                    }

                    console.log("\r\n \u53D6\u6D88\u6784\u5EFA");
                    return _context.abrupt("return");

                  case 21:
                    if (!(action == 'overwrite')) {
                      _context.next = 25;
                      break;
                    }

                    // 如果要覆盖直接将之前文件进行移除 然后覆盖
                    console.log("\r\n \u6B63\u5728\u79FB\u9664...");
                    _context.next = 25;
                    return regeneratorRuntime.awrap(fs.remove(targetDir));

                  case 25:
                    _context.next = 27;
                    return regeneratorRuntime.awrap(downloadtemp(projectName));

                  case 27:
                    res = _context.sent;

                    if (!res) {
                      _context.next = 32;
                      break;
                    }

                    _context.next = 31;
                    return regeneratorRuntime.awrap(outputConfig(_objectSpread({}, answer, {
                      projectName: projectName
                    })));

                  case 31:
                    console.log("\r\n ".concat(chalk.green('创建成功！')));

                  case 32:
                  case "end":
                    return _context.stop();
                }
              }
            });
          });

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
};