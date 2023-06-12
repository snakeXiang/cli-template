import ora from 'ora';
import { readdir, exists } from 'mz/fs';
import { DOWNLOAD } from './utils/constants';

/**
 * 把当前已经下载的模板名称和版本列出来
 */
const apply = async () => {
  const has = await exists(DOWNLOAD);
  if (!has) {
    console.warn(`${DOWNLOAD} is not existed. Please install a scaffold by \`good install\``);
    process.exit(0);
  }
  const loading = ora('listing the scaffolds');
  loading.start();
  let list = await readdir(DOWNLOAD);
  loading.succeed('listed the scaffolds');

  list = list.filter(name => !name.startsWith('.'));

  console.log('');
  list.forEach((project) => {
    // const { version } = require(`${DOWNLOAD}/${project}/package.json`);
    // TODO： 当有模板引擎的时候，package.json不再是一个规范的json
    console.log(`${project}`);
  });
};

export default apply;
