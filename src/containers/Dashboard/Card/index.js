import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Icon } from 'antd';
import { Link } from 'react-router-dom';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { title, countNumber, linkRoute, typeIcon, styleIcon, styleCountNumber, stylebackground, styleLink } = this.props;
    return (
      <Col className="card" span={5} style={stylebackground}>
        <div className="content">
          <div className="row">
            <Col className="col-5" span={10}>
              <div className="icon-big icon-warning text-center">
                <Icon type={typeIcon} style={styleIcon} />
              </div>
            </Col>
            <Col className="col-7" span={14}>
              <div className="numbers">
                <p>{title}</p>
                <p style={styleCountNumber}> {countNumber}</p>
              </div>
            </Col>
          </div>
          <div className="footer">
            <hr className="__web-inspector-hide-shortcut__" />
            <div className="stats">
              <Link className="link" to={linkRoute} style={styleLink}>
                <span >Xem chi tiết</span>
                <Icon type="double-right" style={{ float: 'right', marginTop: '6px' }} />
              </Link>
            </div>
          </div>
        </div>
      </Col>
    );
  }
}

Card.propTypes = {
  countNumber: PropTypes.string,
  linkRoute: PropTypes.string,
  typeIcon: PropTypes.string,
  title: PropTypes.string,
  styleIcon: PropTypes.object,
  styleCountNumber: PropTypes.object,
};

export default Card;
