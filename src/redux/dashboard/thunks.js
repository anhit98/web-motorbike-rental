import { apiWrapper } from '../reduxCreator';
import moment from 'moment';
import { get, put } from '../../api/ParseAPI';
import { fetchListMotorbikeThunk } from '../../redux/motorbike/thunks';
import {
  countRenters,
  countMotor,
  countTotalMotors,
  countPayments,
  fetchListRenters,
  fetchListMotorbike,
  fetchLeftOrder,
  fetchRightOrder,
  fetchListOrder,
} from './actions';

export function fetchCountRentersThunk(id) {
  return dispatch => {
    apiWrapper(
      dispatch,
      get(
        `/classes/order?include=user_id&where={"shop_id":{"__type":"Pointer","className":"shop","objectId":"${id}"}}&count=1&limit=0`,
      ),
      false,
    )
      .then(data => {
        dispatch(countRenters(data.count));
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export function fetchCountMotorThunk(id, newdate, momentdate) {
  return dispatch => {
    apiWrapper(
      dispatch,
      get(
        `/classes/order?&where={"shop":{"__type":"Pointer","className":"shop","objectId":"${id}"}, "updatedAt":{"$gte":{"__type":"Date","iso":"${newdate}"},"$lte":{"__type":"Date","iso":"${momentdate}"}}}&count=1&limit=0`,
      ),
      false,
    )
      .then(data => {
        dispatch(countMotor(data.count));
      })
      .catch(err => {
        console.log(err);
      });
  };
}
export function fetchCountTotalMotorsThunk(id) {
  return dispatch => {
    // const query = JSON.stringify({ is_available: { $in: ['Có sẵn'] } });
    apiWrapper(
      dispatch,
      get(
        `/classes/motorbike?count=1&limit=0&where={"is_available":true,"shop_id":{"__type":"Pointer","className":"shop","objectId":"${id}"}}`,
      ),
      false,
    )
      .then(data => {
        console.log(data, 'gdjsauaua');
        dispatch(countTotalMotors(data.count));
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export function fetchCountPaymentsThunk(id, newdate, momentdate) {
  return dispatch => {
    apiWrapper(
      dispatch,
      get(
        `/classes/payment?&keys=total&where={"shop":{"__type":"Pointer","className":"shop","objectId":"${id}"}, "updatedAt":{"$gte":{"__type":"Date","iso":"${newdate}"},"$lte":{"__type":"Date","iso":"${momentdate}"}}}`,
      ),
      false,
    )
      .then(data => {
        dispatch(countPayments(data.results));
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export function fetchListRentersThunk(id) {
  return dispatch => {
    apiWrapper(
      dispatch,
      get(
        `/classes/order?include=user_id&where={"shop_id":{"__type":"Pointer","className":"shop","objectId":"${id}"}}`,
      ),
      false,
    )
      .then(data => {
        dispatch(fetchListRenters(data.results));
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export function fetchListMotorbikeThunks(id) {
  return dispatch => {
    apiWrapper(
      dispatch,
      get(
        `/classes/motorbike?&where={"shop_id":{"__type":"Pointer","className":"shop","objectId":"${id}"}}&count=1&limit=0`,
      ),
      false,
    )
      .then(data => {
        dispatch(fetchListMotorbike(data.count));
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export function fetchLeftOrderThunk(id) {
  return dispatch => {
    apiWrapper(
      dispatch,
      get(
        `/classes/order?include=motor_id&include=user_id&where={"is_cancel":false,"is_finished":false,"shop_id":{"__type":"Pointer","className":"shop","objectId":"${id}"}}`,
      ),
      false,
    )
      .then(data => {
        dispatch(fetchLeftOrder(data.results));
      })
      .catch(err => {
        console.log(err);
      });
  };
}
export function fetchRightOrderThunk(id) {
  return dispatch => {
    apiWrapper(
      dispatch,
      get(
        `/classes/order?include=motor_id&include=user_id&where={"is_cancel":false,"check":false,"is_finished":false,"shop_id":{"__type":"Pointer","className":"shop","objectId":"${id}"}}`,
      ),
      false,
    )
      .then(data => {
        console.log(data, 'dadadadadadaddadaaddadef123');
        dispatch(fetchRightOrder(data.results));
      })
      .catch(err => {
        console.log(err);
      });
  };
}
export function fetchListOrderThunk(id) {
  return dispatch => {
    apiWrapper(
      dispatch,
      get(
        `/classes/order?&include=user_id&include=motor_id&where={"shop_id":{"__type":"Pointer","className":"shop","objectId":"${id}"}}`,
      ),
      false,
    )
      .then(data => {
        dispatch(fetchListOrder(data.results));
      })
      .catch(err => {
        console.log(err);
      });
  };
}
export function updateListOrderThunk(data, id, shopId) {
  return dispatch => {
    apiWrapper(dispatch, put(`/classes/order/${id}`, data))
      .then(() => {
        dispatch(fetchListOrderThunk(shopId));
      })
      .catch();
  };
}
export function updateListMotorbikeThunk(data, id, shopId) {
  return dispatch => {
    apiWrapper(dispatch, put(`/classes/motorbike/${id}`, data))
      .then(() => {
        dispatch(fetchListMotorbikeThunk(shopId));
      })
      .catch();
  };
}
export function updateCheckOrderThunk(data, id) {
  return dispatch => {
    apiWrapper(dispatch, put(`/classes/order/${id}`, data))
      .then(() => {
        dispatch(fetchRightOrderThunk(data.shop_id.objectId));
      })
      .catch();
  };
}
