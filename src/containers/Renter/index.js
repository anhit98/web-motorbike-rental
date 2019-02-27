import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Avatar } from 'antd';
import _ from 'lodash';
import PropTypes from 'prop-types';
import PageHeader from '../../components/utility/PageHeader';
import LayoutWrapper from '../../components/utility/LayoutWrapper';
import IntlMessages from '../../components/utility/intlMessages';
import { fetchListRentersThunk } from '../../redux/renters/thunks';
import RenterWrapper from './style';

// import admin from '../../assets/images/admin.png';
class Renter extends Component {
  state = {
    selectedRow: null,
  };

  componentDidMount() {
    this.props.fetchListRenters();
    console.log(this.props.listRenters, 'hiuhiu');
  }

  render() {
    const result = [];
    _.forEach(this.props.listRenters, renter => {
      const name = renter.user_id.objectId;
      const isExist = _.find(result, data => data.user_id.objectId === name);
      console.log(isExist, 'isEifd');
      if (!isExist) {
        result.push(renter);
      }
    });

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
        title: 'Ảnh đại diện',
        dataIndex: 'avatar',
        key: 'avatar',
        render: (value, record) => {
          const a = `../../assets/images/${record.user_id.avatar}`;
          console.log(a, record, 'tham');
          return (
            <div>
              <Avatar src={a} />
            </div>
          );
        },
      },
      {
        title: 'Số lần đặt xe',
        dataIndex: 'count',
        key: 'count',

        render: (value, record) => {
          let count = 0;
          _.forEach(this.props.listRenters, renter => {
            if (renter.user_id.objectId === record.user_id.objectId && renter.is_cancel === false) {
              count += 1;
            }
          });
          return <p>{count}</p>;
        },
      },
      {
        title: 'Số lần hủy đặt xe',
        dataIndex: 'count',
        key: 'count',

        render: (value, record) => {
          let count = 0;
          _.forEach(this.props.listRenters, renter => {
            if (renter.user_id.objectId === record.user_id.objectId && renter.is_cancel === true) {
              count += 1;
            }
          });
          return <p>{count}</p>;
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
            <Table dataSource={result} columns={columns} />
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
