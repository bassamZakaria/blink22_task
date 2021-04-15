import React, { useEffect, useState } from 'react';
import { Modal, Select, Pagination } from 'antd';
import { FuelHistoryTable } from '../../components/FuelHistory/FuelHistoryTable/FuelHistoryTable';
import { EditVehicle } from '../../components/FuelHistory/EditVehicle/EditVehicle';
import { VEHICLES_SORT } from '../../utils/Enums/VehiclesSortBy';
import { setVehicles } from '../../store/actions/vehicle';
import { mapKeys } from 'lodash';
import { useDispatch } from 'react-redux';
import FuelHistoryStyle from './FuelHistory.module.scss';

export const FuelHistory = () => {
  const dispatch = useDispatch();
  const [isEditVehicle, setIsEditVehicle] = useState(false);
  const [sortType, setSortType] = useState(VEHICLES_SORT.NONE);

  const data = [
    {
      key: 4,
      name: 'Toyota Avanza',
      time: '2011-08-05T20:17:46.384Z',
      totalKm: 5000,
      volume: '123.35 L',
      cost: 625,
      status: 'ACTIVE',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    },
    {
      key: 5,
      name: 'Toyota Avanza',
      time: '2011-08-06T20:17:46.384Z',
      totalKm: 5000,
      volume: '123.35 L',
      cost: 625,
      status: 'IN_SHOP',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    },
    {
      key: 6,
      name: 'Toyota Avanza',
      time: '2011-08-07T20:17:46.384Z',
      totalKm: 5000,
      volume: '123.35 L',
      cost: 625,
      status: 'OUT_OF_SERVICE',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    },
    {
      key: 11,
      name: 'Toyota Avanza',
      time: '2011-08-12T20:17:46.384Z',
      totalKm: 5000,
      volume: '123.35 L',
      cost: 625,
      status: 'IN_SHOP',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    },
    {
      key: 12,
      name: 'Toyota Avanza',
      time: '2011-08-13T20:17:46.384Z',
      totalKm: 5000,
      volume: '123.35 L',
      cost: 625,
      status: 'OUT_OF_SERVICE',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    },
    {
      key: 1,
      name: 'Toyota Avanza',
      time: '2011-08-02T20:17:46.384Z',
      totalKm: 5000,
      volume: '123.35 L',
      cost: 625,
      status: 'ACTIVE',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    },
    {
      key: 2,
      name: 'Toyota Avanza',
      time: '2011-08-10T20:17:46.384Z',
      totalKm: 5000,
      volume: '123.35 L',
      cost: 625,
      status: 'IN_SHOP',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    },
    {
      key: 3,
      name: 'Toyota Avanza',
      time: '2011-08-10T20:17:46.384Z',
      totalKm: 5000,
      volume: '123.35 L',
      cost: 625,
      status: 'OUT_OF_SERVICE',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    },
    {
      key: 9,
      name: 'Toyota Avanza',
      time: '2011-08-10T20:17:46.384Z',
      totalKm: 5000,
      volume: '123.35 L',
      cost: 625,
      status: 'OUT_OF_SERVICE',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    },
    {
      key: 10,
      name: 'Toyota Avanza',
      time: '2011-08-10T20:17:46.384Z',
      totalKm: 5000,
      volume: '123.35 L',
      cost: 625,
      status: 'ACTIVE',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    },
    {
      key: 7,
      name: 'Toyota Avanza',
      time: '2011-08-08T20:17:46.384Z',
      totalKm: 5000,
      volume: '123.35 L',
      cost: 625,
      status: 'ACTIVE',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    },
    {
      key: 8,
      name: 'Toyota Avanza',
      time: '2011-08-09T20:17:46.384Z',
      totalKm: 5000,
      volume: '123.35 L',
      cost: 625,
      status: 'IN_SHOP',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    },
  ];

  useEffect(() => {
    function fetchData() {
      dispatch(setVehicles(mapKeys(data, 'key')));
    }
    fetchData();
  }, []);

  return (
    <>
      <div className={FuelHistoryStyle.action}>
        <Pagination total={5} />
        <Select
          value={sortType}
          onChange={newValue => setSortType(newValue)}
          style={{ width: 120 }}
        >
          {Object.values(VEHICLES_SORT).map(value => (
            <Select.Option value={value}>{value}</Select.Option>
          ))}
        </Select>
      </div>
      <FuelHistoryTable sortBy={sortType} editAction={() => setIsEditVehicle(true)} />
      {isEditVehicle && (
        <Modal
          title="Edit Fuel Entry"
          okText={'Save'}
          visible={isEditVehicle}
          onCancel={() => setIsEditVehicle(false)}
        >
          <EditVehicle />
        </Modal>
      )}
    </>
  );
};
