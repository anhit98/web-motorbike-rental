import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Avatar, Input, Button, Icon } from 'antd';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Highlighter from 'react-highlight-words';
import PageHeader from '../../components/utility/PageHeader';
import LayoutWrapper from '../../components/utility/LayoutWrapper';
import IntlMessages from '../../components/utility/intlMessages';
import { fetchListRentersThunk } from '../../redux/renters/thunks';
import RenterWrapper from './style';

// import admin from '../../assets/images/admin.png';
class Renter extends Component {
  state = {
    selectedRow: null,
    searchText: '',
  };

  componentDidMount() {
    this.props.fetchListRenters(this.props.shop_id);
    console.log(this.props.listRenters, 'hiuhiu');
  }
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ),
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

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
        // ...this.getColumnSearchProps('username'),
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
