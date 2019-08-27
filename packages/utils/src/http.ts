import * as R from 'ramda';

export const wrapResponse = (data = {}) => R.objOf('data', data);

export const wrapPaginatedResponse = R.applySpec({
  meta: R.prop('pagination'),
  data: R.prop('data'),
});

