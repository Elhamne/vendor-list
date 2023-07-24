import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="container">
    <Link to="/vendors" className="buttonLink">
      Vendors
    </Link>
  </div>
);

export default Home;
