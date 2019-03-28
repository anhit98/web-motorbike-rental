import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { setTranslations, translate } from 'react-switch-lang';
import { Table, Button, Input, Icon, Popconfirm, Tag } from 'antd';
import PageHeader from '../../components/utility/PageHeader';
import LayoutWrapper from '../../components/utility/LayoutWrapper';
import IntlMessages from '../../components/utility/intlMessages';
import { fetchListPaymentThunk } from '../../redux/payment/thunks';
import PaymentStyle from './style';
import { toggleModal } from './../../redux/modals/actions';
import en from '../../languageProvider/locales/en_US.json';
import th from '../../languageProvider/locales/vi_VN.json';
import _ from 'lodash';

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

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // rowData: {},
      listDataPayment: [],
    };
    this.columns = [
      {
        title: this.props.t('payment.cusname'),
        dataIndex: 'user',
        className: 'column-center',
        key: 'user',
        width: '12%',
        render: (value, record) => {
          return <p>{record.user.username}</p>;
        },
      },
      {
        title: this.props.t('payment.phone'),
        dataIndex: 'phone_number',
        className: 'column-center',
        key: 'phone_number',
        width: '12%',
        render: (value, record) => {
          return <p>{record.phone_number}</p>;
        },
      },

      {
        title: this.props.t('payment.motorname'),
        dataIndex: 'motorbike_id',
        className: 'column-center',
        key: 'motorbike_id',
        width: '10%',
        render: (value, record) => {
          return <p>{record.motorbike_id.name}</p>;
        },
      },
      {
        title: this.props.t('payment.license'),
        dataIndex: 'motorbike_id',
        className: 'column-center',
        key: 'motorbike_id',
        width: '10%',
        render: (value, record) => {
          return <p>{record.motorbike_id.license_plate}</p>;
        },
      },
      {
        title: this.props.t('payment.orderday'),
        dataIndex: 'order_id',
        className: 'column-center',
        key: 'order_id',
        width: '8%',
        render: (value, record) => {
          return <p>{record.order_id.total_days_rented}</p>;
        },
      },
      {
        title: this.props.t('payment.total'),
        dataIndex: 'order_id',
        className: 'column-center',
        key: 'order_id',
        width: '10%',
        render: (value, record) => {
          return <p>{record.order_id.total_price}</p>;
        },
      },

      {
        title: this.props.t('payment.shippingamount'),
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
        title: this.props.t('payment.returndate'),
        dataIndex: 'createdAt',
        className: 'column-center',
        key: 'createdAt',
        width: '12%',
        render: value => {
          return moment(value).format('DD-MM-YYYY');
        },
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
          <PageHeader>{this.props.t('payment.title')}</PageHeader>
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
  t: PropTypes.func.isRequired,
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
)(translate(Payment));
