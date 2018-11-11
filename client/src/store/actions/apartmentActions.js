import types from './types';
import gql from "graphql-tag";
import client from '../../apollo/ApolloClient';

import { asyncAction } from '../util';

export const fetchApartment = (_id) => {
  return asyncAction(
    types.FETCH_APARTMENT__PENDING,
    types.FETCH_APARTMENT__SUCCESS,
    types.FETCH_APARTMENT__FAILED,
    () => {
      return client.query({
        query: gql`
        {
          apartment(_id: "${_id}") {
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
            images
            amenities
            details {
              rooms
              bedrooms
              floor
              bathrooms
            }
            services
          }
        }`
      });
    }
  );
};
