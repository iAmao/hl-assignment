import { combineReducers } from 'redux';

import searchReducer from './searchReducer';
import apartmentReducer from './apartmentReducer';
import locationsListReducer from './locationsListReducer';
import apartmentsListReducer from './apartmentsListReducer';


export default combineReducers({
  search: searchReducer,
  apartmentItem: apartmentReducer,
  apartmentsList: apartmentsListReducer,
  locationsList: locationsListReducer
});
