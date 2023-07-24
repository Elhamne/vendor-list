import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const expressDelivery = 'ارسال اکسپرس';
const sellerDelivery = 'پیک فروشنده';

const VendorCard = ({ vendor }) => (
  <>
    <div className="card-cover">
      <img src={vendor.backgroundImage} alt="cover" />
    </div>
    <div className="card-logo">
      <img src={vendor.logo} alt="resturant-logo" />
    </div>
    <div className="card-body">
      <div className="header">
        <div className="title">{vendor.title}</div>
        <div className="rate">
          <span>
            <FontAwesomeIcon icon={faStar} />
            {vendor.rate}
          </span>
          <span>({vendor.voteCount})</span>
        </div>
      </div>
      <div className="desc">{vendor.description}</div>
      <div className="footer">
        <div className="delivery">
          <span>
            {vendor.badges[0]?.title ? expressDelivery : sellerDelivery}
          </span>
          <span>{parseInt(vendor.deliveryFee).toLocaleString()} تومان</span>
        </div>
        {vendor.max_eta !== -1 ? (
          <div className="time">تا {vendor.max_eta} دقیقه</div>
        ) : (
          ''
        )}
      </div>
    </div>
  </>
);

export default VendorCard;
