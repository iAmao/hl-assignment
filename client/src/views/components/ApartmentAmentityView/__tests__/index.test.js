import 'jest-dom/extend-expect'
import React from 'react';
import { render, wait } from 'react-testing-library';
import ApartmentAmentityView from '../';


test('Displays 3 amenities list by default', async () => {
  const { container, queryByText } = render(
    <ApartmentAmentityView
      amenities={['television', 'curtains', 'radio']}
    />
  );

  expect(queryByText('radio')).toBeInTheDocument();
  expect(queryByText('curtains')).toBeInTheDocument();
  expect(queryByText('television')).toBeInTheDocument();
  expect(container.children.length).toEqual(3);
});

test('Display only one amenities', async () => {
  const { container, queryByText } = render(
    <ApartmentAmentityView amenities={['television', 'curtains']} limit={1} />
  );

  expect(container.children.length).toEqual(1);
  expect(queryByText('television')).toBeInTheDocument();
});
