// 存储开发中本地的常用变量
import os from 'os';
import { name, version } from '../../package.json';

// 本机的home目录
const HOME = process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];

export const VERSION = version;
export const RC = `${HOME}/.goodrc`;
export const DOWNLOAD = `${HOME}/.good`;
export const TEMP = os.tmpdir();
export const UA = name;
export const DEFAULTS = {
  registry: 'single-spa-react',
  type    : 'orgs' // ['orgs', 'users']
};
export const INTERFACE_ASK = 'interfaces/ask.js';
export const COMPILE_TEMP = `${TEMP}/good_compile`;

