import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Page Components
import HomeView from '../views/pages/HomeView';
import SearchView from '../views/pages/SearchView';
import LocationView from '../views/pages/LocationView';
import ApartmentView from '../views/pages/ApartmentView';

// components
import MiniNav from '../views/components/MiniNav';


const HomeLikeRoute = () => {
  return (
    <div>
      <MiniNav />
      <Router>
        <div>
          <Route exact path="/" component={HomeView} />
          <Route path="/search" component={SearchView} />
          <Route path="/locations" component={LocationView} />
          <Route exact path="/apartments/:apartmentId" component={ApartmentView}/>
        </div>
      </Router>
    </div>
  );
}

export default HomeLikeRoute;
