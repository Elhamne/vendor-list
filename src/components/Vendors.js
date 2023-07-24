import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVendors } from '../action/vendorAction';
import UiVirtualScroll from './UiVirtualScroll';
import VendorCard from './VendorCard';

const Vendors = () => {
  const dispatch = useDispatch();
  const offset = 0;
  const limit = 10;
  const buffer = limit * 3;
  const cache = buffer - limit;

  const [vendorsList, setVendorsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isNextCall, setIsNextCall] = useState(false);
  const [isPrevCall, setIsPrevCall] = useState(false);

  // Read vendors from redux state
  const vendors = useSelector((state) => state.vendors);
  const { theVendors, loading, success, error } = vendors;

  // Initial vendors list fetch
  useEffect(() => {
    dispatch(fetchVendors(offset));
  }, []);

  useEffect(() => {
    setIsLoading(loading);
    if (theVendors && success) {
      if (isNextCall) {
        const copyVendorsList =
          vendorsList.length < buffer
            ? [...vendorsList]
            : [...vendorsList.slice(-cache)];
        const newVendors = [
          ...copyVendorsList,
          theVendors.filter((vendor) => vendor.type === 'VENDOR'),
        ];
        setVendorsList(newVendors.flat());
        setIsNextCall(false);
      } else if (isPrevCall) {
        const newVendors = [
          theVendors.filter((vendor) => vendor.type === 'VENDOR'),
          ...vendorsList.slice(0, cache),
        ];
        setVendorsList(newVendors.flat());
        setIsPrevCall(false);
      } else {
        setVendorsList(theVendors.filter((vendor) => vendor.type === 'VENDOR'));
      }
    } else if (error) {
      console.error(error);
    }
  }, [theVendors, loading, success, error]);

  const prevCallback = (newOffset) => {
    dispatch(fetchVendors(newOffset));
    setIsPrevCall(true);
  };

  // Fetch next page vendors list
  const nextCallback = (newOffset) => {
    dispatch(fetchVendors(newOffset));
    setIsNextCall(true);
  };

  const renderVendorCard = (isLoading, data) => {
    if (isLoading) {
      return <>Loading ...</>;
    } else {
      return <VendorCard vendor={data} />;
    }
  };

  return (
    <>
      <Link to="/" className="link">
        Back to home
      </Link>

      <UiVirtualScroll
        rowHeight={300}
        height="95vh"
        limit={limit}
        onPrevCallback={prevCallback}
        onNextCallback={nextCallback}
      >
        <div className="card-container">
          {vendorsList.map((vendor, index) => (
            <div key={index} className="card">
              {renderVendorCard(isLoading, vendor.data)}
            </div>
          ))}
        </div>
      </UiVirtualScroll>
    </>
  );
};

export default Vendors;
