import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '../../components/Button';
import Loader from '../../components/Loader';
import CenterPage from '../../components/CenterPage';
import ApartmentsList from '../../components/ApartmentsList';
import ApartmentFilterView from '../../components/ApartmentFilterView';

// Higher order components import
import withPageError from '../../HOCs/withPageError';

// Actions import
import { fetchLocations } from '../../../store/actions/locationActions';
import { clearSearchResults } from '../../../store/actions/searchActions';
import {
  searchApartmentsByMultipleLocations
} from '../../../store/actions/apartmentsListActions';

import './style.css';


const rangeOptions = { min: 'max', max: 'min' };
const generateFilterObject = () => ({
  size: { min: 0, max: 0 },
  price: { min: 0, max: 0 },
  amenity: { value: '', list: [] },
  service: { value: '', list: [] },
  details: {
    rooms: { min: 0, max: 0 },
    bedrooms: { min: 0, max: 0 },
    bathrooms: { min: 0, max: 0 },
    floor: { min: 0, max: 0 },
  }
});


class SearchView extends React.Component {
  state = {
    query: '',
    showFilter: false,
    isFilterDirty: false,
    locationNotFound: false,
    filters: generateFilterObject()
  }

  componentDidMount () {
    this.props.fetchLocations();
  }

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value, locationNotFound: false });
  }

  handleFilterChange = (name, value) => {
    const { filters } = this.state;
    let parsedValue = value;

    if (value.length && !isNaN(+value)) {
      parsedValue = Math.abs(+value);
    }

    const [ criteria, ...keys ] = name.split('-');

    if (keys.length > 1) {
      if (rangeOptions[keys[1]]) {
        filters[criteria][keys[0]] = this.handleRangeFilter(
          filters[criteria][keys[0]], parsedValue
        );
      }
      filters[criteria][keys[0]][keys[1]] = parsedValue;
    } else {
      if (rangeOptions[keys[0]]) {
        filters[criteria] = this.handleRangeFilter(
          filters[criteria], parsedValue
        );
      }
      filters[criteria][keys[0]] = parsedValue;
    }

    this.changeFilterState(filters);
  }

  handleRangeFilter = (oldValues, newValue) => {
    let parsedNewValue = newValue;

    if (newValue.constructor === String) {
      parsedNewValue = 0;
    }

    return {
      min: Math.min(oldValues.min, parsedNewValue),
      max: Math.max(oldValues.max, parsedNewValue)
    };
  }

  handleFilterSelect = (option, newValue) => {
    const { filters } = this.state;
    const { list } = filters[option];

    if (filters[option].value.length) {
      const selected = list.find(item =>
          item.toLowerCase() === newValue.toLowerCase());
      if (!selected) {
        filters[option].list.push(newValue);
      }
      filters[option].value = '';
      this.changeFilterState(filters);
    }
  }

  handleFilterRemove = (option, value) => {
    const { filters } = this.state;
    const { list } = filters[option];

    const selected = list.findIndex(item =>
        item.toLowerCase() === value.toLowerCase());
    if (selected >= 0) {
      const newList = [...list];
      newList.splice(selected, 1);
      filters[option].list = newList;
      this.changeFilterState(filters);
    }
  }

  handleClearFilter = () => {
    this.setState({
      showFilter: false,
      isFilterDirty: false,
      filters: generateFilterObject()
    }, this.handleSearch);
  }

  handleSubmitFilter = () => {
    this.handleSearch(null, true);
  }

  changeFilterState = (filters) => {
    this.setState({ filters, isFilterDirty: true });
  }

  searchLocation = () => {
    const { query } = this.state;
    return this.props.locations.reduce((acc, { _id, title }) => {
      title.toLowerCase().match(query.toLowerCase()) && acc.push(_id);
      return acc;
    }, []);
  }

  handleSearch = (e, withFilter = false) => {
    const { filters, isFilterDirty } = this.state;
    this.props.clearSearchResults();
    this.setState({ locationNotFound: false });

    const locations = this.searchLocation();
    if (!locations.length) {
      this.setState({ locationNotFound: true });
    }
    if (withFilter || isFilterDirty) {
      this.props.searchApartmentsByMultipleLocations(locations, filters);
    } else {
      this.props.searchApartmentsByMultipleLocations(locations);
    }
  }

  toggleFilterView = () => {
    const { showFilter } = this.state;
    this.setState({ showFilter: !showFilter });
  }

  renderResults = () => {
    const { query, locationNotFound } = this.state;
    const { isDirty, results, loading } = this.props;

    if (loading) {
      return (
        <CenterPage className="location-apartments-loader">
          <Loader.Pulse message={`Searching beautiful homes...`} />
        </CenterPage>
      );
    } else if (locationNotFound || (isDirty && !results.length)) {
      return (
        <div className="search-not-found">
          <h4>Sorry we currently have no available apartments in {query}</h4>
        </div>
      );
    } else if (results.length) {
      return (
        <div className="row">
          <ApartmentsList apartments={results} />
        </div>
      );
    }
  }

  render () {
    const { query, showFilter, filters } = this.state;

    return (
      <div className="container-list container-lg clearfix">
        <div className="col-12">
          <div className="search-container">
            <div>
              <input
                name="query"
                type="search"
                value={query}
                placeholder="Enter Location..."
                className="search-bar col-sm-10"
                onChange={this.handleInputChange}
              />
              <Button className="col-sm-2" onClick={this.handleSearch}>
                Search
              </Button>
              <br /><br />
              <ApartmentFilterView
                values={filters}
                show={showFilter}
                onCancel={this.handleClearFilter}
                onChange={this.handleFilterChange}
                onSubmit={this.handleSubmitFilter}
                onSelect={this.handleFilterSelect}
                onRemove={this.handleFilterRemove}
                toggleView={this.toggleFilterView}
              />
            </div>
            <div>
              {this.renderResults()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SearchView.propTypes = {
  isDirty: PropTypes.bool,
  loading: PropTypes.bool,
  locations: PropTypes.array,
  fetchLocations: PropTypes.func,
  clearSearchResults: PropTypes.func,
  searchApartmentsByMultipleLocations: PropTypes.func,
  results: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    images: PropTypes.array,
    price: PropTypes.number,
    size: PropTypes.number,
    title: PropTypes.string,
    amenities: PropTypes.array,
    services: PropTypes.array,
    details: PropTypes.shape({
      rooms: PropTypes.number,
      bedrooms: PropTypes.number,
      bathrooms: PropTypes.number,
      floor: PropTypes.number,
    }),
    owner: PropTypes.shape({
      _id: PropTypes.string,
      email: PropTypes.string
    })
  }))
}

const mapStateToProps = state => ({
  isDirty: state.search.isDirty,
  results: state.search.results,
  loading: state.search.isLoading,
  locations: state.search.locations
});

export default connect(
  mapStateToProps,
  { fetchLocations, clearSearchResults, searchApartmentsByMultipleLocations }
)(withPageError(SearchView));
