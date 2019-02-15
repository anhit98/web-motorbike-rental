import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

class AuthorizeRoute extends PureComponent {
  componentDidMount() {}
  render() {
    const { role, userRoles, location } = this.props;
    const locationState = location.state || { from: { pathname: '/' } };
    if (role && role.indexOf(userRoles) === -1) {
      return (
        <Redirect
          to={{
            pathname: '/error/401-error',
            state: { from: locationState },
          }}
        />
      );
    }
    return (
      <div>
        <Route {...this.props} />
      </div>
    );
  }
}

AuthorizeRoute.propTypes = {
  exact: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  fullPath: PropTypes.string,
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  role: PropTypes.array,
  userRoles: PropTypes.string,
  location: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    userRoles: state.login.roles,
  };
};

export default connect(mapStateToProps)(AuthorizeRoute);
