// 执行入口模块

import program from 'commander'; // yargs
import { VERSION, RC } from './utils/constants';
import main from './index';

const actionMap = {
  install: {
    desc    : 'install remote templates from the remote store',
    alias   : 'i',
    examples: [
      'good install',
      'good i'
    ]
  },
  config: {
    desc    : `set and get local config in ${RC}`,
    alias   : 'c',
    examples: [
      'good config set <k> <v>',
      'good config remove <k>',
      'good config get <k>'
    ]
  },
  init: {
    desc    : 'generate a new project from a template',
    examples: [
      'good init',
    ]
  },
  list: {
    desc    : 'list the downloaded scaffolds',
    alias   : 'l',
    examples: [
      'good list',
      'good l'
    ]
  },
  '*': {
    desc    : 'The command is not found',
    alias   : null,
    examples: [
    ]
  }
};

function help() {
  console.log('    how to use:');
  console.log();
  Object.keys(actionMap).forEach((k) => {
    actionMap[k].examples.forEach((example) => {
      console.log('    -', example);
    });
  });
}

// yargs
function registerAction(type, commander, actions) {
  commander.command(type)
    .description(actions[type].desc)
    .alias(actions[type].alias)
    .action(async () => {
      const args = process.argv.slice(3);
      if (type === 'config') {
        await main(type, ...args);
      } else {
        await main(type);
      }
    });
  return commander;
}

Object.keys(actionMap).reduce((last, type) => registerAction(type, program, actionMap), program);
program.on('-h', help);
program.on('--help', help);

program.version(VERSION, '-v --version').parse(process.argv);
