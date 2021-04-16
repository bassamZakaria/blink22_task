import React, { useEffect, useState } from 'react';
import { Pagination, Select, Button, Typography } from 'antd';
import { FuelHistoryTable } from '../../components/FuelHistory/FuelHistoryTable/FuelHistoryTable';
import { VEHICLES_SORT } from '../../utils/Enums/VehiclesSortBy';
import { setVehicles } from '../../store/actions/vehicle';
import { mapKeys } from 'lodash';
import { useDispatch } from 'react-redux';
import FuelHistoryStyle from './FuelHistory.module.scss';
import { EditVehicleForm } from '../../components/FuelHistory/EditVehicle/EditVehicleForm';
import { RightArrowIcon } from '../../assets/RightArrowIcon';

export const FuelHistory = () => {
  const dispatch = useDispatch();
  const [editVehicleId, setEditVehicleId] = useState(undefined);
  const [sortType, setSortType] = useState(VEHICLES_SORT.NONE);
  let [page, setPage] = useState(1);
  let [totalCount, setTotalCount] = useState(-1);

  const pageCount = 10;

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`http://localhost:8080/vehicles?_page=${page}&_limit=10`);
      setTotalCount(+response.headers.get('x-total-count'));
      const data = await response.json();
      dispatch(setVehicles(mapKeys(data, 'id')));
    }
    fetchData();
  }, [page]);

  return (
    <>
      <div className={FuelHistoryStyle.action}>
        <div>
          <Typography.Text>{`${(page - 1) * pageCount + 1}-${
            page * pageCount > totalCount ? totalCount : page * pageCount
          } of ${totalCount}`}</Typography.Text>
        </div>
        <>
          <Button
            icon={<RightArrowIcon />}
            disabled={page === 1}
            onClick={() => setPage(prevState => prevState - 1)}
          />
          <Button
            icon={<RightArrowIcon />}
            disabled={page === Math.ceil(totalCount / pageCount)}
            onClick={() => setPage(prevState => prevState + 1)}
          />
        </>
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
      <FuelHistoryTable sortBy={sortType} editAction={id => setEditVehicleId(id)} />
      <EditVehicleForm vehicleId={editVehicleId} closeModal={() => setEditVehicleId(undefined)} />
    </>
  );
};
