'use strict';

import path from 'path';

export const ROOT = path.join(__dirname, '..');

export const DIR_SRC = 'src';
export const DIR_DEST = 'public';
export const DIR_TEMPLATE = 'templates';
export const DIR_STYLE = 'styles';
export const DIR_SCRIPT = 'scripts';

const joint = (...paths) => path.join(...paths);
const getSrcPath = (...paths) => joint(ROOT, DIR_SRC, ...paths);
const getDestPath = (...paths) => joint(ROOT, DIR_DEST, ...paths);

export const SCRIPT_ENTRY_FILENAME = 'entry';
export const SCRIPT_BUNDLE_FILENAME = 'bundle';

export const SRC = getSrcPath();
export const SRC_TEMPLATE = getSrcPath('**', '*.html');
export const SRC_STYLE = getSrcPath('**', '*.+(css|sass|scss)');
export const SRC_SCRIPT = getSrcPath('**', `${SCRIPT_ENTRY_FILENAME}.+(js|jsx)`);

export const DEST = getDestPath();

export const WATCH_PATTERN_TEMPLATE = getSrcPath(DIR_TEMPLATE, '**', '*.html');
export const WATCH_PATTERN_STYLE = getSrcPath(DIR_STYLE, '**', '*.+(css|sass|scss)');
export const WATCH_PATTERN_SCRIPT = getSrcPath(DIR_SCRIPT, '**', '*.js');

// BrowserSync
export const BS_SERVER_NAME = 'local-server';
export const BS_INIT_OPTIONS = {
  // https://www.browsersync.io/docs/options/
  server: {
    baseDir: DEST,
    directory: true
  },
  browser: ['google chrome'], //'google chrome', 'firefox', 'safari'
  reloadOnRestart: true,
  reloadDelay: 100,
  reloadDebounce: 100
};
