import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import { Form, Input, Upload, Icon, Modal, InputNumber, Row, Col, Select } from 'antd';
import ModalComponent from './../common/ModalComponent/index';
import MotorbikeModalStyle from './style';
import { fetchListMotorTypesThunk } from '../../redux/motorbiketype/thunks';

const FormItem = Form.Item;
const Option = Select.Option;

function handleChange(value) {
  console.log(`selected ${value}`);
}

function handleBlur() {
  console.log('blur');
}

function handleFocus() {
  console.log('focus');
}
class MotorbikeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: _.isEmpty(this.props.data.images) ? [] : this.props.data.images,
    };
  }
  componentDidMount() {
    this.props.fetchListMotorType();
    if (!_.isEmpty(this.props.data.images)) {
      this.props.getPropsFromChild(this.state.fileList);
    }
  }

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  handleChange = ({ fileList }) => {
    this.setState({ fileList });
    console.log(fileList, 'imagesssssssssssssdvdvbfsss');
    this.props.getPropsFromChild(this.state.fileList);
  };

  handleCancel = () => this.setState({ previewVisible: false });

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { form, title, text, onCreate, name } = this.props;
    const { getFieldDecorator } = form;
    return (
      <ModalComponent
        title={title}
        text={text}
        name={name}
        images={this.state.fileList}
        onCreate={onCreate}
      >
        <Form layout="vertical">
          <Row gutter={12}>
            <Col span={12}>
              <FormItem label="Tên xe">
                {getFieldDecorator('name', {
                  rules: [
                    {
                      required: true,
                      message: 'Vui lòng nhập trường này!',
                      len: '1',
                      min: '0',
                    },
                  ],
                  initialValue: this.props.data && this.props.data.name,
                })(<Input />)}
              </FormItem>
            </Col>

            <Col span={12}>
              <FormItem label="Biển số xe">
                {getFieldDecorator('license_plate', {
                  rules: [
                    {
                      required: true,
                      message: 'Vui lòng nhập trường này!',
                      len: '1',
                      min: '0',
                    },
                  ],
                  initialValue: this.props.data && this.props.data.license_plate,
                })(<Input />)}
              </FormItem>
            </Col>

            <Col span={12}>
              <FormItem label="Loại xe">
                {getFieldDecorator('motorbikeType_id', {
                  rules: [
                    {
                      required: true,
                      message: 'Vui lòng nhập trường này!',
                      len: '1',
                      min: '0',
                    },
                  ],
                  // initialValue: this.props.data && this.props.data.motorbikeType_id.objectId,
                  initialValue:
                    this.props.data &&
                    this.props.data.motorbikeType_id &&
                    this.props.data.motorbikeType_id.objectId,
                })(
                  <Select
                    showSearch
                    style={{ width: 238 }}
                    placeholder="Chọn loại xe"
                    optionFilterProp="children"
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    id="motorbikeType_id"

                    filterOption={(input, option) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0

                    }
                  >
                    {this.props.listMotor.map(motortype => (
                      <Option
                        key={motortype.objectId}
                        id={motortype.objectId}
                        value={motortype.objectId}
                      >
                        {motortype.name}
                      </Option>
                    ))}
                  </Select>,
                  <Input />,
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <MotorbikeModalStyle>
                <FormItem label="Giá">
                  {getFieldDecorator('rent_price', {
                    rules: [{ required: true, message: 'Vui lòng nhập trường này!' }],
                    initialValue: this.props.data && this.props.data.rent_price,
                  })(
                    <InputNumber
                      className="Inputnumber"
                      formatter={value => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    />,
                  )}
                </FormItem>
              </MotorbikeModalStyle>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={24}>
              <FormItem label="Hình ảnh">
                {getFieldDecorator(
                  'images',
                  _.isEmpty(this.state.fileList)
                    ? {
                        rules: [
                          {
                            required: true,
                            message: 'Vui lòng nhập trường này!',
                            len: '1',
                            min: '0',
                          },
                        ],
                      }
                    : '',
                )(
                  <div className="clearfix">
                    <Upload
                      action="//jsonplaceholder.typicode.com/posts/"
                      listType="picture-card"
                      fileList={fileList}
                      onPreview={this.handlePreview}
                      onChange={this.handleChange}
                    >
                      {fileList.length >= 4 ? null : uploadButton}
                    </Upload>
                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                      <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                  </div>,
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem label="Mô tả chi tiết">
                {getFieldDecorator('description', {
                  initialValue: this.props.data && this.props.data.description,
                })(<Input type="textarea" />)}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </ModalComponent>
    );
  }
}
MotorbikeModal.propTypes = {
  fetchListMotorType: PropTypes.func,
  form: PropTypes.object,
  onCreate: PropTypes.func,
  name: PropTypes.string,
  getPropsFromChild: PropTypes.func,
  data: PropTypes.object,
  title: PropTypes.string,
  text: PropTypes.string,
  listMotor: PropTypes.array,
};

const createForm = Form.create()(MotorbikeModal);
export default connect(
  state => {
    console.log(state.motortypes.listMotorTypes, 'stateau');
    return {
      listMotor: state.motortypes.listMotorTypes,
    };
  },
  dispatch => {
    return {
      fetchListMotorType: () => {
        dispatch(fetchListMotorTypesThunk());
      },
    };
  },
)(createForm);
