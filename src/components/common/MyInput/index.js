import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { HOC } from 'formsy-react';
import './index.css';

class MyInputHoc extends Component {
  componentDidMount() {}
  render() {
    let errClass;
    let className;
    let errorMsg;
    if (!this.props.isPristine()) {
      errClass = this.props.showError() ? 'error' : '';
      className = this.props.showRequired() ? 'required' : errClass;
      errorMsg = this.props.getErrorMessage();
      if (this.props.showRequired()) {
        errorMsg = 'This field is required';
      }
    }
    return (
      <div className={className}>
        <input
          className={this.props.className}
          placeholder={this.props.placeholder}
          value={this.props.getValue() || ''}
          onChange={e => this.props.setValue(e.target.value)}
        />
        <span>{errorMsg}</span>
      </div>
    );
  }
}

MyInputHoc.propTypes = {
  getValue: PropTypes.func,
  setValue: PropTypes.func,
  showRequired: PropTypes.func,
  showError: PropTypes.func,
  getErrorMessage: PropTypes.func,
  isPristine: PropTypes.func,
  className: PropTypes.string,
  placeholder: PropTypes.string,
};

export default HOC(MyInputHoc);
