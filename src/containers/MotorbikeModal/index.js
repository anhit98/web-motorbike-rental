import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, InputNumber, Row, Col, Select } from 'antd';
import ModalComponent from './../common/ModalComponent/index';
import MotorbikeModalStyle from './style';
import { fetchListMotorTypesThunk } from '../../redux/motorbiketype/thunks';
import _ from 'lodash';
import { connect } from 'react-redux';


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
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchListMotorType();
  }
  render() {
    const { form, title, text, onCreate, name } = this.props;
    const { getFieldDecorator } = form;
    return (
      <ModalComponent title={title} text={text} name={name} onCreate={onCreate}>
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
                  initialValue: this.props.data && this.props.data.motorbikeType_id && this.props.data.motorbikeType_id.objectId,
                })(
                  <Select
                    showSearch
                    style={{ width: 238 }}
                    placeholder="Chọn loại xe"
                    optionFilterProp="children"
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >


                    {this.props.listMotor.map(motortype => (
                      <Option key={motortype.objectId} value={motortype.objectId}>
                        {motortype.name}
                      </Option>
                    ))}

                  </Select>,
                  <Input />)}
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
                {getFieldDecorator('image', {
                  rules: [
                    {
                      required: true,
                      message: 'Vui lòng nhập trường này!',
                      len: '1',
                      min: '0',
                    },
                  ],
                  initialValue: this.props.data && this.props.data.image,
                })(<Input />)}
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
  form: PropTypes.object,
  onCreate: PropTypes.func,
  name: PropTypes.string,
  data: PropTypes.object,
  title: PropTypes.string,
  text: PropTypes.string,
  listMotor: PropTypes.array,
};

const createForm = Form.create()(MotorbikeModal);
export default connect(
  state => {
    console.log(state.motortypes.listMotorTypes, "stateau");
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

