import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { setTranslations, translate } from 'react-switch-lang';
import { Table, Row, Col, Tag, Popconfirm, Calendar, Button } from 'antd';
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
  fetchListMotorbikeThunk,
  fetchLeftOrderThunk,
  fetchRightOrderThunk,
  updateListMotorbikeThunk,
  updateListOrderThunk,
  fetchListMotorbikeThunks,
  fetchListOrderThunk,
  updateCheckOrderThunk,
} from '../../redux/dashboard/thunks';
import en from '../../languageProvider/locales/en_US.json';
import th from '../../languageProvider/locales/vi_VN.json';
import { addListPaymentThunk, updateStatusThunk } from '../../redux/order/thunks';

import HomeWrapper from './style';
import Card from './Card/index';

setTranslations({ en, th });

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      availableMotor: [],
    };
    this.columnsPaymentRight = [
      {
        title: this.props.t('home.renter'),
        dataIndex: 'user_id',
        key: 'user_id',
        width: '10%',
        render: (value, record) => {
          return (
            <span>
              {record.user_id.username}
              <br /> SĐT:{record.user_id.phoneNumber}
            </span>
          );
        },
      },
      {
        title: this.props.t('home.order'),
        dataIndex: 'motor_id.name',
        key: 'motor_id.name',
        width: '10%',
      },
      {
        title: this.props.t('home.orderdate'),
        dataIndex: 'createdAt',
        key: 'createdAt',
        width: '10%',
        render: value => {
          return moment(value).format('DD-MM-YYYY');
        },
      },
      {
        title: this.props.t('home.paydate'),
        dataIndex: 'createdAt',
        key: 'createdAt',
        width: '10%',
        render: (record, value) => {
          // console.log(record, value.total_days_rented, "tong ngay 123");
          return moment(value.createdAt)
            .add(value.total_days_rented, 'days')
            .format('DD-MM-YYYY');
        },
      },
      {
        title: this.props.t('home.expireday'),
        key: 'nowDate',
        width: '10%',

        render: (record, value) => {
          // console.log(record, value, "tong ngay 12347624826445");
          // console.log(moment().format('DD'), "momentmonejej");
          const timeDate = moment().diff(
            moment(value.createdAt).add(value.total_days_rented, 'days'),
            'days',
          );

          return timeDate;
        },
      },
      {
        title: this.props.t('home.action'),
        className: 'column-center',
        key: 'action',
        width: '10%',
        render: (value, record) => (
          <div>
            <span>
              <Popconfirm
                title={this.props.t('home.sure')}
                onConfirm={() => this.handleAdd(record)}
                okText={this.props.t('home.ok')}
                cancelText={this.props.t('home.returnmotor')}
              >
                <Button
                  className="btn"
                  style={{ width: 65 }}
                  disabled={record.is_cancel || record.is_finished}
                  type="primary"
                >
                  {this.props.t('home.returnmotor')}
                </Button>
              </Popconfirm>
            </span>
          </div>
        ),
      },
    ];
    this.columnsPaymentLeft = [
      {
        title: this.props.t('home.renter'),
        dataIndex: 'user_id',
        key: 'user_id',
        width: '10%',
        render: (value, record) => {
          return (
            <span>
              {record.user_id.username}
              <br /> SĐT:{record.user_id.phoneNumber}
            </span>
          );
        },
      },
      {
        title: this.props.t('home.order'),
        dataIndex: 'motor_id.name',
        key: 'motor_id.name',
        width: '10%',
      },
      {
        title: this.props.t('home.orderdate'),
        dataIndex: 'createdAt',
        key: 'createdAt',
        width: '10%',
        render: value => {
          return moment(value).format('hh:mm:ss-DD-MM-YYYY');
        },
      },
      {
        title: this.props.t('home.getmotortime'),
        dataIndex: 'createdAt',
        key: 'createdAt',
        width: '8%',
        render: (record, value) => {
          // console.log(record, value.total_days_rented, "tong ngay 123");
          return moment(value.createdAt)
            .add(3, 'hour')
            .format('hh:mm:ss-DD-MM-YYYY');
        },
      },
      {
        title: this.props.t('home.expirehour'),
        key: 'nowDate',
        width: '9%',

        render: (record, value) => {
          // console.log(record, value, "tong ngay 12347624826445");
          // console.log(moment().format('DD'), "momentmonejej");
          const timeDate1 = moment().diff(moment(value.createdAt).add(3, 'hours'), 'hours');
          return timeDate1;
        },
      },
      {
        title: this.props.t('home.action'),
        className: 'column-center',
        key: 'action',
        width: '10%',
        render: (value, record) => (
          <div>
            <span>
              <Popconfirm
                title={this.props.t('home.suretokeeporder')}
                onConfirm={() => this.updateCheck(record)}
                okText={this.props.t('home.ok')}
                cancelText={this.props.t('home.cancelorder')}
              >
                <Button className="btn" style={{ width: 65 }} type="primary">
                  {this.props.t('home.keeporder')}
                </Button>
              </Popconfirm>
            </span>
            <span>
              <Popconfirm
                title={this.props.t('home.suretocancelorder')}
                onConfirm={() => this.handleUpdate(record)}
                okText={this.props.t('home.ok')}
                cancelText={this.props.t('home.cancelorder')}
              >
                <Button className="btn" style={{ width: 65 }} type="danger">
                  {this.props.t('home.cancelorder')}
                </Button>
              </Popconfirm>
            </span>
          </div>
        ),
      },
    ];
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shop_id !== this.props.shop_id) {
      const newdueDate = moment().subtract(moment().date() - 1, 'days');
      this.props.fetchListRenters(nextProps.shop_id);
      this.props.countMotor(nextProps.shop_id, newdueDate.toISOString(), moment().toISOString());
      this.props.countTotalMotors(nextProps.shop_id);
      this.props.fetchListMotorbike(nextProps.shop_id);
      this.props.fetchLeftOrder(nextProps.shop_id);
      this.props.fetchRightOrder(nextProps.shop_id);
      this.props.countPayments(nextProps.shop_id, newdueDate.toISOString(), moment().toISOString());
      this.props.fetchListOrder(nextProps.shop_id);
      this.props.countRenters(nextProps.shop_id);
    }
  }

  handleUpdate = data => {
    const newValues = {
      motor_id: {
        __type: 'Pointer',
        className: 'motorbike',
        objectId: data.motor_id.objectId,
      },
      shop_id: {
        __type: 'Pointer',
        className: 'shop',
        objectId: data.shop_id.objectId,
      },
      user_id: {
        __type: 'Pointer',
        className: '_User',
        objectId: data.user_id.objectId,
      },
      is_shipping: data.is_shipping,
      is_cancel: true,
      total_days_rented: data.total_days_rented,
      is_finished: data.is_finished,
      total_price: data.total_price,
    };
    const newMotor = {
      motorbikeType_id: {
        __type: 'Pointer',
        className: 'motorbikeType',
        objectId: data.motor_id.motorbikeType_id.objectId,
      },
      shop_id: {
        __type: 'Pointer',
        className: 'shop',
        objectId: data.shop_id.objectId,
      },
      name: data.motor_id.name,
      is_available: true,
      license_plate: data.motor_id.license_plate,
      image: data.motor_id.image,
      description: data.motor_id.description,
      rent_price: data.motor_id.rent_price,
    };
    this.props.updateListOrder(newValues, data.objectId, this.props.shop_id);
    this.props.updateListMotor(newMotor, data.motor_id.objectId, this.props.shop_id);
  };
  handleAdd = data => {
    // console.log(data, "khong ai biet");
    const newPayment = {
      motorbike_id: {
        __type: 'Pointer',
        className: 'motorbike',
        objectId: data.motor_id.objectId,
      },
      user: {
        __type: 'Pointer',
        className: '_User',
        objectId: data.user_id.objectId,
      },
      order_id: {
        __type: 'Pointer',
        className: 'order',
        objectId: data.objectId,
      },
      shop: {
        __type: 'Pointer',
        className: 'shop',
        objectId: data.shop_id.objectId,
      },
    };
    const newStatus = {
      motor_id: {
        __type: 'Pointer',
        className: 'motorbike',
        objectId: data.motor_id.objectId,
      },
      shop_id: data.shop_id,
      user_id: {
        __type: 'Pointer',
        className: '_User',
        objectId: data.user_id.objectId,
      },
      is_shipping: data.is_shipping,
      is_cancel: data.is_cancel,
      total_days_rented: data.total_days_rented,
      is_finished: true,
      total_price: data.total_price,
    };
    this.props.addListPayment(newPayment, data.objectId, this.props.shop_id);
    this.props.updateStatus(newStatus, data.objectId, this.props.shop_id);
  };
  updateCheck = record => {
    const values = {
      motor_id: {
        __type: 'Pointer',
        className: 'motorbike',
        objectId: record.motor_id.objectId,
      },
      shop_id: {
        __type: 'Pointer',
        className: 'shop',
        objectId: record.shop_id.objectId,
      },
      user_id: {
        __type: 'Pointer',
        className: '_User',
        objectId: record.user_id.objectId,
      },
      check: true,
      total_days_rented: record.total_days_rented,
      total_price: record.total_price,
      is_cancel: record.is_cancel,
      is_finished: record.is_finished,
      is_shipping: record.is_shipping,
    };
    this.props.updateCheckOrder(values, record.objectId);
  };
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
      console.log(sum, 'sumsum');
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
    function onPanelChange(value, mode) {
      console.log(value, mode);
    }
    const newDate = [];
    console.log(newDate, 'gfjdgf1222222');
    _.forEach(this.props.listLeftOrder, order => {
      const timeDate2 = moment().diff(
        moment(order.createdAt).add(order.total_days_rented, 'days'),
        'days',
      );
      console.log(timeDate2, 'ok ok ok ok');
      if (timeDate2 > 0) newDate.push(order);
    });
    const newHour = [];
    console.log(newHour, 'gfjdgf1222222hour');
    _.forEach(this.props.listRightOrder, order => {
      const timeToday = moment().format('hh:mm:ss-DD-MM-YYYY');
      console.log(timeToday, 'ok ok ok ok123');
      const timeDate3 = moment().diff(moment(order.createdAt).add(3, 'hours'), 'hours');
      console.log(timeDate3, 'ok ok ok ok');
      if (timeDate3 > 0 && timeToday) newHour.push(order);
    });
    const month = moment().month() + 1;
    return (
      <HomeWrapper>
        <LayoutWrapper>
          <PageHeader>{this.props.t('home.dashboard')}</PageHeader>
          <div className="isoLayoutContent space">
            <Row type="flex" justify="space-between">
              <Card
                title={this.props.t('home.totalcus')}
                countNumber={result.length}
                linkRoute={'/khach-hang'}
                typeIcon={'usergroup-add'}
                styleIcon={{ color: '#17ae14' }}
                styleCountNumber={{ color: '#17ae14', fontSize: 25 }}
                stylebackground={{ background: 'indianred' }}
                styleLink={{ color: 'white' }}
              />
              <Card
                title={this.props.t('home.totalorder')}
                countNumber={this.props.NoMotor}
                linkRoute={'/thanh-toan'}
                typeIcon={'check-circle'}
                styleIcon={{ color: '#b90ec5' }}
                stylebackground={{ background: 'cadetblue' }}
                styleCountNumber={{ color: '#b90ec5', fontSize: 25 }}
                styleLink={{ color: 'white' }}
              />
              <Card
                title={this.props.t('home.availmotor')}
                countNumber={`${this.props.TotalMotors}/${this.props.listMotor}`}
                linkRoute={'/xe-may'}
                typeIcon={'bell'}
                styleIcon={{ color: '#464696' }}
                styleCountNumber={{ color: '#464696', fontSize: 25 }}
                stylebackground={{ background: 'darkkhaki' }}
                styleLink={{ color: 'white' }}
              />
              <Card
                title={this.props.t('home.totalrevenue') + month}
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
          <div className="isoLayoutContent space">
            <Row type="flex" justify="space-between">
              <Col className="double-table" span={5}>
                <div className="isoLayoutContent">
                  <p className="title">
                    <b>{this.props.t('home.lefttable')}</b>
                  </p>
                  <Table
                    dataSource={newDate}
                    pagination={false}
                    columns={this.columnsPaymentRight}
                  />
                </div>
              </Col>
              <Col className="double-table" span={5}>
                <div className="isoLayoutContent">
                  <p className="title">
                    <b>{this.props.t('home.righttable')}</b>
                  </p>
                  <Table dataSource={newHour} columns={this.columnsPaymentLeft} />
                </div>
              </Col>
              {/* <Col className="double-table" span={5}> */}
              <div className="calendar" style={{ border: '1px solid #d9d9d9', borderRadius: 4, marginTop: 10, marginLeft: 285 }}>
                <Calendar fullscreen={false} onPanelChange={onPanelChange} />
              </div>
              {/* </Col> */}
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
  updateListMotor: PropTypes.func,
  updateListOrder: PropTypes.func,
  fetchListOrder: PropTypes.func,
  listLeftOrder: PropTypes.array,
  listRightOrder: PropTypes.array,
  fetchLeftOrder: PropTypes.func,
  fetchRightOrder: PropTypes.func,
  addListPayment: PropTypes.func,
  updateStatus: PropTypes.func,
  updateCheckOrder: PropTypes.func,
  t: PropTypes.func.isRequired,
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
      listLeftOrder: state.dashboard.listLeftOrder,
      listRightOrder: state.dashboard.listRightOrder,
    };
  },

  dispatch => {
    return {
      fetchListOrder: id => {
        dispatch(fetchListOrderThunk(id));
      },
      countRenters: value => {
        dispatch(fetchCountRentersThunk(value));
      },
      countMotor: (id, newdate, momentdate) => {
        dispatch(fetchCountMotorThunk(id, newdate, momentdate));
      },
      countTotalMotors: id => {
        dispatch(fetchCountTotalMotorsThunk(id));
      },
      countPayments: (id, newdate, momentdate) => {
        dispatch(fetchCountPaymentsThunk(id, newdate, momentdate));
      },
      fetchListRenters: value => {
        dispatch(fetchListRentersThunk(value));
      },
      fetchListMotorbike: value => {
        dispatch(fetchListMotorbikeThunks(value));
      },
      fetchLeftOrder: id => {
        dispatch(fetchLeftOrderThunk(id));
      },
      fetchRightOrder: id => {
        dispatch(fetchRightOrderThunk(id));
      },
      updateListMotor: (data, id, shop_id) => {
        dispatch(updateListMotorbikeThunk(data, id, shop_id));
      },
      updateListOrder: (data, id, shop_id) => {
        dispatch(updateListOrderThunk(data, id, shop_id));
      },
      addListPayment: (data, id, shop_id) => {
        dispatch(addListPaymentThunk(data, id, shop_id));
      },
      updateStatus: (data, id, shop_id) => {
        dispatch(updateStatusThunk(data, id, shop_id));
      },
      updateCheckOrder: (value, id) => {
        dispatch(updateCheckOrderThunk(value, id));
      },
    };
  },
)(translate(Home));
