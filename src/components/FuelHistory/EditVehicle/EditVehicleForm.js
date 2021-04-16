import React from 'react';
import { Col, DatePicker, Form, InputNumber, Modal, Row, Select, Typography } from 'antd';
import { VEHICLES } from '../../../utils/Enums/Vehicles';
import { useDispatch, useSelector } from 'react-redux';
import { addVehicle, addVehicleAsync } from '../../../store/actions/vehicle';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { FUEL_TYPE } from '../../../utils/Enums/FuelType';

export const EditVehicleForm = ({ vehicleId, closeModal }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const vehicle = useSelector(({ vehicles }) => vehicles.vehicles[vehicleId]);

  const onSave = () => {
    form
      .validateFields()
      .then(values => {
        dispatch(
          addVehicleAsync({
            ...vehicle,
            name: values.name,
            date: moment(values.date).toISOString(),
            totalKm: values.totalKm,
            volume: values.volume,
            fuelType: values.fuelType,
          })
        );
        closeModal();
      })
      .catch(info => {
        console.log({ info });
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
          date: moment(vehicle?.date),
          totalKm: vehicle?.totalKm,
          volume: vehicle?.volume,
        }}
      >
        <Typography.Text type="secondary">Vehicle</Typography.Text>
        <Form.Item name="name" rules={[{ required: true }]}>
          <Select>
            {Object.entries(VEHICLES).map(([key, label]) => (
              <Select.Option key={uuidv4()} value={key}>
                {label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Row gutter={16}>
          <Col className="gutter-row" span={12}>
            <Typography.Text type="secondary">Start Date</Typography.Text>
            <Form.Item name="date" rules={[{ required: true }]}>
              <DatePicker showTime style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={12}>
            <Typography.Text type="secondary">Odometer</Typography.Text>
            <Form.Item name="totalKm" rules={[{ required: true }]}>
              <InputNumber style={{ width: '100%' }} suffix="Kms" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col className="gutter-row" span={12}>
            <Typography.Text type="secondary">Volume</Typography.Text>
            <Form.Item name="volume" rules={[{ required: true }]}>
              <InputNumber style={{ width: '100%' }} suffix="Ltrs" />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={12}>
            <Typography.Text type="secondary">Fuel Type(optional)</Typography.Text>
            <Form.Item name="fuelType">
              <Select placeholder="Select One" allowClear>
                {Object.entries(FUEL_TYPE).map(([key, label]) => (
                  <Select.Option key={uuidv4()} value={key}>
                    {label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
