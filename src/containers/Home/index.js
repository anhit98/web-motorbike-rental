import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import PageHeader from '../../components/utility/PageHeader';
import LayoutWrapper from '../../components/utility/LayoutWrapper';
import IntlMessages from '../../components/utility/intlMessages';
import { fetchListUsersThunk } from '../../redux/users/thunks';
import HomeWrapper from './style';

const columns = [
  {
    title: 'ObjectId',
    dataIndex: 'objectId',
    key: 'objectId',
  },
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: 'Updated At',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
  },
  {
    title: 'Created At',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
];

class Home extends Component {
  componentDidMount() {
    this.props.fetchListUsers();
  }
  render() {
    return (
      <HomeWrapper>
        <LayoutWrapper>
          <PageHeader>
            <IntlMessages id="sidebar.dashboard" />
          </PageHeader>
          <div className="isoLayoutContent">
            <Table dataSource={this.props.listUsers} columns={columns} />
          </div>
        </LayoutWrapper>
      </HomeWrapper>
    );
  }
}

Home.propTypes = {
  fetchListUsers: PropTypes.func,
  listUsers: PropTypes.array,
};

export default connect(
  state => {
    return {
      listUsers: state.users.listUsers,
    };
  },
  dispatch => {
    return {
      fetchListUsers: () => {
        dispatch(fetchListUsersThunk());
      },
    };
  },
)(Home);
