'use strict';

import path from 'path';

import BrowserSync from 'browser-sync';
import browserify from 'browserify';
import watchify from 'watchify';
import glob from 'glob';
import gulp from 'gulp';
import gulpIf from 'gulp-if';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';

import clean from '../lib/clean';
import {logRebuilding} from '../lib/log';
import {
  DIR_SRC,
  DIR_DEST,
  SRC_SCRIPT,
  SCRIPT_BUNDLE_FILENAME,
  SCRIPT_ENTRY_FILENAME,
  BS_SERVER_NAME
} from '../config';

const entryFile = new RegExp(`${SCRIPT_ENTRY_FILENAME}\.(js|jsx)$`);
const bundledFile = `${SCRIPT_BUNDLE_FILENAME}.js`;

const createBundle = (entry, watching) => {
  const pattern = new RegExp(`^.+?${DIR_SRC}${path.sep}`);
  const output = entry.replace(pattern, '').replace(entryFile, bundledFile);
  const bs = BrowserSync.get(BS_SERVER_NAME);
  const bundler = browserify(entry, {
    cache: {},
    packageCache: {},
    debug: true
  }).transform('babelify', {sourceMaps: true})
    .on('error', function (err) {
      console.error(err);
      this.emit('end');
    });

  if (watching) {
    bundler.plugin(watchify);
    bundler.on('update', () => {
      logRebuilding();
      return bundle();
    });
  }

  function bundle() {
    bundler.bundle()
      .pipe(source(output))
      .pipe(buffer())
      .pipe(gulp.dest(DIR_DEST))
      .pipe(gulpIf(watching, bs.stream({once: true})));
  }

  return bundle();

};

export default function (done, watching) {
  const files = glob.sync(SRC_SCRIPT);
  files.forEach((file)=> {
    createBundle(file, watching);
  });
}

export function cleanScript() {
  const sources = glob.sync(SRC_SCRIPT);
  const targets = sources.map(file => file.replace(DIR_SRC, DIR_DEST).replace(entryFile, bundledFile));
  return clean(targets);
}

