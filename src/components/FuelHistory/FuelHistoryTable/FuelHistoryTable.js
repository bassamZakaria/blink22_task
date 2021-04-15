import { Avatar, Space, Table } from 'antd';
import { DeleteOutlined, FormOutlined } from '@ant-design/icons';
import React from 'react';
import { format, parseISO } from 'date-fns';
import { VehicleStatus } from '../../../utils/Enums/VehicleStatus';
import { useDispatch, useSelector } from 'react-redux';
import { deleteVehicle } from '../../../store/actions/vehicle';
import { VEHICLES_SORT } from '../../../utils/Enums/VehiclesSortBy';
import { v4 as uuidv4 } from 'uuid';

export const FuelHistoryTable = ({ editAction, sortBy }) => {
  const dispatch = useDispatch();
  const vehicles = useSelector(({ vehicles }) => vehicles.vehicles || {});

  const renderContent = (value, row) => {
    const obj = {
      children: value,
      props: {},
    };
    if (row.groupRow) {
      obj.props.colSpan = 0;
    }
    return obj;
  };

  const renderDateGroupRow = row => <div>{row.time}</div>;

  const renderStatusGroupRow = row => <div>{VehicleStatus[row?.status]?.label}</div>;

  const renderGroupRow = row => (
    <div>{sortBy === VEHICLES_SORT.DATE ? renderDateGroupRow(row) : renderStatusGroupRow(row)}</div>
  );

  const columns = [
    {
      title: 'Vehicle',
      key: 'name',
      render: (text, row) => {
        if (row.groupRow) {
          return {
            children: renderGroupRow(row),
            props: {
              colSpan: 6,
            },
          };
        }
        return (
          <Space size="middle">
            <div>
              <Avatar size="small" src={row?.avatar} />
            </div>
            <div>
              <div>{row?.name}</div>
              <div style={{ color: VehicleStatus[row?.status]?.color }}>
                {VehicleStatus[row?.status]?.label}
              </div>
            </div>
          </Space>
        );
      },
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
      render: (text, row) => {
        if (row.groupRow) {
          return renderContent(text, row);
        }
        return <>{format(parseISO(text), 'dd/mm/yyyy h:mm a')}</>;
      },
    },
    { title: 'Total KM', dataIndex: 'totalKm', key: 'totalKm', render: renderContent },
    { title: 'Volume', dataIndex: 'volume', key: 'volume', render: renderContent },
    { title: 'Cost', dataIndex: 'cost', key: 'cost', render: renderContent },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (text, row) => {
        if (row.groupRow) {
          return renderContent(text, row);
        }
        return (
          <Space size="middle">
            <FormOutlined style={{ color: 'orange' }} onClick={editAction} />
            <DeleteOutlined
              style={{ color: 'red' }}
              onClick={() => dispatch(deleteVehicle(row.key))}
            />
          </Space>
        );
      },
    },
  ];

  const addGroupRows = (arr, type) => {
    let lastGroup = null;
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
      const tmpComp = type === VEHICLES_SORT.DATE ? arr[i].time : arr[i].status;
      debugger;
      if (tmpComp != lastGroup) {
        lastGroup = type === VEHICLES_SORT.DATE ? arr[i].time : arr[i].status;
        newArr.push({ ...arr[i], groupRow: true });
      }
      newArr.push({ ...arr[i], rowKey: uuidv4() });
    }
    return newArr;
  };

  const sort = () => {
    console.log({ vehicles });
    debugger;
    if (sortBy === VEHICLES_SORT.STATUS) {
      return addGroupRows(
        Object.values(vehicles).sort(function (a, b) {
          if (a.status > b.status) {
            return 1;
          }
          if (b.status > a.status) {
            return -1;
          }
          return 0;
        }),
        VEHICLES_SORT.STATUS
      );
    } else if (sortBy === VEHICLES_SORT.DATE)
      return addGroupRows(
        Object.values(vehicles).sort((a, b) => {
          const aDate = new Date(a.time);
          const bDate = new Date(b.time);
          if (aDate > bDate) {
            return -1;
          }
          if (aDate < bDate) {
            return 1;
          }
          return 0;
        }),
        VEHICLES_SORT.DATE
      );
    else return Object.values(vehicles);
  };

  return (
    <>
      {vehicles && Object.values(vehicles) && (
        <Table pagination={false} columns={columns} rowKey={'rowKey'} dataSource={sort()} />
      )}
    </>
  );
};
