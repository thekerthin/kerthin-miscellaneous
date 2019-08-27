import * as R from 'ramda';

const getData = R.nth(1);
const getCount = R.nth(2);
const getPage = R.compose(R.prop('page'), R.nth(0));
const getLimit = R.compose(R.prop('limit'), R.nth(0));
const getTotalPages = R.compose(Math.ceil, R.converge(R.divide, [getCount, getLimit]));

const applyPaginationResult = R.applySpec({
  data: getData,
  pagination: {
    count: getCount,
    totalPages: getTotalPages,
    page: getPage,
    limit: getLimit,
  },
});

export const toPaginatedResult = R.useWith(R.compose(applyPaginationResult, R.concat), [R.of, R.identity]);

export const applyPaginationDefaults = R.mergeDeepRight({
  limit: 100,
  page: 1,
  sort: 'desc',
});
