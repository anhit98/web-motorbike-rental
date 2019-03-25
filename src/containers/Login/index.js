import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Input from '../../components/uielements/input';
import Button from '../../components/uielements/button';
import { loginThunk, logoutThunk, getCurrentUserThunk } from '../../redux/login/thunks';
import IntlMessages from '../../components/utility/intlMessages';
import SignInStyleWrapper from './style';

const FormItem = Form.Item;
class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false,
      username: '',
      password: '',
    };
  }

  componentDidMount() {
    this.props.fetchListCurentUser();
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.isAuthenticated !== nextProps.isAuthenticated &&
      nextProps.isAuthenticated === true
    ) {
      this.setState({ redirectToReferrer: true });
    }
  }

  handleUserNameChange = e => {
    this.setState({ username: e.target.value });
  };

  handlePasswordChange = e => {
    this.setState({ password: e.target.value });
  };

  handleLogin = e => {
    e.preventDefault();
    const form = this.props.form;
    form.validateFields((err, value) => {
      if (!err) {
        this.props.login(value.username, value.password);
      }
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    const from = { pathname: '/dashboard' };
    const { form } = this.props;

    const { getFieldDecorator } = form;
    const { redirectToReferrer } = this.state;
    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }
    return (
      <SignInStyleWrapper className="isoSignInPage">
        <div className="titleWrapper">
          <Link className="titleStyle" to="/dashboard">
            Motorbike
          </Link>
          <Link to="/dashboard" className="titleStyle titleMargin">
            Rental
          </Link>
        </div>
        <Form className="loginForm" onSubmit={this.handleLogin}>
          <div className="isoLoginContentWrapper">
            <div className="isoLoginContent">
              <div className="isoLogoWrapper">
                <Link to="/dashboard">Đăng nhập</Link>
              </div>

              <div className="isoSignInForm">
                <div className="isoInputWrapper">
                  <FormItem>
                    {getFieldDecorator('username', {
                      rules: [{ required: true, message: 'Please enter your username!' }],
                    })(
                      <Input
                        size="large"
                        name="username"
                        placeholder="Username"
                        setfieldsvalue={this.state.username}
                        onChange={this.handleUserNameChange}
                        required
                      />,
                    )}
                  </FormItem>
                </div>

                <div className="isoInputWrapper">
                  <FormItem>
                    {getFieldDecorator('password', {
                      rules: [{ required: true, message: 'Please enter your password!' }],
                    })(
                      <Input
                        size="large"
                        type="password"
                        placeholder="Password"
                        setfieldsvalue={this.state.password}
                        onChange={this.handlePasswordChange}
                        required
                      />,
                    )}
                  </FormItem>
                </div>
                <div className="isoInputWrapper isoLeftRightComponent">
                  <Button type="primary" className="btnStyle" htmlType="submit">
                    OK
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </SignInStyleWrapper>
    );
  }
}

SignIn.propTypes = {
  isAuthenticated: PropTypes.bool,
  login: PropTypes.func,
  form: PropTypes.object,
  fetchListCurentUser: PropTypes.func,
};

const createForm = Form.create()(SignIn);
export default connect(
  state => ({
    isAuthenticated: state.login.isAuthenticated,
  }),
  dispatch => ({
    login: (username, password) => {
      dispatch(loginThunk(username, password));
    },
    logout: () => {
      dispatch(logoutThunk());
    },
    fetchListCurentUser: () => {
      dispatch(getCurrentUserThunk());
    },
  }),
)(createForm);
