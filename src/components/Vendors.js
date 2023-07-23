import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVendors } from '../action/vendorAction';

const Vendors = () => {
  const dispatch = useDispatch();
  const [vendorsList, setVendorsList] = useState([]);

  const vendors = useSelector((state) => state.vendors);

  useEffect(() => {
    if (vendors) {
      console.log('api response', vendors);
      setVendorsList(vendors.data.finalResult);
    }
  }, [vendors]);

  console.log(vendorsList);

  useEffect(() => {
    dispatch(fetchVendors());
  }, []);

  return (
    <>
      <Link to="/">Back to home</Link>
      <div className="card-container">
        <div className="card">
          <div className="card-cover">
            <img src="" alt="cover" />
          </div>
          <div className="card-logo">
            <img src="" alt="resturant-logo" />
          </div>
          <div className="card-body">
            <div className="header">
              <div className="title">تهیه غذای پارسا</div>
              <div className="rate">۴.۸</div>
            </div>
            <div className="desc">ایرانی سنتی</div>
            <div className="footer">
              <div className="delivery">
                <span>ارسال اکسپرس</span>
                <span>۷۰۰۰ تومان</span>
              </div>
              <div className="time">تا ۳۵ دقیقه</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Vendors;
