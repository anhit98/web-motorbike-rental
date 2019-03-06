import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table, Row, Col, Tag, Popconfirm } from 'antd';
import moment from 'moment';
import PageHeader from '../../components/utility/PageHeader';
import LayoutWrapper from '../../components/utility/LayoutWrapper';
import IntlMessages from '../../components/utility/intlMessages';
import {
  fetchCountRentersThunk,
  fetchCountMotorThunk,
  fetchCountTotalMotorsThunk,
  fetchCountPaymentsThunk,
  fetchListRentersThunk,
  fetchListMotorbikeThunk

} from '../../redux/dashboard/thunks';

import HomeWrapper from './style';
import Card from './Card/index';
import _ from 'lodash';




class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      availableMotor: [],
    };
  }

  componentDidMount() {

    const newdueDate = moment().subtract(moment().date() - 1, 'days');
    this.props.fetchListRenters(this.props.shop_id);
    this.props.countMotor(this.props.shop_id, newdueDate.toISOString(), moment().toISOString());
    this.props.countTotalMotors(this.props.shop_id);
    this.props.fetchListMotorbkie(this.props.shop_id);

    this.props.countPayments(this.props.shop_id, newdueDate.toISOString(), moment().toISOString());

  }


  formatCurrency(value) {
    if (value) {
      const money = value
        .toString()
        .replace(/,/g, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return `${money}đ`;
    }
    return '0';
  }

  render() {

    let sum = 0;
    this.props.NoPayments.map(value => {
      console.log(sum, "sumsum");
      sum += value.total;
      return null;

    });
    const result = [];
    _.forEach(this.props.listRenters, renter => {
      const name = renter.user_id.objectId;
      const isExist = _.find(result, data => data.user_id.objectId === name);
      console.log(name, 'isEifd');
      if (!isExist) {
        result.push(renter);
      }

    });
    return (
      <HomeWrapper>
        <LayoutWrapper>
          <PageHeader>
            <IntlMessages id="sidebar.dashboard" />
          </PageHeader>
          <div className="isoLayoutContent space">
            <Row type="flex" justify="space-between" >

              <Card
                title={'Tổng khách hàng'}
                countNumber={result.length}
                linkRoute={'/khach-hang'}
                typeIcon={'usergroup-add'}
                styleIcon={{ color: '#17ae14' }}
                styleCountNumber={{ color: '#17ae14', fontSize: 25 }}
                stylebackground={{ background: 'indianred' }}
                styleLink={{ color: 'white' }}

              />
              <Card
                title={'Số lượng đặt hàng'}
                countNumber={this.props.NoMotor}
                linkRoute={'/thanh-toan'}
                typeIcon={'check-circle'}
                styleIcon={{ color: '#b90ec5' }}
                stylebackground={{ background: 'cadetblue' }}
                styleCountNumber={{ color: '#b90ec5', fontSize: 25 }}
                styleLink={{ color: 'white' }}
              />
              <Card
                title={'Số xe có sẵn'}
                countNumber={`${this.props.TotalMotors}/${this.props.listMotor}`}
                linkRoute={'/xe-may'}
                typeIcon={'bell'}
                styleIcon={{ color: '#464696' }}
                styleCountNumber={{ color: '#464696', fontSize: 25 }}
                stylebackground={{ background: 'darkkhaki' }}
                styleLink={{ color: 'white' }}

              />
              <Card
                title={`Tổng thu tháng ${moment().month() + 1}`}
                countNumber={this.formatCurrency(sum)}
                linkRoute={'/thanh-toan'}
                typeIcon={'wallet'}
                styleIcon={{ color: '#1bafb6' }}
                styleCountNumber={{ color: '#1bafb6', fontSize: 25 }}
                stylebackground={{ background: 'darkslateblue' }}
                styleLink={{ color: 'white' }}
              />
            </Row>
          </div>

        </LayoutWrapper>
      </HomeWrapper>
    );
  }
}

Home.propTypes = {
  countRenters: PropTypes.func,
  NoRenters: PropTypes.number,
  countMotor: PropTypes.func,
  NoMotor: PropTypes.number,
  countTotalMotors: PropTypes.func,
  TotalMotors: PropTypes.number,
  countPayments: PropTypes.func,
  NoPayments: PropTypes.array,
  fetchListMotorbike: PropTypes.func,
  fetchListRenters: PropTypes.func,
  listRenters: PropTypes.array,
  fetchListPayments: PropTypes.func,
  listPayments: PropTypes.array,
  listMotor: PropTypes.number,
  shop_id: PropTypes.string,
};

export default connect(
  state => {
    return {
      shop_id: state.login.shop_id,
      NoRenters: state.dashboard.noRenter,
      NoMotor: state.dashboard.noMotor,
      TotalMotors: state.dashboard.totalMotors,
      NoPayments: state.dashboard.noPayment,
      listMotor: state.dashboard.listMotorbike,
      listPayments: state.dashboard.listPayment,
      listRenters: state.dashboard.listRenters,

    };
  },

  dispatch => {
    return {
      countRenters: value => {
        dispatch(fetchCountRentersThunk(value));
      },
      countMotor: (id, newdate, momentdate) => {
        dispatch(fetchCountMotorThunk(id, newdate, momentdate));
      },
      countTotalMotors: (id) => {
        dispatch(fetchCountTotalMotorsThunk(id));
      },
      countPayments: (id, newdate, momentdate) => {
        dispatch(fetchCountPaymentsThunk(id, newdate, momentdate));
      },
      fetchListRenters: value => {
        dispatch(fetchListRentersThunk(value));
      },
      fetchListMotorbkie: value => {
        dispatch(fetchListMotorbikeThunk(value));
      },

    };
  },
)(Home);
