import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import { setTranslations, translate } from 'react-switch-lang';
import { Table, Button, Popconfirm, Tag } from 'antd';
import PageHeader from '../../components/utility/PageHeader';
import LayoutWrapper from '../../components/utility/LayoutWrapper';
import {
  fetchListOrderThunk,
  updateListOrderThunk,
  updateListMotorbikeThunk,
  addListPaymentThunk,
  updateStatusThunk,
} from '../../redux/order/thunks';
import en from '../../languageProvider/locales/en_US.json';
import th from '../../languageProvider/locales/vi_VN.json';
import OrderStyle from './style';

setTranslations({ en, th });

export function formatCurrency(value) {
  if (value) {
    const money = value
      .toString()
      .replace(/,/g, '')
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return `${money} đ`;
  }
  return '0';
}

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDataOrder: [],
    };
    this.columns = [
      {
        title: this.props.t('order.cusname'),
        dataIndex: 'user_id',
        className: 'column-center',
        key: 'user_id',
        width: '11%',
        render: (value, record) => {
          return <p>{record.user_id.username}</p>;
        },
      },
      {
        title: this.props.t('order.phone'),
        dataIndex: 'phone_number',
        className: 'column-center',
        key: 'phone_number',
        width: '10%',
        render: (value, record) => {
          return <p>{record.phone_number}</p>;
        },
      },

      {
        title: this.props.t('order.motorname'),
        dataIndex: 'motor_id',
        className: 'column-center',
        key: 'motor_id',
        width: '10%',
        render: (value, record) => {
          return <p>{record.motor_id.name}</p>;
        },
      },
      {
        title: this.props.t('order.license'),
        dataIndex: 'motor_id',
        className: 'column-center',
        key: 'motor_id',
        width: '8%',
        render: (value, record) => {
          return <p>{record.motor_id.license_plate}</p>;
        },
      },
      {
        title: this.props.t('order.orderday'),
        dataIndex: 'total_days_rented',
        className: 'column-center',
        key: 'total_days_rented',
        width: '8%',
      },

      {
        title: this.props.t('order.total'),
        dataIndex: 'total_price',
        className: 'column-center',
        key: 'total_price',
        width: '8%',
      },

      {
        title: this.props.t('order.shipping'),
        dataIndex: 'is_shipping',
        className: 'column-center',
        key: 'is_shipping',
        width: '9%',
        render: (value, record) => {
          if (value === true) {
            return <span>{this.props.t('order.yes')}</span>;
          }
          return <span>{this.props.t('order.no')}</span>;
        },
      },

      {
        title: this.props.t('order.orderdate'),
        dataIndex: 'createdAt',
        className: 'column-center',
        key: 'createdAt',
        width: '12%',
        render: value => {
          return moment(value).format('hh:mm-DD-MM-YYYY');
        },
      },
      {
        title: this.props.t('order.returndate'),
        dataIndex: 'createdAt',
        className: 'column-center',
        key: 'createdAt',
        width: '9%',
        render: value => {
          return moment(value)
            .add(3, 'hour')
            .format('hh:mm-DD-MM-YYYY');
        },
      },
      {
        title: this.props.t('order.status'),
        dataIndex: 'is_cancel',
        className: 'column-center',
        key: 'is_cancel',
        width: '8%',
        render: (value, record) => {
          if (value === true) {
            return <span>{this.props.t('order.cancelStatus')}</span>;
          }
          return <span>{this.props.t('order.normalStatus')}</span>;
        },
      },
      {
        title: this.props.t('order.action'),
        className: 'column-center',
        key: 'action',
        width: '8%',
        render: (value, record) => (
          <div>
            <span>
              <Popconfirm
                title={this.props.t('order.sure')}
                onConfirm={() => this.handleAdd(record)}
                okText={this.props.t('order.ok')}
                cancelText={this.props.t('order.returnmotor')}
              >
                <Button
                  className="btn"
                  style={{ width: 65 }}
                  disabled={record.is_cancel || record.is_finished}
                  type="primary"
                >
                  {this.props.t('order.returnmotor')}
                </Button>
              </Popconfirm>
            </span>

            <span>
              <Popconfirm
                title={this.props.t('order.suretocancelorder')}
                onConfirm={() => this.handleUpdate(record)}
                okText={this.props.t('order.ok')}
                cancelText={this.props.t('order.cancelorder')}
              >
                <Button
                  className="btn"
                  style={{ width: 65 }}
                  disabled={record.is_cancel || record.is_finished}
                  type="danger"
                >
                  {this.props.t('order.cancelorder')}
                </Button>
              </Popconfirm>
            </span>
          </div>
        ),
      },

      {
        title: '',
        dataIndex: 'is_finished',
        className: 'column-center',
        key: 'is_finished',
        width: '3%',
        render: (value, record) => {
          if (value === true) {
            return <Tag color="#f50">{this.props.t('order.end')}</Tag>;
          }
          return <Tag color="#2db7f5">{this.props.t('order.happening')}</Tag>;
        },
      },
    ];
  }
  componentDidMount() {
    this.props.fetchListOrder(this.props.shop_id);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.listOrder !== nextProps.listOrder) {
      this.setState({ listDataOrder: nextProps.listOrder });
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
      is_finished: true,
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
      total: data.total_price,
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
    this.setState({ isDis: data.objectId });
    this.props.addListPayment(newPayment, data.objectId, this.props.shop_id);
    this.props.updateStatus(newStatus, data.objectId, this.props.shop_id);
  };

  render() {
    return (
      <OrderStyle>
        <LayoutWrapper>
          <PageHeader>{this.props.t('order.title')}</PageHeader>
          <div className="isoLayoutContent">
            <Table
              dataSource={
                _.isEmpty(this.state.listDataOrder)
                  ? this.props.listOrder
                  : this.state.listDataOrder
              }
              columns={this.columns}
            />
          </div>
        </LayoutWrapper>
      </OrderStyle>
    );
  }
}

Order.propTypes = {
  fetchListOrder: PropTypes.func,
  shop_id: PropTypes.string,
  listOrder: PropTypes.array,
  updateListOrder: PropTypes.func,
  updateListMotor: PropTypes.func,
  addListPayment: PropTypes.func,
  updateStatus: PropTypes.func,
  t: PropTypes.func.isRequired,
};

export default connect(
  state => {
    return {
      shop_id: state.login.shop_id,
      listOrder: state.order.listOrder,
    };
  },
  dispatch => {
    return {
      fetchListOrder: id => {
        dispatch(fetchListOrderThunk(id));
      },
      updateListOrder: (data, id, shop_id) => {
        dispatch(updateListOrderThunk(data, id, shop_id));
      },
      updateListMotor: (data, id, shop_id) => {
        dispatch(updateListMotorbikeThunk(data, id, shop_id));
      },
      addListPayment: (data, id, shop_id) => {
        dispatch(addListPaymentThunk(data, id, shop_id));
      },
      updateStatus: (data, id, shop_id) => {
        dispatch(updateStatusThunk(data, id, shop_id));
      },
    };
  },
)(translate(Order));
