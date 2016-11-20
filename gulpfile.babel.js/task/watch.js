'use strict';

import debounce from 'lodash.debounce';
import gulpWatch from 'gulp-watch';
import BrowserSync from 'browser-sync';
import bsCloseHook from 'browser-sync-close-hook';

import {
  BS_SERVER_NAME,
  BS_INIT_OPTIONS
} from '../config';

import {watchTemplate} from './build-template';
import buildStyle, {watchStyle} from './build-style';

import buildScript from './build-script';

const bs = BrowserSync.create(BS_SERVER_NAME);

bs.use({
  plugin() {},
  hooks: {
    'client:js': bsCloseHook
  }
});

export default function (done) {
  const bs = BrowserSync.get(BS_SERVER_NAME);

  watchTemplate();
  watchStyle();

  buildScript(done, true);
  buildStyle();

  bs.init(BS_INIT_OPTIONS, done);
}

export function watch(pattern, fn) {
  gulpWatch(pattern, debounce(() => {
    console.log('\nrebuilding...');
    fn();
  }, 100));
}
