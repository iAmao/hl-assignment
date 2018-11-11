import types from './../actions/types';
import { wrapReducer } from '../util';

const initialState = {
  apartments: {
    items: []
  },
  isLoading: true,
  error: null
};

export default wrapReducer({
  [types.FETCH_APARTMENTS_LIST]: {
    pending: (state, payload) => ({ ...state, isLoading: true }),
    success: (state, payload) => ({ ...state, apartments: payload.apartments }),
    failed: (state, payload) => ({ ...state, error: payload.errors[0] })
  }
}, initialState);
