import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';
import PropTypes from 'prop-types';
import PageHeader from '../../components/utility/PageHeader';
import LayoutWrapper from '../../components/utility/LayoutWrapper';
import IntlMessages from '../../components/utility/intlMessages';
import { fetchListRentersThunk } from '../../redux/renters/thunks';
import RenterWrapper from './style';

class Renter extends Component {
  state = {
    selectedRow: null,
  };

  componentDidMount() {
    this.props.fetchListRenters();
  }

  render() {
    const columns = [
      {
        title: 'Họ và tên',
        dataIndex: 'username',
        key: 'username',
        render: (value, record) => {
          return <p>{record.user_id.username}</p>;
        },
      },
      {
        title: 'Tuổi',
        dataIndex: 'age',
        key: 'age',
        render: (value, record) => {
          return <p>{record.user_id.age}</p>;
        },
      },
      {
        title: 'Số điện thoại',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
        render: (value, record) => {
          return <p>{record.user_id.phoneNumber}</p>;
        },
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        render: (value, record) => {
          return <p>{record.user_id.email}</p>;
        },
      },
      {
        title: 'Ảnh đại diện',
        dataIndex: 'avatar',
        key: 'avatar',
        render: (value, record) => {
          return <p>{record.user_id.avatar}</p>;
        },
      },
    ];
    return (
      <RenterWrapper>
        <LayoutWrapper>
          <PageHeader>
            <IntlMessages id="sidebar.renters" />
          </PageHeader>

          <div className="isoLayoutContent">
            <Table dataSource={this.props.listRenters} columns={columns} />
          </div>
        </LayoutWrapper>
      </RenterWrapper>
    );
  }
}

Renter.propTypes = {
  fetchListRenters: PropTypes.func,
  listRenters: PropTypes.array,
};

export default connect(
  state => {
    return {
      listRenters: state.renters.listRenters,
    };
  },
  dispatch => {
    return {
      fetchListRenters: () => {
        dispatch(fetchListRentersThunk());
      },
    };
  },
)(Renter);
