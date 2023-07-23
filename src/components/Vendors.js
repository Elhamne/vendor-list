import React from 'react';
import { Link } from 'react-router-dom';

const Vendors = () => (
  <>
    <Link to="/">Back to home</Link>
    <div className="card-container">
      <div className="card">
        <div className="cover">
          <img src="" alt="cover" />
        </div>
        <div className="logo">
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

export default Vendors;
