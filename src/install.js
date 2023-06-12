import ora from 'ora';
import inquirer from 'inquirer';
import { repoList, tagList, downloadLocal } from './utils/git';

/**
 * 下载到本地仓库
 * 本地仓库的配置文件
 */
const apply = async () => {
  let list,
    loading,
    choices,
    answers;

  loading = ora('fetching repo list');
  loading.start();
  list = await repoList();

  console.log('list===>', list);

  loading.succeed('fetched repo list');

  choices = list.map(({ name }) => name);

  answers = await inquirer.prompt([
    {
      type   : 'list',
      name   : 'project',
      message: 'which project do you want to install?',
      choices
    }
  ]);

  const project = answers.project;

  // 获取tag列表
  loading = ora(`fetching ${project} tag list`);
  loading.start();
  list = await tagList(project);
  loading.succeed(`fetched ${project} tag list`);
  // 如果有tag就选择列表
  if (list.length) {
    choices = list.map(({ name }) => name);
    answers = await inquirer.prompt([
      {
        type   : 'list',
        name   : 'version',
        message: 'which version do you want to install?',
        choices
      }
    ]);

  // 如果没有tag，version就为空，表示采用默认分支下载
  } else {
    answers = { version: '' };
  }

  loading = ora(`downloading ${project}`);
  loading.start();
  await downloadLocal(project, answers.version);
  loading.succeed(`downloaded ${project}`);
};

export default apply;
