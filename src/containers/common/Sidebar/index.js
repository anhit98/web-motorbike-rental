import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import clone from 'clone';
import { Scrollbars } from 'react-custom-scrollbars';
import IntlMessages from '../../../components/utility/intlMessages';
import { getCurrentTheme } from '../ThemeSwitcher/config';
import SidebarWrapper from './style';

import Logo from '../../../components/utility/logo';
import { rtl } from '../../../config/withDirection';

const SubMenu = Menu.SubMenu;
const { Sider } = Layout;
const customizedTheme = getCurrentTheme('sidebarTheme', 'themedefault');
// const stripTrailingSlash = str => {
//   if (str.substr(-1) === '/') {
//     return str.substr(0, str.length - 1);
//   }
//   return str;
// };

class Sidebar extends Component {
  state = {
    collapsed: false,
  };

  getAncestorKeys = key => {
    const map = {
      sub3: ['sub2'],
    };
    return map[key] || [];
  };
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  renderView({ style, ...props }) {
    const viewStyle = {
      marginRight: rtl === 'rtl' ? '0' : '-17px',
      paddingRight: rtl === 'rtl' ? '0' : '9px',
      marginLeft: rtl === 'rtl' ? '-17px' : '0',
      paddingLeft: rtl === 'rtl' ? '9px' : '0',
    };
    return <div className="box" style={{ ...style, ...viewStyle }} {...props} />;
  }

  render() {
    const { app } = this.props;
    // const url = stripTrailingSlash('/');
    const collapsed = clone(app.collapsed) && !clone(app.openDrawer);
    // const mode = collapsed === true ? 'vertical' : 'inline';
    const scrollheight = app.height;
    const styling = {
      backgroundColor: customizedTheme.backgroundColor,
    };
    const submenuColor = {
      color: customizedTheme.textColor,
    };
    return (
      <SidebarWrapper>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          width="240"
          className="isomorphicSidebar"
          style={styling}
        >
          <Logo collapsed={collapsed} />
          <Scrollbars renderView={this.renderView} style={{ height: scrollheight - 70 }}>
            <Menu
              theme="dark"
              defaultSelectedKeys={['sub1']}
              defaultOpenKeys={['sub1']}
              mode="inline"
              inlineCollapsed={this.state.collapsed}
            >
              <Menu.Item key="sub1">
                <Link to={'/'}>
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i className="anticon anticon-pie-chart" />
                    <span className="nav-text">
                      <IntlMessages id="sidebar.dashboard" />
                    </span>
                  </span>
                </Link>
              </Menu.Item>
              <Menu.Item key="sub2">
                <Link to={'/loai-xe'}>
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i className="anticon anticon-plus-square" />
                    <span className="nav-text">
                      <IntlMessages id="sidebar.motorbiketype" />
                    </span>
                  </span>
                </Link>
              </Menu.Item>
              <Menu.Item key="sub3">
                <Link to={'/khach-hang'}>
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i className="anticon anticon-user" />
                    <span className="nav-text">
                      <IntlMessages id="sidebar.renter" />
                    </span>
                  </span>
                </Link>
              </Menu.Item>
              {/* <SubMenu
                key="sub2"
                title={
                  <span>
                    <Link to={'/motorbike-type'}>
                      <span className="isoMenuHolder" style={submenuColor}>
                        <i className="anticon anticon-plus-square" />
                        <span className="nav-text">
                          <IntlMessages id="sidebar.motorbiketype" />
                        </span>
                      </span>
                    </Link>
                  </span>
                }
              >
                <Menu.Item key="1">Thêm loại xe</Menu.Item>
                <Menu.Item key="2">Chi tiết loại xe</Menu.Item>
              </SubMenu> */}
              {/* {getDevSidebar(url, submenuColor)} */}
            </Menu>
          </Scrollbars>
        </Sider>
      </SidebarWrapper>
    );
  }
}

Sidebar.propTypes = {
  app: PropTypes.object,
};

export default connect(
  state => ({
    app: state.App,
  }),
  null,
)(Sidebar);
