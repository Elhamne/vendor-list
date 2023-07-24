import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faL, faStar } from '@fortawesome/free-solid-svg-icons';
import { fetchVendors } from '../action/vendorAction';
import UiVirtualScroll from './UiVirtualScroll';

const Vendors = () => {
  const dispatch = useDispatch();
  // const buffer = 10 * 3;
  const offset = 0;
  const expressDelivery = 'ارسال اکسپرس';
  const sellerDelivery = 'پیک فروشنده';

  const [vendorsList, setVendorsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isNextCall, setIsNextCall] = useState(false);

  const vendors = useSelector((state) => state.vendors);
  const { theVendors, loading, success, error } = vendors;

  useEffect(() => {
    setIsLoading(loading);
    if (theVendors && success) {
      if (isNextCall) {
        const newVendors = [
          ...vendorsList,
          theVendors.filter((vendor) => vendor.type === 'VENDOR'),
        ];
        setVendorsList(newVendors.flat());
      } else {
        setVendorsList(theVendors.filter((vendor) => vendor.type === 'VENDOR'));
      }
    } else if (error) {
      console.error(error);
    }
  }, [theVendors, loading, success, error]);

  useEffect(() => {
    dispatch(fetchVendors(offset));
  }, []);

  console.log(vendorsList);
  // const prevCallback = (newOffset) => {
  //   dispatch(fetchVendors(newOffset));
  // };

  const nextCallback = (newOffset) => {
    dispatch(fetchVendors(newOffset));
    setIsNextCall(true);
  };

  return (
    <>
      <Link to="/" className="link">
        Back to home
      </Link>

      <UiVirtualScroll
        rowHeight={300}
        height="95vh"
        limit={10}
        // onPrevCallback={prevCallback}
        onNextCallback={nextCallback}
      >
        <div className="card-container">
          {vendorsList.map((vendor, index) => (
            <div key={index} className="card">
              {isLoading ? (
                <>Loading...</>
              ) : (
                <>
                  <div className="card-cover">
                    <img src={vendor.data.backgroundImage} alt="cover" />
                  </div>
                  <div className="card-logo">
                    <img src={vendor.data.logo} alt="resturant-logo" />
                  </div>
                  <div className="card-body">
                    <div className="header">
                      <div className="title">{vendor.data.title}</div>
                      <div className="rate">
                        <span>
                          <FontAwesomeIcon icon={faStar} />
                          {vendor.data.rate}
                        </span>
                        <span>({vendor.data.voteCount})</span>
                      </div>
                    </div>
                    <div className="desc">{vendor.data.description}</div>
                    <div className="footer">
                      <div className="delivery">
                        <span>
                          {vendor.data.badges[0]?.title
                            ? expressDelivery
                            : sellerDelivery}
                        </span>
                        <span>
                          {parseInt(vendor.data.deliveryFee).toLocaleString()}{' '}
                          تومان
                        </span>
                      </div>
                      {vendor.data.max_eta !== -1 ? (
                        <div className="time">
                          تا {vendor.data.max_eta} دقیقه
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </UiVirtualScroll>
    </>
  );
};

export default Vendors;
