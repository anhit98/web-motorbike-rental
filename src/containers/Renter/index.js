import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Avatar, Input } from 'antd';
import _ from 'lodash';
import Fuse from 'fuse.js';
import PropTypes from 'prop-types';
import PageHeader from '../../components/utility/PageHeader';
import LayoutWrapper from '../../components/utility/LayoutWrapper';
import IntlMessages from '../../components/utility/intlMessages';
import { fetchListRentersThunk } from '../../redux/renters/thunks';
import RenterWrapper from './style';

const Search = Input.Search;
class Renter extends Component {
  state = {
    selectedRow: null,
    listDataRenter: [],
  };

  componentDidMount() {
    this.props.fetchListRenters(this.props.shop_id);
    console.log(this.props.listRenters, 'hiuhiu');
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.listRenters !== nextProps.listRenters) {
      this.setState({ listDataRenter: nextProps.listRenters });
    }
  }
  onSearching = value => {
    if (_.isEmpty(value)) {
      console.log('ds');
      this.setState({ listDataRenter: this.props.listRenters });
    } else {
      console.log('ds');
      const options = {
        keys: ['user_id.username', 'user_id.phoneNumber'],
      };
      const fuse = new Fuse(this.props.listRenters, options);
      if (_.isEmpty(fuse.search(value))) {
        console.log('d');
        this.setState({ listDataRenter: [] });
      } else {
        console.log('safffffff');
        this.setState({ listDataRenter: fuse.search(value) });
      }
    }
  };
  render() {
    let result = [];
    if (_.isEmpty(this.state.listDataRenter)) {
      result = [];
    } else {
      _.forEach(this.state.listDataRenter, renter => {
        const name = renter.user_id.objectId;
        const isExist = _.find(result, data => data.user_id.objectId === name);
        console.log(isExist, 'isEifd');
        if (!isExist) {
          result.push(renter);
        }
      });
    }
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
          return (
            <div>
              <Avatar src={record.user_id.avatar} />
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
          <div className="filter">
            <Search
              placeholder="Nhập từ khóa của bạn..."
              onSearch={this.onSearching}
              style={{ width: 200, marginBottom: 10 }}
            />
          </div>
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
  shop_id: PropTypes.string,
};

export default connect(
  state => {
    return {
      shop_id: state.login.shop_id,
      listRenters: state.renters.listRenters,
    };
  },
  dispatch => {
    return {
      fetchListRenters: value => {
        dispatch(fetchListRentersThunk(value));
      },
    };
  },
)(Renter);
