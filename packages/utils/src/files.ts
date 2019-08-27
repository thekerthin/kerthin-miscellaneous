import * as R from 'ramda';
import * as glob from 'glob';

export const getPrototypes = (path: string): any[] => glob.sync(path)
  .map(require)
  .map(R.prop('default'))
