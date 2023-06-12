import swig from 'swig-templates';
import { readdir, writeFile, statSync } from 'mz/fs';


function compile(file, data) {
  return swig.compileFile(file)(data);
}
/**
 * build src src/index src/xxx
 * @param {*} src
 * @param {*} data
 */
const apply = async (src, data) => {
  await (async function _readDirs(dir) {
    const files = await readdir(dir);
    console.log(' ');
    // 把内容给改了
    files.forEach(async (file) => {
      const path = `${dir}/${file}`;
      const stats = statSync(path);
      if (stats.isDirectory()) {
        await _readDirs(path);
      } else {
        try {
          const renderedContent = compile(path, data);
          await writeFile(path, renderedContent);
        } catch (e) {
          console.log(e);
        }
      }
    });
  }(src));
};


export default apply;
