import * as R from 'ramda';

export const wrapResponse = R.objOf('data');

export const wrapPaginatedResponse = R.applySpec({
  meta: R.prop('pagination'),
  data: R.prop('data'),
});

