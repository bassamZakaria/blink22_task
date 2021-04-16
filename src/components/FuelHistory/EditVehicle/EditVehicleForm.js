import React from 'react';
import { Col, DatePicker, Form, Input, Modal, Row, Select, Typography } from 'antd';
import { VEHICLES } from '../../../utils/Enums/Vehicles';
import { useDispatch, useSelector } from 'react-redux';
import { addVehicle } from '../../../store/actions/vehicle';

export const EditVehicleForm = ({ vehicleId, closeModal }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const vehicle = useSelector(({ vehicles }) => vehicles.vehicles[vehicleId]);

  const onSave = () => {
    form
      .validateFields()
      .then(values => {
        dispatch(
          addVehicle({
            ...vehicle,
            name: values.name,
            totalKm: values.totalKm,
            volume: values.volume,
          })
        );
        closeModal();
      })
      .catch(info => {
        console.log('validate');
      });
  };

  return (
    <Modal
      title="Edit Fuel Entry"
      okText={'Save'}
      visible={vehicleId}
      onCancel={closeModal}
      onOk={onSave}
    >
      <Form
        id="editVehicleForm"
        requiredMark={false}
        form={form}
        initialValues={{
          name: vehicle?.name,
          // date: vehicle?.date,
          totalKm: vehicle?.totalKm,
          volume: vehicle?.volume,
        }}
      >
        <Form.Item name="name" rules={[{ required: true }]}>
          <Typography.Text type="secondary">Vehicle</Typography.Text>
          <Select>
            {Object.entries(VEHICLES).map(([key, label]) => (
              <Select.Option value={key}>{label}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Row gutter={16}>
          <Col className="gutter-row" span={12}>
            <Form.Item name="date" rules={[{ required: true }]}>
              <Typography.Text type="secondary">Start Date</Typography.Text>
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={12}>
            <Form.Item name="totalKm" rules={[{ required: true }]}>
              <Typography.Text type="secondary">Odometer</Typography.Text>
              <Input suffix="Kms" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col className="gutter-row" span={12}>
            <Form.Item name="volume" rules={[{ required: true }]}>
              <Typography.Text type="secondary">Volume</Typography.Text>
              <Input suffix="Ltrs" />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={12}>
            <Form.Item name="fuelType">
              <Typography.Text type="secondary">Fuel Type(optional)</Typography.Text>
              <Select placeholder="Select a option and change input text above" allowClear>
                <Select.Option value="male">male</Select.Option>
                <Select.Option value="female">female</Select.Option>
                <Select.Option value="other">other</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
