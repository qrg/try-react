'use strict';

import del from 'del';
import {logDeleted} from '../lib/log';

export default function (paths) {
  return del(paths).then(logDeleted);
}
