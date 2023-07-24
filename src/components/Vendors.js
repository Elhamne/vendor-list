import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { fetchVendors } from '../action/vendorAction';
import UiVirtualScroll from './UiVirtualScroll';

const Vendors = () => {
  const dispatch = useDispatch();
  // const buffer = 10 * 3;
  const expressDelivery = 'ارسال اکسپرس';
  const sellerDelivery = 'پیک فروشنده';

  const [offset, setOffset] = useState(0);
  const [vendorsList, setVendorsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const vendors = useSelector((state) => state.vendors);
  const loading = useSelector((state) => state.loading);
  const success = useSelector((state) => state.success);

  useEffect(() => {
    setIsLoading(loading);
    if (vendors && success) {
      const newVendors = [
        ...vendorsList,
        vendors.filter((vendor) => vendor.type === 'VENDOR'),
      ];
      setVendorsList(newVendors.flat());
      // setVendorsList(vendors.filter((vendor) => vendor.type === 'VENDOR'));
    }
    console.log('effect call');
  }, [vendors, loading, success]);

  useEffect(() => {
    dispatch(fetchVendors(offset));
  }, []);

  console.log(vendors, success, loading);
  const prevCallback = (newOffset) => {
    dispatch(fetchVendors(newOffset));
  };

  const nextCallback = (newOffset) => {
    dispatch(fetchVendors(newOffset));
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
        onPrevCallback={prevCallback}
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
