'use strict';

import gulp from 'gulp';

import {reformatGulpLog} from './lib/log';
import clean from './lib/clean';
import {DIR_DEST} from './config';

import watch from './task/watch';
import buildTemplate, {cleanTemplate} from './task/build-template';
import buildStyle, {cleanStyle} from './task/build-style';
import buildScript, {cleanScript} from './task/build-script';

reformatGulpLog();

gulp.task('default', [
  'watch'
]);

gulp.task('build', [
  'clean:dest',
  'build:template',
  'build:script',
  'build:style'
]);

gulp.task('build:template', ['clean:template'], buildTemplate);
gulp.task('build:style', ['clean:style'], buildStyle);
gulp.task('build:script', ['clean:script'], (done) => {
  buildScript(done);
});

gulp.task('clean:dest', () => clean([DIR_DEST]));
gulp.task('clean:template', cleanTemplate);
gulp.task('clean:style', cleanStyle);
gulp.task('clean:script', cleanScript);

gulp.task('watch', watch);
