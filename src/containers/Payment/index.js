import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table, Button, Input, Icon, Popconfirm, Tag } from 'antd';
import PageHeader from '../../components/utility/PageHeader';
import LayoutWrapper from '../../components/utility/LayoutWrapper';
import IntlMessages from '../../components/utility/intlMessages';
import { fetchListPaymentThunk } from '../../redux/payment/thunks';
import PaymentStyle from './style';
import { toggleModal } from './../../redux/modals/actions';
import _ from 'lodash';

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

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // rowData: {},
      listDataPayment: [],
    };
    this.columns = [
      {
        title: 'Tên khách hàng',
        dataIndex: 'user',
        className: 'column-center',
        key: 'user',
        width: '12%',
        render: (value, record) => {
          return <p>{record.user.username}</p>;
        },
      },
      {
        title: 'Số điện thoại',
        dataIndex: 'user',
        className: 'column-center',
        key: 'user',
        width: '12%',
        render: (value, record) => {
          return <p>{record.user.phoneNumber}</p>;
        },
      },
      {
        title: 'Tuổi',
        dataIndex: 'user',
        className: 'column-center',
        key: 'user',
        width: '6%',
        render: (value, record) => {
          return <p>{record.user.age}</p>;
        },
      },

      {
        title: 'Tên xe',
        dataIndex: 'motorbike_id',
        className: 'column-center',
        key: 'motorbike_id',
        width: '10%',
        render: (value, record) => {
          return <p>{record.motorbike_id.name}</p>;
        },
      },
      {
        title: 'Biển số xe',
        dataIndex: 'motorbike_id',
        className: 'column-center',
        key: 'motorbike_id',
        width: '10%',
        render: (value, record) => {
          return <p>{record.motorbike_id.license_plate}</p>;
        },
      },
      {
        title: 'Số ngày thuê',
        dataIndex: 'order_id',
        className: 'column-center',
        key: 'order_id',
        width: '8%',
        render: (value, record) => {
          return <p>{record.order_id.total_days_rented}</p>;
        },
      },
      {
        title: 'Tổng tiền',
        dataIndex: 'order_id',
        className: 'column-center',
        key: 'order_id',
        width: '10%',
        render: (value, record) => {
          return <p>{record.order_id.total_price}</p>;
        },
      },

      {
        title: 'Phí vận chuyển',
        dataIndex: 'order_id',
        className: 'column-center',
        key: 'order_id',
        width: '8%',
        render: (value, record) => {
          if (record.order_id.is_shipping === true) {
            return <span>15.000</span>;
          }
          return <span>0</span>;
        },
      },

      {
        title: 'Ngày trả',
        dataIndex: 'createdAt',
        className: 'column-center',
        key: 'createdAt',
        width: '12%',
      },
    ];
  }
  componentDidMount() {
    this.props.fetchListPayment(this.props.shop_id);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.listPayment !== nextProps.listPayment) {
      this.setState({ listDataPayment: nextProps.listPayment });
    }
  }

  render() {
    return (
      <PaymentStyle>
        <LayoutWrapper>
          <PageHeader>
            <IntlMessages id="sidebar.payment" />
          </PageHeader>
          <div className="isoLayoutContent">
            <Table
              dataSource={
                _.isEmpty(this.state.listDataPayment)
                  ? this.props.listPayment
                  : this.state.listDataPayment
              }
              columns={this.columns}
            />
          </div>
        </LayoutWrapper>
      </PaymentStyle>
    );
  }
}

Payment.propTypes = {
  fetchListPayment: PropTypes.func,
  shop_id: PropTypes.string,
  listPayment: PropTypes.array,
};

export default connect(
  state => {
    return {
      shop_id: state.login.shop_id,
      listPayment: state.payment.listPayment,
    };
  },
  dispatch => {
    return {
      fetchListPayment: id => {
        dispatch(fetchListPaymentThunk(id));
      },
    };
  },
)(Payment);
