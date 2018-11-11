import 'jest-dom/extend-expect'
import React from 'react';
import { render, wait, fireEvent } from 'react-testing-library';
import ApartmentFilterView from '../';


const props = {
  show: true,
  onCancel: jest.fn(),
  onChange: jest.fn(),
  onSubmit: jest.fn(),
  onSelect: jest.fn(),
  onRemove: jest.fn(),
  toggleView: jest.fn(),
  values: {
    size: { min: 0, max: 35 },
    price: { min: 0, max: 350 },
    amenity: {
      value: '',
      list: ['television']
    },
    service: {
      value: '',
      list: ['cleaning']
    },
    details: {
      rooms: { min: 0, max: 5 },
      floor: { min: 0, max: 3 },
      bedrooms: { min: 0, max: 2 },
      bathrooms: { min: 0, max: 1 }
    }
  }
};

test('Displays apartment filters', () => {
  const { queryByText } = render(
    <ApartmentFilterView
      {...props}
    />
  );

  expect(queryByText('television')).toBeInTheDocument();
  expect(queryByText('cleaning')).toBeInTheDocument();
  expect(queryByText(/clear filters/i)).toBeInTheDocument()
  expect(queryByText(/apply filters/i)).toBeInTheDocument()
  expect(queryByText(/hide filters/i)).toBeInTheDocument()
});

test('Displays show filter button', () => {
  const { queryByText } = render(
    <ApartmentFilterView
      {...props}
      show={false}
    />
  );

  expect(queryByText(/show filters/i)).toBeInTheDocument()
});

test('Displays show filter button', () => {
  const { queryByText } = render(
    <ApartmentFilterView
      {...props}
      show={false}
    />
  );

  expect(queryByText(/show filters/i)).toBeInTheDocument()
});

test('Should clear filter', () => {
  const { getByText } = render(
    <ApartmentFilterView {...props} />
  );

  fireEvent.click(getByText(/clear filters/i));
  expect(props.onCancel).toHaveBeenCalled();
});

test('Should submit filter', () => {
  const { getByText } = render(
    <ApartmentFilterView {...props} />
  );

  fireEvent.click(getByText(/apply filters/i));
  expect(props.onSubmit).toHaveBeenCalled();
});

test('Should hide filter panel', () => {
  const { getByText } = render(
    <ApartmentFilterView {...props} />
  );

  fireEvent.click(getByText(/hide filters/i));
  expect(props.toggleView).toHaveBeenCalled();
});

test('Should show filter panel', () => {
  const { getByText } = render(
    <ApartmentFilterView {...props} show={false} />
  );

  fireEvent.click(getByText(/show filters/i));
  expect(props.toggleView).toHaveBeenCalled();
});
