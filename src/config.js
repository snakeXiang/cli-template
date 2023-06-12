import { get, set, getAll, remove } from './utils/rc';
/**
 * 下载到本地仓库
 * 本地仓库的配置文件
 */
const apply = async (action, k, v) => {
  let r;
  switch (action) {
    case 'set':
      await set(k, v);
      break;
    case 'remove':
      await remove(k);
      break;
      // 默认为读
    default:
      // 如果没有k就获取所有的，有就返回当k的值
      if (!k) {
        r = await getAll();
        Object.keys(r).forEach((key) => {
          console.log(`${key}=${r[key]}`);
        });
      } else {
        r = await get(k);
        console.log(r);
      }
  }
};

export default apply;
