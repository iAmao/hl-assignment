import React from 'react';
import CenterPage from '../../components/CenterPage';


const withPageError = (Component) => {
  return class extends React.Component {
    static getDerivedStateFromProps (props, state) {
      if (props.error) {
        return { ...state, error: props.error };
      }
      return { ...state };
    }

    state = { error: null }

    renderError = () => {
      return (
        <CenterPage>
          {this.state.error}
        </CenterPage>
      );
    }

    render () {
      if (this.state.error) {
        return this.renderError();
      }

      return (
        <Component {...this.props} />
      );
    }
  }
};

export default withPageError;
