import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Popover } from 'antd';
import IntlMessages from '../../utility/intlMessages';
import TopbarDropdownWrapper from './topbarDropdown.style';

const demoMails = [
];

class TopbarMail extends Component {
  constructor(props) {
    super(props);
    this.handleVisibleChange = this.handleVisibleChange.bind(this);
    this.hide = this.hide.bind(this);
    this.state = {
      visible: false,
    };
  }
  hide() {
    this.setState({ visible: false });
  }
  handleVisibleChange() {
    this.setState({ visible: !this.state.visible });
  }

  render() {
    const { url, customizedTheme } = this.props;

    const content = (
      <TopbarDropdownWrapper className="topbarMail">
        <div className="isoDropdownHeader">
          <h3>
            <IntlMessages id="sidebar.email" />
          </h3>
        </div>
        <div className="isoDropdownBody">
          {demoMails.map(mail => (
            <Link to={`${url}/mailbox`} onClick={this.hide} key={mail.id}>
              <div className="isoDropdownListItem">
                <div className="isoListHead">
                  <h5>{mail.name}</h5>
                  <span className="isoDate">{mail.time}</span>
                </div>
                <p>{mail.desc}</p>
              </div>
            </Link>
          ))}
        </div>
        <a className="isoViewAllBtn">
          <IntlMessages id="topbar.viewAll" />
        </a>
      </TopbarDropdownWrapper>
    );
    return (
      <Popover
        content={content}
        trigger="click"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
        placement="bottomLeft"
      >
        <div className="isoIconWrapper">
          <i
            className="ion-email"
            style={{ color: customizedTheme.textColor }}
          />
          <span>{demoMails.length}</span>
        </div>
      </Popover>
    );
  }
}

TopbarMail.propTypes = {
  customizedTheme: PropTypes.object,
  url: PropTypes.string,
};

export default TopbarMail;
