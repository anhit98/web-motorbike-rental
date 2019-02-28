import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table, Button, Input, Icon, Popconfirm, Tag } from 'antd';
import PageHeader from '../../components/utility/PageHeader';
import LayoutWrapper from '../../components/utility/LayoutWrapper';
import IntlMessages from '../../components/utility/intlMessages';
import { fetchListOrderThunk, updateListOrderThunk, updateListMotorbikeThunk, deleteListOrderThunk } from '../../redux/order/thunks';
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
      // rowData: {},
      listDataOrder: [],
    };
    this.columns = [
      {
        title: 'Tên khách hàng',
        dataIndex: 'user_id',
        className: 'column-center',
        key: 'user_id',
        width: '10%',
        render: (value, record) => {

          return (

            <p>{record.user_id.username}</p>
          );
        }
      },
      {
        title: 'Số điện thoại',
        dataIndex: 'user_id',
        className: 'column-center',
        key: 'user_id',
        width: '10%',
        render: (value, record) => {

          return (

            <p>{record.user_id.phoneNumber}</p>
          );
        }
      },
      {
        title: 'Tuổi',
        dataIndex: 'user_id',
        className: 'column-center',
        key: 'user_id',
        width: '6%',
        render: (value, record) => {
          return (

            <p>{record.user_id.age}</p>
          );
        }
      },

      {
        title: 'Tên xe',
        dataIndex: 'motor_id',
        className: 'column-center',
        key: 'motor_id',
        width: '10%',
        render: (value, record) => {

          return (

            <p>{record.motor_id.name}</p>
          );
        }
      },
      {
        title: 'Biển số xe',
        dataIndex: 'motor_id',
        className: 'column-center',
        key: 'motor_id',
        width: '8%',
        render: (value, record) => {

          return (

            <p>{record.motor_id.license_plate}</p>
          );
        }
      },
      {
        title: 'Số ngày đặt',
        dataIndex: 'total_days_rented',
        className: 'column-center',
        key: 'total_days_rented',
        width: '7%',

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
        width: '8%',
        render: (value, record) => {

          if (value === true) {

            return <span>Vận chuyển</span>;
          };
          return <span>Không vận chuyển</span>;
        }

      },

      {
        title: 'Ngày đặt hàng',
        dataIndex: 'createdAt',
        className: 'column-center',
        key: 'createdAt',
        width: '9%',
        render: value => {
          return moment(value).format("dddd, MMMM Do YYYY, h:mm:ss a");

        }
      },
      {
        title: 'Ngày dự kiến',
        dataIndex: 'createdAt',
        className: 'column-center',
        key: 'createdAt',
        width: '8%',
        render: value => {
          return moment(value).add(3, 'hour').calendar();

        }
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
          };
          return <span>Bình thường</span>;
        }

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
                onConfirm={() => this.handleDelete(record)}
                okText="Đồng ý"
                cancelText="Trả xe"
              >
                <Button style={{ width: 65 }} type="primary">Trả xe</Button>
              </Popconfirm>
            </span>

            <span>
              <Popconfirm
                title="Bạn chắc chắn muốn hủy đơn hàng?"
                onConfirm={() => this.handleUpdate(record)}
                okText="Đồng ý"
                cancelText="Hủy bỏ"
              >
                <Button style={{ width: 65 }} type="danger">Hủy</Button>
              </Popconfirm>
            </span>
          </div>
        ),
      },

    ];
  }
  componentDidMount() {
    this.props.fetchListOrder();


  }


  componentWillReceiveProps(nextProps) {
    if (this.props.listOrder !== nextProps.listOrder) {
      this.setState({ listDataOrder: nextProps.listOrder });
    }
  }
  handleUpdate = data => {
    this.props.updateListOrder(data);
    const newValues = {

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
      is_cancel: true,
      total_days_rented: data.total_days_rented,
      is_finished: data.is_finished,
      total_price: data.total_price,

    };
    this.props.updateListMotor(data);
    const newMotor = {

      motorbikeType_id: data.motor_id.motorbikeType_id,
      shop_id: data.shop_id,
      name: data.motor_id.name,
      is_available: true,
      license_plate: data.motor_id.license_plate,
      image: data.motor_id.image,
      description: data.motor_id.description,
      rent_price: data.motor_id.rent_price,

    };
    console.log(data, "owudrjdfksudowids");
    this.props.updateListOrder(newValues, data.objectId);
    this.props.updateListMotor(newMotor, data.motor_id.objectId);
  };

  handleDelete = data => {
    this.props.deleteListOrder(data);
    console.log(data, "khong ai biet");
    const newPayment = {

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

    console.log(data, "data data data");
    this.props.deleteListOrder(newPayment, data.objectId);

  };

  render() {
    return (
      <OrderStyle>


        <LayoutWrapper>
          <PageHeader>
            <IntlMessages id="sidebar.order" />
          </PageHeader>
          <div className="isoLayoutContent">
            <Table dataSource={
              _.isEmpty(this.state.listDataOrder)
                ? this.props.listOrder
                : this.state.listDataOrder
            } columns={this.columns} />
          </div>
        </LayoutWrapper>

      </OrderStyle>
    );
  }
}

Order.propTypes = {
  fetchListOrder: PropTypes.func,

  listOrder: PropTypes.array,
  updateListOrder: PropTypes.func,
  updateListMotor: PropTypes.func,
  deleteListOrder: PropTypes.func,

};

export default connect(
  state => {

    return {
      listOrder: state.order.listOrder,


    };
  },
  dispatch => {
    return {
      fetchListOrder: () => {
        dispatch(fetchListOrderThunk());
      },
      updateListOrder: (data, id) => {
        dispatch(updateListOrderThunk(data, id));
      },
      updateListMotor: (data, id) => {
        dispatch(updateListMotorbikeThunk(data, id));
      },
      deleteListOrder: (data, id) => {
        dispatch(deleteListOrderThunk(data, id));
      },



    };
  },
)(Order);


