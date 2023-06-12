// const fakeDefault = {
//   name       : 'xx',
//   description: 'xx',
//   private    : false,
//   license    : 'MIT',
//   username   : 'xx',
//   email      : 'xx',
//   github     : 'jiangtao/blog'
// };

import { resolve } from 'path';
import { exists } from 'mz/fs';

const askCreator = () => [
  {
    type   : 'input',
    message: 'your project name',
    name   : 'name',
    async validate(input) {
      // 1. 验证输入是否为空
      // 2. 验证当前运行目录+输入，形成的新文件是不是已存在
      const next = this.async();
      if (input.length === 0) {
        next('your project name is empty. Please input');
        return;
      }
      const fullPath = resolve(process.cwd(), input);
      const isExist = await exists(fullPath);
      if (isExist) {
        next(`${fullPath} is existed. Please change the input name`);
        return;
      }
      next(null, true);
    }
  },
  {
    type   : 'input',
    message: 'description',
    name   : 'description'
  }
];

export default askCreator;
