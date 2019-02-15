import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import appActions from '../../../redux/app/actions';
import TopbarWrapper from './style';
import { getCurrentTheme } from '../ThemeSwitcher/config';
import {
  TopbarNotification,
  TopbarSearch,
  TopbarUser,
} from '../../../components/common/topbar';

const { Header } = Layout;
const customizedTheme = getCurrentTheme('topbarTheme', 'themedefault');

class Topbar extends Component {
  render() {
    const { toggleCollapsed, locale } = this.props;
    const collapsed = this.props.collapsed && !this.props.openDrawer;
    const styling = {
      background: customizedTheme.backgroundColor,
      position: 'fixed',
      width: '100%',
      height: 70,
    };
    return (
      <TopbarWrapper>
        <Header
          style={styling}
          className={
            collapsed ? 'isomorphicTopbar collapsed' : 'isomorphicTopbar'
          }
        >
          <div className="isoLeft">
            <button
              className={
                collapsed ? 'triggerBtn menuCollapsed' : 'triggerBtn menuOpen'
              }
              style={{ color: customizedTheme.textColor }}
              onClick={toggleCollapsed}
            />
          </div>

          <ul className="isoRight">
            <li className="isoSearch">
              <TopbarSearch locale={locale} customizedTheme={customizedTheme} />
            </li>

            <li
              onClick={() => this.setState({ selectedItem: 'notification' })}
              className="isoNotify"
            >
              <TopbarNotification
                locale={locale}
                customizedTheme={customizedTheme}
              />
            </li>

            <li
              onClick={() => this.setState({ selectedItem: 'user' })}
              className="isoUser"
            >
              <TopbarUser locale={locale} customizedTheme={customizedTheme} />
            </li>
          </ul>
        </Header>
      </TopbarWrapper>
    );
  }
}

Topbar.propTypes = {
  collapsed: PropTypes.bool,
  openDrawer: PropTypes.bool,
  toggleCollapsed: PropTypes.func,
  locale: PropTypes.string,
};

const { toggleCollapsed } = appActions;

export default connect(
  state => ({
    ...state.App,
    locale: state.LanguageSwitcher.language.locale,
  }),
  dispatch => ({
    toggleCollapsed: () => {
      dispatch(toggleCollapsed());
    },
  }),
)(Topbar);
