import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Row, Col } from 'antd';
import ModalComponent from './../common/ModalComponent/index';

const FormItem = Form.Item;
class MotorTModals extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { form, title, text, onCreate, name } = this.props;
    const { getFieldDecorator } = form;
    return (
      <ModalComponent title={title} text={text} name={name} onCreate={onCreate}>
        <Form layout="vertical">
          <Row gutter={12}>
            <Col span={12}>
              <FormItem label="Tên loại xe">
                {getFieldDecorator('name', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input the name of collection!',
                      len: '1',
                      min: '0',
                    },
                  ],
                  initialValue: this.props.data && this.props.data.name,
                })(<Input />)}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </ModalComponent>
    );
  }
}
MotorTModals.propTypes = {
  form: PropTypes.object,
  onCreate: PropTypes.func,
  name: PropTypes.string,
  data: PropTypes.object,
  title: PropTypes.string,
  text: PropTypes.string,
};

export default Form.create()(MotorTModals);
