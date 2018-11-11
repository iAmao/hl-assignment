export const generateStateTypes = (types) => {
  return types.reduce((acc, type) => {
    acc[type] = type;
    acc[`${type}__PENDING`] = `${type}__PENDING`;
    acc[`${type}__SUCCESS`] = `${type}__SUCCESS`;
    acc[`${type}__FAILED`] = `${type}__FAILED`;
    return acc;
  }, {});
};

const asyncActionMetadata = { pending: {}, success: {}, failed: {} };

export const asyncAction = (
  pending, success, failed, fn, metadata = asyncActionMetadata
) => {
  return (dispatch) => {
    dispatch({ type: pending, payload: { ...metadata.pending } });
    return fn()
      .then(response => dispatch({
        type: success,
        payload: { ...response.data, ...metadata.success }
      }))
      .catch(error => {
        return dispatch({
          type: failed,
          payload: { errors: parseErrors(error), ...metadata.failed }
        });
      });
  };
};

const parseErrors = (error) => {
  if (!error.graphQLErrors.length) {
    const errorString = error.toString();
    if (errorString.match('Network error')) {
      return ['Could not complete request, please check your connection'];
    }
    return [errorString];
  }
  return error.graphQLErrors
}

export const wrapReducer = (matchCase, init={}) => {
  return function (state = init, { type, payload }) {
    const parsedType = parseType(type)
    if (!matchCase[parsedType]) {
      return { ...state };
    }
    if (type.match('__SUCCESS')) {
      return matchCase[parsedType]
        .success({ ...state, isLoading: false }, payload);
    } else if (type.match('__FAILED')) {
      return matchCase[parsedType]
        .failed({ ...state, isLoading: false }, payload);
    }
    return typeof matchCase[parsedType] !== 'function'
      ? matchCase[parsedType].pending({ ...state }, payload)
      : matchCase[parsedType]({ ...state }, payload);
  }
}

const parseType = (type) => {
  if (type.match('__SUCCESS')) {
    return type.slice(0, type.indexOf('__SUCCESS'))
  } else if (type.match('__FAILED')) {
    return type.slice(0, type.indexOf('__FAILED'))
  } else if (type.match('__PENDING')) {
    return type.slice(0, type.indexOf('__PENDING'))
  }
  return type;
}
