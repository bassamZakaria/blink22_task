import React, { useState } from 'react';
import { Modal } from 'antd';
import { FuelHistoryTable } from '../../components/FuelHistory/FuelHistoryTable/FuelHistoryTable';
import { EditVehicle } from '../../components/FuelHistory/EditVehicle/EditVehicle';

export const FuelHistory = () => {
  const [isEditVehicle, setIsEditVehicle] = useState(false);

  return (
    <>
      <FuelHistoryTable editAction={() => setIsEditVehicle(true)} />
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
