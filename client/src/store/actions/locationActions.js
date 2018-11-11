import types from './types';
import gql from "graphql-tag";
import client from '../../apollo/ApolloClient';

import { asyncAction } from '../util';


export const fetchLocations = () => {
  return asyncAction(
    types.FETCH_LOCATIONS_LIST__PENDING,
    types.FETCH_LOCATIONS_LIST__SUCCESS,
    types.FETCH_LOCATIONS_LIST__FAILED,
    () => {
      return client.query({
        query: gql`
        {
          locations {
            items {
              _id,
              title
            }
          }
        }`
      });
    }
  );
};
