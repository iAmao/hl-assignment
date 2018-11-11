import types from './../actions/types';
import { wrapReducer } from '../util';

const initialState = {
  locations: {},
  isLoading: true,
  error: null
};

export default wrapReducer({
  [types.FETCH_LOCATIONS_LIST]: {
    pending: (state, payload) => ({ ...state, isLoading: true }),
    success: (state, payload) => ({
      ...state,
      locations: payload.locations.items.reduce((acc, location) => {
        acc[location._id] = { ...location, apartments: [], isLoading: false };
        return acc;
      }, {})
    }),
    failed: (state, payload) => ({ ...state, error: payload.errors[0] })
  },
  [types.FETCH_LOCATION_APARTMENTS_LIST]: {
    pending: (state, payload) => ({
      ...state,
      locations: {
        ...state.locations,
        [payload._id]: {
          ...state.locations[payload._id],
          isLoading: true
        }
      }
    }),
    success: (state, payload) => ({
      ...state,
      locations: {
        ...state.locations,
        [payload.locationId]: {
          ...state.locations[payload.locationId],
          apartments: payload.apartments.items,
          isLoading: false
        }
      }
    }),
    failed: (state, payload) => ({
      ...state,
      error: payload.errors[0],
      locations: {
        ...state.locations,
        [payload.locationId]: {
          ...state.locations[payload.locationId],
          isLoading: false
        }
      }
    })
  }
}, initialState);
