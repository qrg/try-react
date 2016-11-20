'use strict';

import {extname} from 'path';
import gulp from 'gulp';
import sass from 'gulp-sass';
import gulpIf from 'gulp-if';

import glob from 'glob';
import BrowserSync from 'browser-sync';

import {watch} from './watch';
import clean from '../lib/clean';

import {
  DIR_SRC,
  DIR_DEST,
  SRC_STYLE,
  WATCH_PATTERN_STYLE,
  BS_SERVER_NAME
} from '../config';

const isSass = (file) => {
  return ['.sass', '.scss'].includes(extname(file.path));
};

export default function buildStyle() {
  return gulp.src(SRC_STYLE, {base: DIR_SRC})
    .pipe(gulpIf(isSass, sass().on('error', sass.logError)))
    .pipe(gulp.dest(DIR_DEST));
}

export function watchStyle() {
  const bs = BrowserSync.get(BS_SERVER_NAME);
  return watch(WATCH_PATTERN_STYLE, () => {
    buildStyle().pipe(bs.stream({once: true}));
  });
}

export function cleanStyle() {
  const sources = glob.sync(SRC_STYLE);
  const targets = sources.map(file => file.replace(DIR_SRC, DIR_DEST));
  return clean(targets);
}
