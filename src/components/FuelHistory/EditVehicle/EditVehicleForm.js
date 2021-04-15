import React from 'react';
import { Col, DatePicker, Form, Input, Row, Select } from 'antd';
import { VEHICLES } from '../../../utils/Enums/Vehicles';

export const EditVehicleForm = ({}) => {
  const [form] = Form.useForm();

  return (
    <Form requiredMark={false} form={form}>
      <Form.Item
        name="vehicle"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Select>
          {Object.entries(VEHICLES).map(([key, label]) => (
            <Select.Option value={key}>{label}</Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Row gutter={16}>
        <Col className="gutter-row" span={12}>
          <Form.Item>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item
            name="kms"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input suffix="Kms" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col className="gutter-row" span={12}>
          <Form.Item
            name="ltrs"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input suffix="Ltrs" />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item>
            <Select placeholder="Select a option and change input text above" allowClear>
              <Select.Option value="male">male</Select.Option>
              <Select.Option value="female">female</Select.Option>
              <Select.Option value="other">other</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
