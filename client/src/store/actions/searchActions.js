import types from './types';

export const clearSearchResults = () => {
  return { type: types.CLEAR_SEARCH_RESULTS, payload: {} };
};
