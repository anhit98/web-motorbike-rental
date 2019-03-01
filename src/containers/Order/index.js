import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table, Button, Input, Icon, Popconfirm, Tag } from 'antd';
import PageHeader from '../../components/utility/PageHeader';
import LayoutWrapper from '../../components/utility/LayoutWrapper';
import IntlMessages from '../../components/utility/intlMessages';
import { fetchListOrderThunk, updateListOrderThunk, updateListMotorbikeThunk, addListPaymentThunk, updateStatusThunk } from '../../redux/order/thunks';
import OrderStyle from './style';
import { toggleModal } from './../../redux/modals/actions';
import _ from 'lodash';
import moment from 'moment';

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
      isDis: '',

      listDataOrder: [],
    };
    this.columns = [
      {
        title: 'Tên khách hàng',
        dataIndex: 'user_id',
        className: 'column-center',
        key: 'user_id',
        width: '8%',
        render: (value, record) => {
          return <p>{record.user_id.username}</p>;
        },
      },
      {
        title: 'Số điện thoại',
        dataIndex: 'user_id',
        className: 'column-center',
        key: 'user_id',
        width: '10%',
        render: (value, record) => {
          return <p>{record.user_id.phoneNumber}</p>;
        },
      },
      {
        title: 'Tuổi',
        dataIndex: 'user_id',
        className: 'column-center',
        key: 'user_id',
        width: '5%',
        render: (value, record) => {
          return <p>{record.user_id.age}</p>;
        },
      },

      {
        title: 'Tên xe',
        dataIndex: 'motor_id',
        className: 'column-center',
        key: 'motor_id',
        width: '10%',
        render: (value, record) => {
          return <p>{record.motor_id.name}</p>;
        },
      },
      {
        title: 'Biển số xe',
        dataIndex: 'motor_id',
        className: 'column-center',
        key: 'motor_id',
        width: '8%',
        render: (value, record) => {
          return <p>{record.motor_id.license_plate}</p>;
        },
      },
      {
        title: 'Số ngày đặt',
        dataIndex: 'total_days_rented',
        className: 'column-center',
        key: 'total_days_rented',
        width: '6%',

      },

      {
        title: 'Tổng tiền',
        dataIndex: 'total_price',
        className: 'column-center',
        key: 'total_price',
        width: '8%',
      },

      {
        title: 'Vận chuyển',
        dataIndex: 'is_shipping',
        className: 'column-center',
        key: 'is_shipping',
        width: '9%',
        render: (value, record) => {
          if (value === true) {
            return <span>Vận chuyển</span>;
          }
          return <span>Không vận chuyển</span>;
        },
      },

      {
        title: 'Ngày đặt hàng',
        dataIndex: 'createdAt',
        className: 'column-center',
        key: 'createdAt',
        width: '9%',
        render: value => {
          return moment(value).format('dddd, MMMM Do YYYY, h:mm:ss a');
        },
      },
      {
        title: 'Ngày dự kiến',
        dataIndex: 'createdAt',
        className: 'column-center',
        key: 'createdAt',
        width: '8%',
        render: value => {
          return moment(value)
            .add(3, 'hour')
            .calendar();
        },
      },
      {
        title: 'Trạng thái',
        dataIndex: 'is_cancel',
        className: 'column-center',
        key: 'is_cancel',
        width: '8%',
        render: (value, record) => {
          if (value === true) {
            return <span>Đơn hàng đã hủy</span>;
          }
          return <span>Bình thường</span>;
        },
      },
      {
        title: 'Hành động',
        className: 'column-center',
        key: 'action',
        width: '10%',
        render: (value, record) => (
          < div >
            <span>
              <Popconfirm
                title="Bạn có chắc chắn không?"
                onConfirm={() => this.handleAdd(record)}
                okText="Đồng ý"
                cancelText="Trả xe"
              >
                <Button className="btn" style={{ width: 65 }} disabled={record.objectId === this.state.isDis} type="primary">Trả xe</Button>
              </Popconfirm>
            </span>

            <span>
              <Popconfirm
                title="Bạn chắc chắn muốn hủy đơn hàng?"
                onConfirm={() => this.handleUpdate(record)}
                okText="Đồng ý"
                cancelText="Hủy bỏ"
              >
                <Button className="btn" style={{ width: 65 }} disabled={record.objectId === this.state.isDis} type="danger">Hủy</Button>
              </Popconfirm>
            </span>
          </div >
        ),
      },

      {
        title: '',
        dataIndex: 'is_finished',
        className: 'column-center',
        key: 'is_finished',
        width: '7%',
        render: (value, record) => {

          if (value === true) {

            return <Tag color="#f50">Đã kết thúc</Tag>;
          };
          return <Tag color="#2db7f5">Đang diễn ra</Tag>;
        }

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
    this.setState({ isDis: data.objectId });
    this.props.updateListOrder(newValues, data.objectId);
    this.props.updateListMotor(newMotor, data.motor_id.objectId);
  };

  handleAdd = data => {
    this.props.addListPayment(data);
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
    this.props.updateStatus(data);
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
    this.props.addListPayment(newPayment, data.objectId);
    this.props.updateStatus(newStatus, data.objectId);

  };

  render() {
    return (
      <OrderStyle>
        <LayoutWrapper>
          <PageHeader>
            <IntlMessages id="sidebar.order" />
          </PageHeader>
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
};

export default connect(
  state => {
    return {
      listOrder: state.order.listOrder,
      shop_id: state.login.shop_id,
    };
  },
  dispatch => {
    return {
      fetchListOrder: id => {
        dispatch(fetchListOrderThunk(id));
      },
      updateListOrder: (data, id, shopId) => {
        dispatch(updateListOrderThunk(data, id, shopId));
      },
      updateListMotor: (data, id, shopId) => {
        dispatch(updateListMotorbikeThunk(data, id, shopId));
      },
      addListPayment: (data, id) => {
        dispatch(addListPaymentThunk(data, id));
      },
      updateStatus: (data, id) => {
        dispatch(updateStatusThunk(data, id));
      },
    };
  },
)(Order);
