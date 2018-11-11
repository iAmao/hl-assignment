import 'jest-dom/extend-expect'
import React from 'react';
import { Provider } from 'react-redux';
import { render, wait } from 'react-testing-library';
import { MockedProvider } from 'react-apollo/test-utils';
import {
  APARTMENTS_WITH_PAGINATION
} from '../../../../store/actions/apartmentsListActions';
import store from '../../../../store';
import HomeView from '../';


const mocks = [
  {
    request: {
      query: APARTMENTS_WITH_PAGINATION
    },
    result: {
      data: {
        apartments: { items: [], __typename: 'ApartmentsWithPagination'}
      }
    }
  }
];

const loadingMessage = 'Loading beautiful homes for you...';

test('renders without crashing', async () => {
  const { queryByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Provider store={store}>
        <HomeView />
      </Provider>
    </MockedProvider>
  );
  expect(queryByText(loadingMessage)).toBeInTheDocument();
  await wait(() =>
    expect(queryByText(loadingMessage)).not.toBeInTheDocument()
  )
});
