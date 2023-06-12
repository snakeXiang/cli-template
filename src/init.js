import ora from 'ora';
import { resolve } from 'path';
import { exists, readdir } from 'mz/fs';
import inquirer from 'inquirer';
import { copy, betterRequire } from './utils/common';
import { DOWNLOAD, INTERFACE_ASK } from './utils/constants';
import render from './helper/render';
import askCreator from './helper/ask';

/**
 * 下载到本地仓库
 * 本地仓库的配置文件
 */
const apply = async () => {
  const has = await exists(DOWNLOAD);
  if (!has) {
    console.warn(`${DOWNLOAD} is not existed. Please install a scaffold by \`good install\``);
    process.exit(0);
  }
  let
    loading,
    answers;

  loading = ora('listing the scaffolds');
  loading.start();
  let list = await readdir(DOWNLOAD);
  loading.succeed('listed the scaffolds');

  list = list.filter(name => !name.startsWith('.'));


  answers = await inquirer.prompt([
    {
      type   : 'list',
      message: 'which project do you want to generate it?',
      name   : 'project',
      choices: list
    }
  ]);

  const project = answers.project;

  // 输入用户信息: 项目名称
  let askMaker;

  try {
    askMaker = betterRequire(`${DOWNLOAD}/${project}/${INTERFACE_ASK}`);
  } catch (e) {
    askMaker = askCreator;
  }
  if (typeof askMaker === 'function') {
    askMaker = askMaker();
  }
  answers = await inquirer.prompt(askMaker);


  // 从已经下载的模板，copy一份，同时改名
  loading = ora(`generating ${project}`);
  loading.start();

  // 模板引擎语法  --> 获取所有的文件 ---> 批量进行 render ---> 替换现有的文件 ---> 生成的操作
  // 需要一个中间目录去做模板渲染的操作
  await copy(`${DOWNLOAD}/${project}`, `${resolve(process.cwd(), answers.name)}`);
  await render(`${resolve(process.cwd(), answers.name)}`, answers);
  loading.succeed(`generated ${project}`);
};

export default apply;
