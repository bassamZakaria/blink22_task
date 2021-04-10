import { Avatar, Space, Table } from 'antd';
import { DeleteOutlined, FormOutlined } from '@ant-design/icons';
import React from 'react';
import { format } from 'date-fns';
import { VehicleStatus } from '../../../utils/Enums/VehicleStatus';

const columns = [
  {
    title: 'Vehicle',
    key: 'name',
    render: (text, row) => {
      return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div>
            <Avatar size="small" src={row?.avatar} />
          </div>
          <div>
            <div>{row?.name}</div>
            <div style={{ color: VehicleStatus[row?.status].color }}>
              {VehicleStatus[row?.status].label}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    title: 'Time',
    dataIndex: 'time',
    key: 'time',
    render: () => {
      return <div>{format(new Date(), 'h:mm a')}</div>;
    },
  },
  { title: 'Total KM', dataIndex: 'totalKm', key: 'totalKm' },
  { title: 'Volume', dataIndex: 'volume', key: 'volume' },
  { title: 'Cost', dataIndex: 'cost', key: 'cost' },
  {
    title: 'Action',
    dataIndex: '',
    key: 'x',
    render: () => (
      <Space size="middle">
        <FormOutlined />
        <DeleteOutlined />
      </Space>
    ),
  },
];

const data = [
  {
    key: 1,
    name: 'Toyota Avanza',
    time: '2011-08-12T20:17:46.384Z',
    totalKm: 5000,
    volume: '123.35 L',
    cost: 625,
    status: 'ACTIVE',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  },
  {
    key: 1,
    name: 'Toyota Avanza',
    time: '2011-08-12T20:17:46.384Z',
    totalKm: 5000,
    volume: '123.35 L',
    cost: 625,
    status: 'IN_SHOP',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  },
  {
    key: 1,
    name: 'Toyota Avanza',
    time: '2011-08-12T20:17:46.384Z',
    totalKm: 5000,
    volume: '123.35 L',
    cost: 625,
    status: 'OUT_OF_SERVICE',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  },
];

export const FuelHistoryTable = () => {
  return <Table columns={columns} dataSource={data} top="topRight" />;
};
