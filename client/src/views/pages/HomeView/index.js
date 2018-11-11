import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Component import
import Loader from '../../components/Loader';
import CenterPage from '../../components/CenterPage';
import ApartmentsList from '../../components/ApartmentsList';

// Higher order components import
import withPageError from '../../HOCs/withPageError';

// Actions import
import { fetchApartments } from '../../../store/actions/apartmentsListActions';


class HomeView extends React.Component {
  componentDidMount() {
    this.props.fetchApartments();
  }

  render() {
    const { loading, apartmentsList } = this.props;

    if (loading) {
      return (
        <CenterPage>
          <Loader.Pulse message="Loading beautiful homes for you..." />
        </CenterPage>
      );
    }

    return (
      <div className="container-list container-lg clearfix">
        <div className="col-12 float-left">
          <div className="view-apartment-list">
            <ApartmentsList apartments={apartmentsList.items} />
          </div>
        </div>
      </div>
    );
  }
}

HomeView.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool,
  apartmentsList: PropTypes.shape({
    items: PropTypes.array
  }),
  fetchApartments: PropTypes.func
};

const mapStateToProps = state => ({
  error: state.apartmentsList.error,
  loading: state.apartmentsList.isLoading,
  apartmentsList: state.apartmentsList.apartments
});

export default connect(mapStateToProps, { fetchApartments })(
  withPageError(HomeView)
);
