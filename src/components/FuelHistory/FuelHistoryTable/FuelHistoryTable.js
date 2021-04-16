import { Avatar, Space, Table, Typography } from 'antd';
import { DeleteOutlined, FormOutlined } from '@ant-design/icons';
import React from 'react';
import { format, parseISO } from 'date-fns';
import { VehicleStatus } from '../../../utils/Enums/VehicleStatus';
import { useDispatch, useSelector } from 'react-redux';
import { deleteVehiclesAsync } from '../../../store/actions/vehicle';
import { VEHICLES_SORT } from '../../../utils/Enums/VehiclesSortBy';
import { v4 as uuidv4 } from 'uuid';
import { DATE_GROUP_FORMAT, TIME_FORMAT } from '../../../utils/Constants';
import FuelHistoryTableStyle from './FuelHistoryTable.module.scss';
import moment from 'moment';

export const FuelHistoryTable = ({ editAction, sortBy }) => {
  const dispatch = useDispatch();
  const vehicles = useSelector(({ vehicles }) => vehicles.vehicles || {});

  const renderActionCol = row => (
    <Space size="middle">
      <FormOutlined style={{ color: 'orange' }} onClick={() => editAction(row.id)} />
      <DeleteOutlined
        style={{ color: 'red' }}
        onClick={() => dispatch(deleteVehiclesAsync(row.id))}
      />
    </Space>
  );

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

  const renderCustomContent = (text, row, renderComponent) => {
    if (row.groupRow) {
      return renderContent(text, row);
    }
    return renderComponent;
  };

  const renderDateGroupRow = row => (
    <Typography.Text>{format(parseISO(row.date), DATE_GROUP_FORMAT)}</Typography.Text>
  );

  const renderStatusGroupRow = row => (
    <Typography.Text>{VehicleStatus[row?.status]?.label}</Typography.Text>
  );

  const renderGroupRow = row => (
    <>{sortBy === VEHICLES_SORT.DATE ? renderDateGroupRow(row) : renderStatusGroupRow(row)}</>
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
              <Typography.Text>{row?.name}</Typography.Text>
              <div
                className={FuelHistoryTableStyle.status}
                style={{ color: VehicleStatus[row?.status]?.color }}
              >
                {VehicleStatus[row?.status]?.label}
              </div>
            </div>
          </Space>
        );
      },
    },
    {
      title: 'Time',
      dataIndex: 'date',
      key: 'date',
      render: (text, row) =>
        renderCustomContent(text, row, <>{format(parseISO(text), TIME_FORMAT)}</>),
    },
    {
      title: 'Total KM',
      dataIndex: 'totalKm',
      key: 'totalKm',
      render: (text, row) =>
        renderCustomContent(text, row, <Typography.Text>{row.totalKm} km</Typography.Text>),
    },
    {
      title: 'Volume',
      dataIndex: 'volume',
      key: 'volume',
      render: (text, row) =>
        renderCustomContent(text, row, <Typography.Text>{row.volume} L</Typography.Text>),
    },
    {
      title: 'Cost',
      dataIndex: 'cost',
      key: 'cost',
      render: (text, row) =>
        renderCustomContent(text, row, <Typography.Text>Rp {row.cost}</Typography.Text>),
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (text, row) => renderCustomContent(text, row, renderActionCol(row)),
    },
  ];

  const addGroupRows = (arr, type) => {
    let lastGroup = null;
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
      const tmpComp = type === VEHICLES_SORT.DATE ? arr[i].date : arr[i].status;
      if (type === VEHICLES_SORT.DATE) {
        if (
          moment(tmpComp).format('DD/MM/YYYY').toString() !==
          moment(lastGroup).format('DD/MM/YYYY').toString()
        ) {
          lastGroup = arr[i].date;
          newArr.push({ ...arr[i], groupRow: true, key: uuidv4() });
        }
      }
      if (type === VEHICLES_SORT.STATUS) {
        if (tmpComp !== lastGroup) {
          lastGroup = arr[i].status;
          newArr.push({ ...arr[i], groupRow: true, key: uuidv4() });
        }
      }
      newArr.push({ ...arr[i], rowKey: uuidv4() });
    }
    return newArr;
  };

  const sort = () => {
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
          const aDate = new Date(a.date);
          const bDate = new Date(b.date);
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
        <Table
          pagination={false}
          columns={columns}
          rowKey={'rowKey'}
          rowClassName={row => (row.groupRow ? FuelHistoryTableStyle.groupRow : '')}
          dataSource={sort()}
        />
      )}
    </>
  );
};
