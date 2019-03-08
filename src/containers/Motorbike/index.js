import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Table, Button, Icon, Popconfirm, Tag } from 'antd';
import PageHeader from '../../components/utility/PageHeader';
import LayoutWrapper from '../../components/utility/LayoutWrapper';
import IntlMessages from '../../components/utility/intlMessages';
import {
  fetchListMotorbikeThunk,
  addListMotorbikeThunk,
  editListMotorbikeThunk,
  deleteListMotorbikeThunk,
} from '../../redux/motorbike/thunks';
import MotorbikeStyle from './style';
import MotorbikeModal from './../MotorbikeModal/index';
import { toggleModal } from './../../redux/modals/actions';
// import { fetchListMotorTypesThunk } from '../../redux/motorbiketype/thunks';

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

class Motorbike extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowData: {},
      imageList: [],
      imgArr: [],
      listDataMotorbike: [],
    };
    this.columns = [
      {
        title: 'Tên xe',
        dataIndex: 'name',
        className: 'column-center',
        key: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
        width: '14%',
      },

      {
        title: 'Loại xe',
        dataIndex: 'motorbikeType_id',
        className: 'column-center',
        key: 'motorbikeType_id',
        width: '10%',
        render: (value, record) => {
          return <p>{record.motorbikeType_id.name}</p>;
        },
      },
      {
        title: 'Biển số xe',
        dataIndex: 'license_plate',
        className: 'column-center',
        key: 'license_plate',
        width: '10%',
      },
      {
        title: 'Giá',
        dataIndex: 'rent_price',
        className: 'column-center',
        key: 'rent_price',
        sorter: (a, b) => a.price - b.price,
        width: '8%',
        render: value => formatCurrency(value),
      },
      {
        title: 'Mô tả',
        dataIndex: 'description',
        className: 'column-center',
        key: 'description',
        width: '16%',
      },
      {
        title: 'Trạng thái',
        dataIndex: 'is_available',
        className: 'column-center',
        key: 'is_available',
        width: '10%',
        render: value => {
          if (value === true) {
            return <Tag color="#f50">Có sẵn</Tag>;
          }
          return <Tag color="#2db7f5">Không có sẵn</Tag>;
        },
      },
      {
        title: 'Ngày tạo',
        dataIndex: 'createdAt',
        className: 'column-center',
        key: 'createdAt',
        width: '12%',
      },
      {
        title: 'Hành động',
        className: 'column-center',
        key: 'action',
        width: '10%',
        render: (value, record) => (
          <div>
            <span>
              <Icon
                style={{ width: 45 }}
                className="iconEdit"
                type="edit"
                title="Chỉnh sửa"
                onClick={() => {
                  this.showModalEdit(record);
                }}
              />
            </span>

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
          </div>
        ),
      },
    ];
  }
  componentDidMount() {
    this.props.fetchListMotorbike(this.props.shop_id);
    // this.props.fetchListMotorType();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.listMotorbike !== nextProps.listMotorbike) {
      this.setState({ listDataMotorbike: nextProps.listMotorbike });
    }
  }
  // handler function
  getPropsFromChild = images => {
    console.log(images, 'list base64');
    this.setState({ imageList: images });
  };
  handleDelete = data => {
    this.props.delListMotorbike(data, this.props.shop_id);
  };
  showModalAdd = () => {
    this.setState({ rowData: {} });
    this.props.toggleModal('addMotorbikeModal', true);
  };
  showModalEdit = record => {
    this.setState({ rowData: record });
    console.log(record, 'editttttttttttttttttttttttttttttt');

    this.props.toggleModal('editMotorbikeModal', true);
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
      this.state.imageList.map(image => {
        const formData = new FormData();
        const a = _.replace(image.thumbUrl, new RegExp('data:image/png;base64', 'g'), '');
        formData.append('image', a);
        formData.append('type', 'base64');
        fetch('https://api.imgur.com/3/image/', {
          // mode: 'cors',
          method: 'POST',
          headers: {
            Authorization: 'Client-ID 5a1a4901a3533b4',
          },
          body: formData,
        })
          .then(res => {
            return res.json();
          })
          .then(data => {
            const u = {
              url: `https://i.imgur.com/${data.data.id}.png`,
              uid: image.uid,
            };
            console.log(u, 'data');
            this.setState({ imgArr: [...this.state.imgArr, u] });
            if (this.state.imgArr.length === this.state.imageList.length) {
              const newValues = {
                ...values,
                motorbikeType_id: {
                  __type: 'Pointer',
                  className: 'motorbikeType',
                  objectId: values.motorbikeType_id,
                },
                image: this.state.imgArr[0].url,
                shop_id: {
                  __type: 'Pointer',
                  className: 'shop',
                  objectId: this.props.shop_id,
                },
                is_available: true,
                images: this.state.imgArr,
              };
              this.props.addListMotorbike(newValues, this.props.shop_id);
              this.setState({ imgArr: [] });
              this.setState({ imageList: [] });
            }
          })
          .catch(error => {
            console.error(error);
            // alert('Upload failed: ' + error);
          });

        return null;
      });
    });
  };

  handleEdit = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      console.log(this.state.imageList.length !== 0);
      console.log(values, this.state.imageList, 'trc khi sua');

      if (err) {
        return;
      }

      console.log(this.state.imageList, 'anh');

      this.state.imageList.map(image => {
        if (_.has(image, 'name')) {
          const formData = new FormData();
          const a = _.replace(image.thumbUrl, new RegExp('data:image/png;base64', 'g'), '');
          formData.append('image', a);
          formData.append('type', 'base64');
          fetch('https://api.imgur.com/3/image/', {
            // mode: 'cors',
            method: 'POST',
            headers: {
              Authorization: 'Client-ID 5a1a4901a3533b4',
            },
            body: formData,
          })
            .then(res => {
              return res.json();
            })
            .then(data => {
              const u = {
                url: `https://i.imgur.com/${data.data.id}.png`,
                uid: image.uid,
              };
              console.log(u, 'data');
              this.setState({ imgArr: [...this.state.imgArr, u] });
              if (this.state.imgArr.length === this.state.imageList.length) {
                const newValues = {
                  ...values,
                  motorbikeType_id: {
                    __type: 'Pointer',
                    className: 'motorbikeType',
                    objectId: values.motorbikeType_id,
                  },
                  image: this.state.imgArr[0].url,
                  shop_id: {
                    __type: 'Pointer',
                    className: 'shop',
                    objectId: this.props.shop_id,
                  },
                  is_available: true,
                  images: this.state.imgArr,
                };
                this.props.editListMotorbike(
                  this.state.rowData.objectId,
                  newValues,
                  this.props.shop_id,
                );
                this.setState({ imgArr: [] });
                this.setState({ imageList: [] });
              }
            })
            .catch(error => {
              console.error(error);
              // alert('Upload failed: ' + error);
            });
        } else {
          this.setState({ imgArr: [...this.state.imgArr, image] });
          if (this.state.imgArr.length === this.state.imageList.length) {
            const newValues = {
              ...values,
              motorbikeType_id: {
                __type: 'Pointer',
                className: 'motorbikeType',
                objectId: values.motorbikeType_id,
              },
              image: this.state.imgArr[0].url,
              shop_id: {
                __type: 'Pointer',
                className: 'shop',
                objectId: this.props.shop_id,
              },
              is_available: true,
              images: this.state.imgArr,
            };
            this.props.editListMotorbike(
              this.state.rowData.objectId,
              newValues,
              this.props.shop_id,
            );
            this.setState({ imgArr: [] });
            this.setState({ imageList: [] });
          }
        }

        return null;
      });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    return (
      <MotorbikeStyle>
        <LayoutWrapper>
          <div className="header">
            <div className="button-group">
              <Button type="primary" onClick={this.showModalAdd}>
                Thêm xe mới
              </Button>
              {this.props.addMotorbikeModal && (
                <MotorbikeModal
                  getPropsFromChild={this.getPropsFromChild}
                  wrappedComponentRef={this.saveFormRef}
                  text="Create"
                  title="Tạo một xe mới"
                  name="addMotorbikeModal"
                  onCreate={this.handleCreate}
                  data={this.state.rowData}
                />
              )}
              {this.props.editMotorbikeModal && (
                <MotorbikeModal
                  wrappedComponentRef={this.saveFormRef}
                  name="editMotorbikeModal"
                  getPropsFromChild={this.getPropsFromChild}
                  text="Edit"
                  title="Chỉnh sửa xe"
                  saveFormRef={this.saveFormRef}
                  onCreate={this.handleEdit}
                  data={this.state.rowData}
                />
              )}
            </div>
          </div>

          <LayoutWrapper>
            <PageHeader>
              <IntlMessages id="sidebar.motorbike" />
            </PageHeader>
            <div className="isoLayoutContent">
              <Table
                dataSource={
                  _.isEmpty(this.state.listDataMotorbike)
                    ? this.props.listMotorbike
                    : this.state.listDataMotorbike
                }
                columns={this.columns}
              />
            </div>
          </LayoutWrapper>
        </LayoutWrapper>
      </MotorbikeStyle>
    );
  }
}

