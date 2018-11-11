const intersection = (array1, array2) => {
  const smallest = array1.length > array2.length ? array2 : array1;
  return smallest.reduce((acc, item) => {
    array1.find(i => i.toLowerCase() === item.toLowerCase()) &&
    array2.find(i => i.toLowerCase() === item.toLowerCase()) &&
    acc.push(item);

    return acc;
  }, []);
}


const checkRange = (min, max) => {
  if (typeof max !== 'number' || max < 1) {
    return false;
  }
  if (typeof min !== 'number') {
    return false;
  }

  const minSize = min < 0 ? 0 : min;

  return value => value >= minSize && value <= max;
};
/**
* waterfallFilter: Apply individual filters on dataset.
*                 If the name of the function is a filter param,
*                 the values of that filter param will be passed to the function
*                 else, the entire filter options will be passed in.
* @param {filters} Array - Array of functions.
*                         The result of the first is passed to the next.
* @return returns whatever the last function returns.
*/
const waterfallFilter = (filters) => {
  return (dataset, options) => {
    return filters
      .slice(1)
      .reduce((acc, filter) => {
        return filter(acc, options[filter.name] || options);
      }, filters[0](dataset, options[filters[0].name] || options));
  }
};

function size (dataset, { min, max }) {
  const isInRange = checkRange(min, max);

  return isInRange
    ? dataset.filter(apartment => isInRange(apartment.size))
    : dataset;
}

function price (dataset, { min, max }) {
  const isInRange = checkRange(min, max);
  return isInRange
    ? dataset.filter(apartment => isInRange(apartment.price))
    : dataset;
}

function amenity (dataset, { list }) {
  if (!(Array.isArray(list) && !!list.length)) {
    return dataset;
  }

  return dataset
    .filter(apartment =>
      intersection(apartment.amenities, list).length === list.length);
}

function service (dataset, { list }) {
  if (!(Array.isArray(list) && !!list.length)) {
    return dataset;
  }

  return dataset
    .filter(apartment =>
      intersection(apartment.services, list).length === list.length);
}

function details (dataset, filterOptions) {
  function rooms (dataset, { min, max }) {
    const isInRange = checkRange(min, max);

    return isInRange
      ? dataset.filter(({ details }) => isInRange(details.rooms))
      : dataset;
  }

  function floor (dataset, { min, max }) {
    const isInRange = checkRange(min, max);

    return isInRange
      ? dataset.filter(({ details }) => isInRange(details.floor))
      : dataset;
  }

  function bedrooms (dataset, { min, max }) {
    const isInRange = checkRange(min, max);

    return isInRange
      ? dataset.filter(({ details }) => isInRange(details.bedrooms))
      : dataset;
  }

  function bathrooms (dataset, { min, max }) {
    const isInRange = checkRange(min, max);

    return isInRange
      ? dataset.filter(({ details }) => isInRange(details.bathrooms))
      : dataset;
  }

  return waterfallFilter([
    rooms,
    floor,
    bedrooms,
    bathrooms
  ])(dataset, filterOptions);
}

/**
* filterResults: Filter apartments list
* @param {dataset} Array: Array of apartments
* @param {filterOptions} Object: filter options
* @return array of filtered apartments
*/
export const filterResults = (dataset, filterOptions) => {
  return waterfallFilter([
    size,
    price,
    amenity,
    service,
    details
  ])(dataset, filterOptions);
};
