import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table, Button, Input, Icon, Popconfirm, Tag } from 'antd';
import PageHeader from '../../components/utility/PageHeader';
import LayoutWrapper from '../../components/utility/LayoutWrapper';
import IntlMessages from '../../components/utility/intlMessages';
import { fetchListMotorbikeThunk } from '../../redux/motorbike/thunks';
import MotorbikeWrapper from './style';

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
const columns = [
  {
    title: 'Tên xe',
    dataIndex: 'name',
    className: 'column-center',
    key: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
    width: '14%',
  },
  {
    title: 'Hình ảnh',
    dataIndex: 'image',
    className: 'column-center',
    key: 'image',
    width: '14%',
  },
  {
    title: 'Loại xe',
    dataIndex: 'motorbikeType_id',
    className: 'column-center',
    key: 'motorbikeType_id',
    width: '10%',
    render: (value, record) => {

      return (
        <p>{record.motorbikeType_id.name}</p>
      );
    }
  },
  {
    title: 'Biển số xe',
    dataIndex: 'license_plate',
    className: 'column-center',
    key: 'license_plate',
    width: '10%',
  },
  {
    title: 'Giá',
    dataIndex: 'rent_price',
    className: 'column-center',
    key: 'rent_price',
    sorter: (a, b) => a.price - b.price,
    width: '10%',
    render: value => formatCurrency(value),
  },
  {
    title: 'Mô tả',
    dataIndex: 'description',
    className: 'column-center',
    key: 'description',
    width: '14%',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'is_available',
    className: 'column-center',
    key: 'is_available',
    width: '10%',
    render: value => {
      console.log(value, "hfhfjkah");
      if (value === true) {

        return <Tag color="#f50">Có sẵn</Tag>;
      }
      return <Tag color="#2db7f5">Không có sẵn</Tag>;
    },
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'createdAt',
    className: 'column-center',
    key: 'createdAt',
    width: '12%',

  },
  {
    title: 'Hành động',
    className: 'column-center',
    key: 'action',
    width: '10%',
    render: (value, record) => (
      <div>
        <span>
          <Icon
            className="iconEdit"
            type="edit"
            title="Chỉnh sửa"
            onClick={() => {
              this.showModalEdit(record);
            }}
          />
        </span>
        <span>
          <Popconfirm
            title="Bạn chắc chắn muốn xóa?"
            onConfirm={() => this.handleDelete(record)}
            okText="Đồng ý"
            cancelText="Hủy bỏ"
          >
            <Icon className="iconDel" type="delete" title="Xóa" />
          </Popconfirm>
        </span>
      </div>
    ),
  },
];

class Motorbike extends Component {
  componentDidMount() {
    this.props.fetchListMotorbike();
  }
  render() {
    return (
      <MotorbikeWrapper>
        <LayoutWrapper>
          <PageHeader>
            <IntlMessages id="sidebar.motorbike" />
          </PageHeader>
          <div className="isoLayoutContent">
            <Table dataSource={this.props.listMotorbike} columns={columns} />
          </div>
        </LayoutWrapper>
      </MotorbikeWrapper>
    );
  }
}

Motorbike.propTypes = {
  fetchListMotorbike: PropTypes.func,
  listMotorbike: PropTypes.array,
};

export default connect(
  state => {
    return {
      listMotorbike: state.motorbike.listMotorbike,

    };
  },
  dispatch => {
    return {
      fetchListMotorbike: () => {
        dispatch(fetchListMotorbikeThunk());
      },
    };
  },
)(Motorbike);
