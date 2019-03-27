import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  setTranslations,
  setLanguageCookie,
  setDefaultLanguage,
  setLanguage,
  getLanguage,
  translate,
} from 'react-switch-lang';
import Flag from 'react-world-flags';
import { Form, Select } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Input from '../../components/uielements/input';
import Button from '../../components/uielements/button';
import { loginThunk, logoutThunk, getCurrentUserThunk } from '../../redux/login/thunks';
import en from '../../languageProvider/locales/en_US.json';
import th from '../../languageProvider/locales/vi_VN.json';
import SignInStyleWrapper from './style';
// Do this two lines only when setting up the application
setTranslations({ en, th });
setDefaultLanguage('th');
const Option = Select.Option;
// If you want to remember selected language
setLanguageCookie('language', { path: '/', maxAge: 157680000 }, undefined);

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
    console.log(getLanguage(), 'current');
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

  handleChange(value) {
    console.log(value, 'fdgd');
    if (value === 'Vietnamese') {
      setLanguage('th');
    } else {
      setLanguage('en');
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
      <div>
        <SignInStyleWrapper className="isoSignInPage">
          <Select
            defaultValue={getLanguage() === 'en' ? 'English' : 'Vietnamese'}
            style={{ width: 120 }}
            onChange={this.handleChange}
          >
            <Option value="Vietnamese">
              <Flag code="vn" height="14" style={{ marginRight: 3, marginTop: 4 }} />
              <span>Vietnamese</span>
            </Option>
            <Option value="English">
              <Flag code="us" height="13" style={{ marginRight: 3, width: 20, marginTop: 3 }} />
              <span>English</span>
            </Option>
          </Select>
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
      </div>
    );
  }
}

SignIn.propTypes = {
  isAuthenticated: PropTypes.bool,
  login: PropTypes.func,
  form: PropTypes.object,
  fetchListCurentUser: PropTypes.func,
  t: PropTypes.func.isRequired,
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
)(translate(createForm));
