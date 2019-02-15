import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Popover, Icon, Popconfirm } from 'antd';
import { connect } from 'react-redux';
import IntlMessages from '../../utility/intlMessages';
import { logoutThunk, getCurentUser } from '../../../redux/login/thunks';
import userpic from '../../../assets/images/admin.png';
import TopbarDropdownWrapper from './topbarDropdown.style';

class TopbarUser extends Component {
  constructor(props) {
    super(props);
    this.handleVisibleChange = this.handleVisibleChange.bind(this);
    this.hide = this.hide.bind(this);
    this.state = {
      visible: false,
    };
  }

  componentDidMount() {
    this.props.getCurentUser();
  }
  hide() {
    this.setState({ visible: false });
  }
  handleVisibleChange() {
    this.setState({ visible: !this.state.visible });
  }

  handleLogOut() {
    this.props.logout();
  }

  render() {
    const content = (
      <TopbarDropdownWrapper className="isoUserDropdown">
        <a className="isoDropdownLink">
          <span>
            <Icon className="icon" title="Profile" type="user" />Xin chào
            <b> {this.props.listCurents.username}</b>
          </span>
        </a>
        <a className="isoDropdownLink">
          <span>
            <Popconfirm
              title="Đăng xuất sẽ tự động kết thúc phiên hoạt động của bạn. Bạn có tiếp tục không?"
              onConfirm={() => this.handleLogOut()}
              okText="Đồng ý"
              cancelText="Hủy bỏ"
            >
              <Icon className="icon" title="Đăng xuất" type="logout" />{' '}
              <IntlMessages id="topbar.logout" />
            </Popconfirm>
          </span>
        </a>
      </TopbarDropdownWrapper>
    );

    return (
      <Popover
        content={content}
        trigger="click"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
        arrowPointAtCenter
        placement="bottomLeft"
      >
        <div className="isoImgWrapper">
          <img alt="user" src={userpic} />
          <span className="userActivity online" />
        </div>
      </Popover>
    );
  }
}

TopbarUser.propTypes = {
  logout: PropTypes.func,
  listCurents: PropTypes.object,
  getCurentUser: PropTypes.func,
};

export default connect(
  state => ({
    listCurents: state.login.listCurents,
  }),
  dispatch => ({
    logout: () => {
      dispatch(logoutThunk());
    },
    getCurentUser: () => {
      dispatch(getCurentUser());
    },
  }),
)(TopbarUser);
