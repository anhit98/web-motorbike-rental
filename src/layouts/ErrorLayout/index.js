import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Notifications from 'react-notification-system-redux';
import LoadingScreenTransparent from '../../components/common/LoadingScreenTransparent';
import './index.css';

class ErrorLayout extends Component {
  componentWillMount() {}
  componentDidMount() {}
  render() {
    const PublicComponent = this.props.component;
    return (
      <div>
        <Route {...this.props} component={PublicComponent} />
        {this.props.isMainLoading ? <LoadingScreenTransparent /> : null}
        <Notifications notifications={this.props.notifications} />
      </div>
    );
  }
}

ErrorLayout.propTypes = {
  component: PropTypes.func,
  isMainLoading: PropTypes.bool,
  notifications: PropTypes.array,
};

function mapStateToProps(state) {
  return {
    isMainLoading: state.loading.isMainLoading,
    notifications: state.notifications,
  };
}

export default connect(mapStateToProps)(ErrorLayout);
