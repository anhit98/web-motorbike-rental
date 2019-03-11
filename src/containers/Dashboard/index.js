import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
  fetchListPaymentHisThunk,
  updateListMotorbikeThunk,
  updateListOrderThunk,
  fetchListMotorbikeThunks,
  fetchListOrderThunk


} from '../../redux/dashboard/thunks';

import HomeWrapper from './style';
import Card from './Card/index';
import _ from 'lodash';

const columnsPaymentRight = [
  {
    title: 'Người đặt',
    dataIndex: 'user_id',
    key: 'user_id',
    width: '10%',
    render: (value, record) => {
      return <span>{record.user_id.username}<br /> SĐT:{record.user_id.phoneNumber}</span>;
    },
  },
  {
    title: 'Đơn hàng',
    dataIndex: 'motor_id.name',
    key: 'motor_id.name',
    width: '10%',
  },
  {
    title: 'Ngày đặt',
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: '10%',
    render: value => {
      return moment(value).format('DD-MM-YYYY');
    },
  },
  {
    title: 'Ngày trả',
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
    title: 'Số ngày quá hạn',
    key: 'nowDate',
    width: '10%',

    render: (record, value) => {
      // console.log(record, value, "tong ngay 12347624826445");
      // console.log(moment().format('DD'), "momentmonejej");
      let timeDate = moment().diff(moment(value.createdAt).add(value.total_days_rented, 'days'), 'days');

      return timeDate;
    },
  },
  {
    title: 'Hành động',
    className: 'column-center',
    key: 'action',
    width: '10%',
    render: (value, record) => (
      <div>
        <span>
          <Popconfirm
            title="Bạn có chắc chắn không?"
            onConfirm={() => this.handleAdd(record)}
            okText="Đồng ý"
            cancelText="Trả xe"
          >
            <Button
              className="btn"
              style={{ width: 65 }}
              disabled={record.is_cancel || record.is_finished}
              type="primary"
            >
              Trả xe
            </Button>
          </Popconfirm>
        </span>

        <span>
          <Popconfirm
            title="Bạn chắc chắn muốn hủy đơn hàng?"
            onConfirm={() => this.handleUpdate(record)}
            okText="Đồng ý"
            cancelText="Hủy bỏ"
          >
            <Button
              className="btn"
              style={{ width: 65 }}
              disabled={record.is_cancel || record.is_finished}
              type="danger"
            >
              Hủy
            </Button>
          </Popconfirm>
        </span>
      </div>
    ),
  },
];
const columnsPaymentLeft = [
  {
    title: 'Người đặt',
    dataIndex: 'user_id',
    key: 'user_id',
    width: '10%',
    render: (value, record) => {
      return <span>{record.user_id.username}<br /> SĐT:{record.user_id.phoneNumber}</span>;
    },
  },
  {
    title: 'Đơn hàng',
    dataIndex: 'motor_id.name',
    key: 'motor_id.name',
    width: '10%',
  },
  {
    title: 'Ngày đặt',
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: '10%',
    render: value => {
      return moment(value).format('hh:mm:ss-DD-MM-YYYY');
    },
  },
  {
    title: 'Thời gian nhận xe',
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
    title: 'Số giờ quá hạn',
    key: 'nowDate',
    width: '9%',

    render: (record, value) => {
      // console.log(record, value, "tong ngay 12347624826445");
      // console.log(moment().format('DD'), "momentmonejej");
      let timeDate1 = moment().diff(moment(value.createdAt).add(3, 'hours'), 'hours');
      return timeDate1;
    },
  },
  {
    title: 'Hành động',
    className: 'column-center',
    key: 'action',
    width: '10%',
    render: (value, record) => (
      <div>
        <span>
          <Popconfirm
            title="Bạn chắc chắn muốn hủy đơn hàng?"
            onConfirm={() => this.handleUpdate(record)}
            okText="Đồng ý"
            cancelText="Hủy bỏ"
          >
            <Button
              className="btn"
              style={{ width: 65 }}
              disabled={record.is_cancel || record.is_finished}
              type="danger"
            >
              Hủy
            </Button>
          </Popconfirm>
        </span>
      </div>
    ),
  },
];


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
    this.props.fetchListMotorbike(this.props.shop_id);
    this.props.fetchListPaymentHis(this.props.shop_id);
    this.props.countPayments(this.props.shop_id, newdueDate.toISOString(), moment().toISOString());
    this.props.fetchListOrder(this.props.shop_id);

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
    this.props.updateListMotor(data);
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
    function onPanelChange(value, mode) {
      console.log(value, mode);
    }
    const newDate = [];
    console.log(newDate, "gfjdgf1222222");
    _.forEach(this.props.listPaymentHis, order => {
      let timeDate2 = moment().diff(moment(order.createdAt).add(order.total_days_rented, 'days'), 'days');
      console.log(timeDate2, "ok ok ok ok");
      if (timeDate2 > 0)
        newDate.push(order);
    });
    const newHour = [];
    console.log(newHour, "gfjdgf1222222hour");
    _.forEach(this.props.listPaymentHis, order => {
      let timeToday = moment().format('hh:mm:ss-DD-MM-YYYY');
      console.log(timeToday, "ok ok ok ok123");
      let timeDate3 = moment().diff(moment(order.createdAt).add(3, 'hours'), 'hours');
      console.log(timeDate3, "ok ok ok ok");
      if (timeDate3 > 0 && timeToday)
        newHour.push(order);
    })
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
          <div className="isoLayoutContent space">
            <Row type="flex" justify="space-between">
              <Col className="double-table" span={10}>
                <div className="isoLayoutContent">
                  <p className="title">
                    <b>Danh sách các đơn hàng quá hạn thanh toán</b>
                  </p>
                  <Table
                    dataSource={newDate}
                    pagination={false}
                    columns={columnsPaymentRight}
                  />
                </div>
              </Col>
              <Col className="double-table" span={10}>
                <div className="isoLayoutContent">
                  <p className="title">
                    <b>Danh sách các đơn hàng quá hạn nhận xe</b>
                  </p>
                  <Table dataSource={newHour} columns={columnsPaymentLeft} />
                </div>
              </Col>
              {/* <Col className="double-table" span={5}> */}
              <div style={{ width: 300, border: '1px solid #d9d9d9', borderRadius: 4 }}>
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
  listPaymentHis: PropTypes.array,
  fetchListPaymentHis: PropTypes.func,
  updateListMotor: PropTypes.func,
  updateListOrder: PropTypes.func,
  fetchListOrder: PropTypes.func,

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
      listPaymentHis: state.dashboard.listPaymentHis,

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
      countTotalMotors: (id) => {
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
      fetchListPaymentHis: (id) => {
        dispatch(fetchListPaymentHisThunk(id));
      },
      updateListMotor: (data, id, shop_id) => {
        dispatch(updateListMotorbikeThunk(data, id, shop_id));
      },
      updateListOrder: (data, id, shop_id) => {
        dispatch(updateListOrderThunk(data, id, shop_id));
      },

    };
  },
)(Home);
