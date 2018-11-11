import React, {Component} from 'react';
import {ApolloProvider} from 'react-apollo';
import {Provider} from 'react-redux';

import client from './apollo/ApolloClient';
import store from './store/index';

import HomeLikeRoute from './routes/index';


class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <HomeLikeRoute />
        </Provider>
      </ApolloProvider>
    );
  }
}

export default App;
