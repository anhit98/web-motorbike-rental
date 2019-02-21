import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Table, Button, Icon, Popconfirm } from 'antd';
import LayoutWrapper from '../../components/utility/LayoutWrapper';
import {
  fetchListMotorTypesThunk,
  addListMotorTypesThunk,
  editListMotorTypesThunk,
  deleteListMotorTypesThunk,
} from '../../redux/motorbiketype/thunks';
import MotorbikeTypeStyle from './style';
import MotorTModal from './../MotorTModal/index';
import { toggleModal } from './../../redux/modals/actions';

export function formatCurrency(value) {
  if (value) {
    const money = value
      .toString()
      .replace(/,/g, '')
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return `${money} đ`;
  }
  return '0';
}
class MotorbikeType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowData: {},
      listDataMotorType: [],
    };

    this.columns = [
      {
        title: 'STT',
        key: 'index',
        render: (text, record, index) => index,
      },
      {
        title: 'Tên loại xe',
        dataIndex: 'name',
        key: 'name',
        width: '30%',
      },
      {
        title: 'Chỉnh sửa',
        className: 'column-center',
        key: 'action',
        width: '20%',
        render: (value, record) => (
          <span>
            <Icon
              className="iconEdit"
              type="edit"
              title="Chỉnh sửa"
              onClick={() => {
                this.showModalEdit(record);
              }}
            />
          </span>
        ),
      },
      {
        title: 'Xóa',
        className: 'column-center',
        key: 'action',
        width: '20%',
        render: (value, record) => (
          <span>
            <Popconfirm
              title="Bạn chắc chắn muốn xóa?"
              onConfirm={() => this.handleDelete(record)}
              okText="Đồng ý"
              cancelText="Hủy bỏ"
            >
              <Icon className="iconDel" type="delete" title="Xóa" />
            </Popconfirm>
          </span>
        ),
      },
    ];
  }
  componentDidMount() {
    this.props.fetchListMotorType();
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.listMotortype !== nextProps.listMotortype) {
      this.setState({ listDataMotorType: nextProps.listMotortype });
    }
  }
  handleDelete = data => {
    this.props.deleteListMotorTypes(data);
  };
  showModalAdd = () => {
    this.setState({ rowData: {} });
    this.props.toggleModal('addMotorTModal', true);
  };
  showModalEdit = record => {
    this.setState({ rowData: record });
    this.props.toggleModal('editMotorTModal', true);
  };

  handleCancel = () => {
    this.setState({ rowData: {} });
  };
  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.props.addListMotorTypes(values);
    });
  };
  handleEdit = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.props.editListMotorTypes(this.state.rowData.objectId, values);
    });
  };
  saveFormRef = formRef => {
    this.formRef = formRef;
  };
  render() {
    return (
      <MotorbikeTypeStyle>
        <LayoutWrapper>
          <div className="header">
            <div className="button-group">
              <Button type="primary" onClick={this.showModalAdd}>
                Thêm loại xe mới
              </Button>
              {this.props.addMotorTModal && (
                <MotorTModal
                  wrappedComponentRef={this.saveFormRef}
                  text="Create"
                  title="Tạo một loại xe mới"
                  name="addMotorTModal"
                  onCreate={this.handleCreate}
                  data={this.state.rowData}
                />
              )}
              {this.props.editMotorTModal && (
                <MotorTModal
                  wrappedComponentRef={this.saveFormRef}
                  name="editMotorTModal"
                  text="Edit"
                  title="Chỉnh sửa loại xe"
                  saveFormRef={this.saveFormRef}
                  onCreate={this.handleEdit}
                  data={this.state.rowData}
                />
              )}
            </div>
          </div>
          <div className="isoLayoutContent">
            <Table
              dataSource={
                _.isEmpty(this.state.listDataMotorType)
                  ? this.props.listMotortype
                  : this.state.listDataMotorType
              }
              columns={this.columns}
            />
          </div>
        </LayoutWrapper>
      </MotorbikeTypeStyle>
    );
  }
}

MotorbikeType.propTypes = {
  fetchListMotorType: PropTypes.func,
  addListMotorTypes: PropTypes.func,
  editListMotorTypes: PropTypes.func,
  deleteListMotorTypes: PropTypes.func,
  toggleModal: PropTypes.func,
  addMotorTModal: PropTypes.bool,
  editMotorTModal: PropTypes.bool,
  listMotortype: PropTypes.array,
};

export default connect(
  state => {
    return {
      listMotortype: state.motortypes.listMotorTypes,
      addMotorTModal: state.togglemodal.modal.addMotorTModal,
      editMotorTModal: state.togglemodal.modal.editMotorTModal,
    };
  },
  dispatch => {
    return {
      fetchListMotorType: () => {
        dispatch(fetchListMotorTypesThunk());
      },
      addListMotorTypes: value => {
        dispatch(addListMotorTypesThunk(value));
      },
      editListMotorTypes: (id, value) => {
        dispatch(editListMotorTypesThunk(id, value));
      },
      deleteListMotorTypes: data => {
        dispatch(deleteListMotorTypesThunk(data));
      },
      toggleModal: (name, status) => dispatch(toggleModal(name, status)),
    };
  },
)(MotorbikeType);
