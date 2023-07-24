import { VENDORS_REQUEST, VENDORS_SUCCESS, VENDORS_FAIL } from '../constants';

export const vendorsReducer = (state = {}, action) => {
  switch (action.type) {
    case VENDORS_REQUEST:
      return { loading: true, success: false };
    case VENDORS_SUCCESS:
      return { loading: false, success: true, theVendors: action.payload };
    case VENDORS_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};
