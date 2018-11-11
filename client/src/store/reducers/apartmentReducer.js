import types from './../actions/types';
import { wrapReducer } from '../util';

const initialState = {
  apartment: {},
  isLoading: true,
  error: null
};

export default wrapReducer({
  [types.FETCH_APARTMENT]: {
    pending: (state, payload) => ({ ...state, isLoading: true }),
    success: (state, payload) => ({ ...state, apartment: payload.apartment }),
    failed: (state, payload) => ({ ...state, error: payload.errors[0] })
  }
}, initialState);
