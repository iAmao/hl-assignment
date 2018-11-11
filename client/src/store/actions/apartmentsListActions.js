import types from './types';
import gql from "graphql-tag";

import { asyncAction } from '../util';
import client from '../../apollo/ApolloClient';


export const APARTMENTS_WITH_PAGINATION = gql`
{
  apartments(active: true) {
    items {
      _id
      owner {
      _id
        email
      }
      title
      location {
        title
      }
      size
      price
      amenities
      images
    }
  }
}`;


export const fetchApartments = () => {
  return asyncAction(
    types.FETCH_APARTMENTS_LIST__PENDING,
    types.FETCH_APARTMENTS_LIST__SUCCESS,
    types.FETCH_APARTMENTS_LIST__FAILED,
    () => {
      return client.query({
        query: APARTMENTS_WITH_PAGINATION
      });
    }
  );
};

export const fetchLocationApartments = (_id) => {
  return asyncAction(
    types.FETCH_LOCATION_APARTMENTS_LIST__PENDING,
    types.FETCH_LOCATION_APARTMENTS_LIST__SUCCESS,
    types.FETCH_LOCATION_APARTMENTS_LIST__FAILED,
    () => {
      return client.query({
        query: gql`
        {
          apartments (location: "${_id}"){
            total
            items {
              _id
              title
              size
              price
              amenities
              services
              images
              details {
                rooms
                floor
                bedrooms
                bathrooms
              }
            }
          }
        }`
      });
    },
    {
      pending: { _id },
      success: { locationId: _id },
      failed: { locationId: _id }
    }
  );
};

export const searchApartmentsByMultipleLocations = (locations, filter=null) => {
  return (dispatch) => {
    const searchList = locations.map((location) => {
      return fetchLocationApartments(location)(dispatch);
    });
    if (!filter) {
      return Promise.all(searchList);
    }
    return Promise
      .all(searchList)
      .then(() => dispatch({
        type: types.FILTER_SEARCH_RESULTS,
        payload: filter
      }));
  };
};
