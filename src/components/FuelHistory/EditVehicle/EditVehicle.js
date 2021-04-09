import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { EditVehicleForm } from './EditVehicleForm';

const vehicleValidationSchema = (label_error_required = 'Error message from me') => {
  return Yup.object({
    vehicle: Yup.string().required(label_error_required),
    startDate: Yup.date()
      .required(label_error_required)
      .test(value => {
        if (value) {
          return true;
        }
      }),
    odometer: Yup.string().required(label_error_required),
    volume: Yup.string().required(label_error_required),
    fuelOption: Yup.string(),
  });
};

const initialValues = {
  vehicle: 'hello',
  odometer: 'hello',
  volume: 'hello',
  fuelOption: 'hello',
};

export const EditVehicle = () => (
  // <Formik
  //   validationSchema={vehicleValidationSchema}
  //   initialValues={initialValues}
  //   onSubmit={() => console.log('Submit')}
  //   render={EditVehicleForm}
  // />
  <EditVehicleForm />
);
