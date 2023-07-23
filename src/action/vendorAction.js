import axios from 'axios';
import { VENDORS_REQUEST, VENDORS_SUCCESS, VENDORS_FAIL } from '../constants';

export const fetchVendors = (page) => async (dispatch) => {
  try {
    dispatch({ type: VENDORS_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'aplication/json',
      },
    };
    const { data } = await axios.get(
      `https://snappfood.ir/mobile/v3/restaurant/vendors-list?page=${page}&page-size=10&lat=35.754&long=51.328`,
      config
    );
    dispatch({ type: VENDORS_SUCCESS, payload: data.data.finalResult });
  } catch (e) {
    dispatch({
      type: VENDORS_FAIL,
      payload: e.response.data,
    });
  }
};
