import React, { useEffect, useState } from 'react';
import { Button, Select, Typography } from 'antd';
import { FuelHistoryTable } from '../../components/FuelHistory/FuelHistoryTable/FuelHistoryTable';
import { VEHICLES_SORT } from '../../utils/Enums/VehiclesSortBy';
import { setVehiclesAsync } from '../../store/actions/vehicle';
import { useDispatch, useSelector } from 'react-redux';
import FuelHistoryStyle from './FuelHistory.module.scss';
import { EditVehicleForm } from '../../components/FuelHistory/EditVehicle/EditVehicleForm';
import { RightArrowIcon } from '../../assets/RightArrowIcon';
import { v4 as uuidv4 } from 'uuid';
import { LeftArrowIcon } from '../../assets/LeftArrowIcon';
import { PAGE_COUNT } from '../../utils/Constants';

export const FuelHistory = () => {
  const dispatch = useDispatch();
  const [editVehicleId, setEditVehicleId] = useState(undefined);
  let page = useSelector(({ vehicles }) => vehicles.page || 1);
  const totalCount = useSelector(({ vehicles }) => vehicles.totalCount || -1);
  const [sortType, setSortType] = useState(VEHICLES_SORT.NONE);

  useEffect(() => {
    async function fetchData() {
      dispatch(setVehiclesAsync(page));
    }
    fetchData();
  }, [dispatch, totalCount, page]);

  return (
    <>
      <div className={FuelHistoryStyle.action}>
        <div>
          <Typography.Text>{`${(page - 1) * PAGE_COUNT + 1}-${
            page * PAGE_COUNT > totalCount ? totalCount : page * PAGE_COUNT
          } of ${totalCount}`}</Typography.Text>
        </div>
        <>
          <Button
            icon={<LeftArrowIcon />}
            disabled={page === 1}
            onClick={() => dispatch(setVehiclesAsync(page - 1))}
          />
          <Button
            icon={<RightArrowIcon />}
            disabled={page === Math.ceil(totalCount / PAGE_COUNT)}
            onClick={() => dispatch(setVehiclesAsync(page + 1))}
          />
        </>
        <Select
          value={sortType}
          onChange={newValue => setSortType(newValue)}
          style={{ width: 120 }}
        >
          {Object.values(VEHICLES_SORT).map(value => (
            <Select.Option key={uuidv4()} value={value}>
              <Typography.Text style={{ opacity: '50%' }}>Sort: </Typography.Text>
              {value}
            </Select.Option>
          ))}
        </Select>
      </div>
      <FuelHistoryTable sortBy={sortType} editAction={id => setEditVehicleId(id)} />
      <EditVehicleForm vehicleId={editVehicleId} closeModal={() => setEditVehicleId(undefined)} />
    </>
  );
};