Motorbike.propTypes = {
  fetchListMotorbike: PropTypes.func,
  // fetchListMotorType: PropTypes.func,
  listMotorbike: PropTypes.array,
  addListMotorbike: PropTypes.func,
  editListMotorbike: PropTypes.func,
  delListMotorbike: PropTypes.func,
  toggleModal: PropTypes.func,
  addMotorbikeModal: PropTypes.bool,
  editMotorbikeModal: PropTypes.bool,
  shop_id: PropTypes.string,
};

export default connect(
  state => {
    return {
      shop_id: state.login.shop_id,
      listMotorbike: state.motorbike.listMotorbike,
      addMotorbikeModal: state.togglemodal.modal.addMotorbikeModal,
      editMotorbikeModal: state.togglemodal.modal.editMotorbikeModal,
    };
  },
  dispatch => {
    return {
      fetchListMotorbike: id => {
        dispatch(fetchListMotorbikeThunk(id));
      },
      // fetchListMotorType: () => {
      //   dispatch(fetchListMotorTypesThunk());
      // },
      addListMotorbike: (value, id, shopId) => {
        dispatch(addListMotorbikeThunk(value, id, shopId));
      },
      editListMotorbike: (id, value, shopId) => {
        dispatch(editListMotorbikeThunk(id, value, shopId));
      },
      delListMotorbike: (data, shopId) => {
        dispatch(deleteListMotorbikeThunk(data, shopId));
      },

      toggleModal: (name, status) => dispatch(toggleModal(name, status)),
    };
  },
)(Motorbike);
