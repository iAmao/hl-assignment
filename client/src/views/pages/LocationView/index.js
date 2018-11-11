import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Component import
import Loader from '../../components/Loader';
import CenterPage from '../../components/CenterPage';
import LocationTile from '../../components/LocationTile';
import ApartmentsList from '../../components/ApartmentsList';

// Higher order components import
import withPageError from '../../HOCs/withPageError';

// Actions import
import { fetchLocations } from '../../../store/actions/locationActions';
import {
  fetchLocationApartments
} from '../../../store/actions/apartmentsListActions';

import './style.css';


class LocationView extends React.Component {
  state = {
    selectedLocation: null
  }

  componentDidMount () {
    this.props.fetchLocations();
  }

  handleSelectLocation = ({ _id }) => {
    this.setState({ selectedLocation: _id }, () => {
      const { locations } = this.props;
      const { selectedLocation } = this.state;
      if (!locations[selectedLocation].apartments.length) {
        this.props.fetchLocationApartments(_id);
      }
    });
  }

  showApartmentLoader = () => {
    const { locations } = this.props;
    return !Object.values(locations).every(location => !location.isLoading);
  }

  renderLocations = () => {
    const { selectedLocation } = this.state;

    return Object.values(this.props.locations).map((location) => {
      return (
        <LocationTile
          key={location._id}
          location={location}
          onClick={this.handleSelectLocation}
          selected={selectedLocation === location._id}
        />
      );
    });
  }

  renderApartmentLoader = () => {
    const { locations } = this.props;
    const { selectedLocation } = this.state;
    const { title } = locations[selectedLocation];

    return (
      <CenterPage className="location-apartments-loader">
        <Loader.Pulse message={`Loading beautiful homes in ${title}...`} />
      </CenterPage>
    );
  }

  render() {
    const { loading, locations } = this.props;
    const { selectedLocation } = this.state;

    if (loading) {
      return (
        <CenterPage>
          <Loader.Pulse message="Loading locations..." />
        </CenterPage>
      );
    }

    return (
      <div className="container-list container-lg clearfix">
        <div className="col-12">
          <div className="row locations-list">
            {this.renderLocations()}
          </div>
          {selectedLocation && <hr />}
          {this.showApartmentLoader() && this.renderApartmentLoader()}
          <div className="row">
            {selectedLocation && (
              <ApartmentsList
                apartments={locations[selectedLocation].apartments}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

LocationView.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool,
  locations: PropTypes.object,
  fetchLocations: PropTypes.func,
  fetchLocationApartments: PropTypes.func
}

const mapStateToProps = state => ({
  error: state.locationsList.error,
  loading: state.locationsList.isLoading,
  locations: state.locationsList.locations
});

export default connect(
  mapStateToProps,
  { fetchLocations, fetchLocationApartments }
)(withPageError(LocationView));
