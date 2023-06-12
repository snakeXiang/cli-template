import { writeFile, readFile, exists } from 'mz/fs';
import { decode, encode } from 'ini';
import { RC, DEFAULTS } from './constants';
// 文件操作： fs， path， 我们用的await/async, promise封装 ==> mz
// 使用mz 代替  promisify
// rc格式是ini

/**
 * 如果没有，就写一个，且内容是默认值
 * 如果有，则返回false
 */
const createRc = async () => {
  const has = await exists(RC);
  if (!has) {
    await writeFile(RC, encode(DEFAULTS), 'utf-8');
    return true;
  }
  return false;
};

export const set = async (k, v) => {
  const r = await createRc();
  let opts;
  // 初次创建，且已经有了

  if (r) {
    opts = Object.assign({}, DEFAULTS, { [k]: v });
    opts = encode(opts);

    await writeFile(RC, opts, 'utf-8');
  // 如果已经有了，就增加并直接覆盖
  } else {
    opts = await readFile(RC, { encoding: 'utf-8' });
    opts = decode(opts);
    opts = Object.assign({}, DEFAULTS, { [k]: v });
    await writeFile(RC, encode(opts), 'utf-8');
  }
};

export const remove = async (k) => {
  await createRc();
  let opts;
  // 初次创建，且已经有了

  opts = await readFile(RC, { encoding: 'utf-8' });
  opts = decode(opts);
  delete opts[k];
  await writeFile(RC, encode(opts), 'utf-8');
};

export const get = async (k) => {
  const r = await createRc();
  let opts;
  if (r) {
    return DEFAULTS[k] || '';
  }

  opts = await readFile(RC, { encoding: 'utf-8' });
  opts = decode(opts);

  return opts[k] || '';
};

export const getAll = async () => {
  let opts;
  opts = await readFile(RC, { encoding: 'utf-8' });
  opts = decode(opts);
  return opts;
};
