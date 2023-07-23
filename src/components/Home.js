import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="container">
    <Link to="/vendors" className="link">
      Vendors
    </Link>
  </div>
);

export default Home;
