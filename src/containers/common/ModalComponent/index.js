import React, { Component } from 'react';
import { Modal } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { toggleModal } from '../../../redux/toggleModal/actions';

class ModalComponent extends Component {
  componentDidMount() {}

  render() {
    const { name, okText, title, onCreate, isOpenModal, children } = this.props;
    return (
      <Modal
        visible={isOpenModal && isOpenModal[name]}
        title={title}
        okText={okText}
        cancelText="Hủy"
        onCancel={() => this.props.toggleModal(name, false)}
        onOk={onCreate}
      >
        {children}
      </Modal>
    );
  }
}

ModalComponent.propTypes = {
  toggleModal: PropTypes.func,
  children: PropTypes.object,
  name: PropTypes.string,
  title: PropTypes.string,
  okText: PropTypes.string,
  onCreate: PropTypes.func,
  isOpenModal: PropTypes.object,
};

export default connect(
  state => {
    return {
      isOpenModal: state.toggleModals.modals,
    };
  },
  dispatch => {
    return {
      toggleModal: (name, status) => dispatch(toggleModal(name, status)),
    };
  },
)(ModalComponent);
