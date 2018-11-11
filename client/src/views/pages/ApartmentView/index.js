import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Components import
import Loader from '../../components/Loader';
import CenterPage from '../../components/CenterPage';
import ApartmentListingImage from '../../components/ApartmentListingImage';
import ApartmentListingDetail from '../../components/ApartmentListingDetail';

// Higher order components import
import withPageError from '../../HOCs/withPageError';

// Actions import
import { fetchApartment } from '../../../store/actions/apartmentActions';


class ApartmentView extends React.Component {
  componentDidMount() {
    const { match: { params } } = this.props;
    const { apartmentId } = params;
    this.props.fetchApartment(apartmentId);
  }

  renderEmpty = () => {
    return (
      <CenterPage>
        <h4>No information about this apartment</h4>
      </CenterPage>
    );
  }

  renderLoader = () => {
    return (
      <CenterPage>
        <Loader.Pulse message="Loading apartment information..." />
      </CenterPage>
    );
  }

  render() {
    const { apartment, loading } = this.props;
    if (loading) {
      return this.renderLoader();
    }

    if (!apartment) {
      return this.renderEmpty();
    }

    const images = apartment.images;
    const image = `http://localhost:5000/images/apartments/${images[0]}`;

    return (
      <div className='container-fl clearfix'>
        <div className='col-12'>
          <div className='view-apartment'>
            <div className="view-apartment-item">
              <div className="view-apartment-item-content">
                <div className="_3im4pDXrDfzNRT2AlvLfD6">
                  <ApartmentListingImage
                    image={image}
                    price={apartment.price}
                    style={{ backgroundSize: 'contain' }}
                  />
                  <ApartmentListingDetail
                    withOwner
                    size={apartment.size}
                    title={apartment.title}
                    owner={apartment.owner}
                    amenities={apartment.amenities}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ApartmentView.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string,
  apartment: PropTypes.shape({
    _id: PropTypes.string,
    images: PropTypes.array,
    price: PropTypes.number,
    size: PropTypes.number,
    title: PropTypes.string,
    amenities: PropTypes.array,
    owner: PropTypes.shape({
      _id: PropTypes.string,
      email: PropTypes.string
    })
  }),
  fetchApartment: PropTypes.func
};

const mapStateToProps = state => ({
  loading: state.apartmentItem.isLoading,
  apartment: state.apartmentItem.apartment
});

export default connect(mapStateToProps, { fetchApartment })(
  withPageError(ApartmentView)
);
