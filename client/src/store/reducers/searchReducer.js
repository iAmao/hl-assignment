import types from './../actions/types';
import { wrapReducer } from '../util';
import { filterResults } from '../util/apartmentFilter';

const initialState = {
  results: [],
  locations: [],
  isLoading: false,
  error: null,
  isDirty: false
};

const concatUniqueApartment = (initialArray, newArray) => {
  return newArray.reduce((acc, apartment) => {
    if (!acc.find(item => item._id === apartment._id)) {
      acc.push(apartment);
    }
    return acc;
  }, [...initialArray]);
}


export default wrapReducer({
  [types.FETCH_LOCATIONS_LIST]: {
    pending: (state) => ({ ...state }),
    success: (state, { locations: { items } }) => ({
      ...state,
      locations: items
    }),
    failed: (state, payload) => ({ ...state, error: payload.errors[0] })
  },
  [types.FETCH_LOCATION_APARTMENTS_LIST]: {
    pending: (state, payload) => ({ ...state, isLoading: true }),
    success: (state, { apartments: { items } }) => ({
      ...state,
      results: concatUniqueApartment(state.results, items),
      isDirty: true
    }),
    failed: (state, { errors }) => ({ ...state, error: errors[0] })
  },
  [types.CLEAR_SEARCH_RESULTS]: (state) => ({ ...state, results: [] }),
  [types.FILTER_SEARCH_RESULTS]: (state, payload) => {
    return {
      ...state,
      results: filterResults([...state.results], payload)
    }
  }
}, initialState);
