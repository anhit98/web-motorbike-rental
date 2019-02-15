import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Notifications from 'react-notification-system-redux';
import { history } from '../../redux/store';
import LoadingScreenTransparent from '../../components/common/LoadingScreenTransparent';
import AppHolder from './style';

const PrivateLayout = props => {
  const Component = props.component;
  const isAuthenticated = props.isAuthenticated;
  if (!isAuthenticated) {
    history.push('/auth/login');
  }
  return (
    <div>
      <AppHolder>
        <Route {...props} component={Component} />
        {props.isMainLoading ? <LoadingScreenTransparent /> : null}
        <Notifications notifications={props.notifications} />
      </AppHolder>
    </div>
  );
};

PrivateLayout.propTypes = {
  component: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  isMainLoading: PropTypes.bool,
  notifications: PropTypes.array,
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.login.isAuthenticated,
    isMainLoading: state.loading.isMainLoading,
    notifications: state.notifications,
  };
}

export default connect(mapStateToProps)(PrivateLayout);
