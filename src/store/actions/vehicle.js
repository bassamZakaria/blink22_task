import { ADD_VEHICLE, DELETE_VEHICLE, SET_VEHICLES } from '../actionTypes';

export const setVehicles = vehicles => {
  return {
    type: SET_VEHICLES,
    vehicles,
  };
};

export const addVehicle = vehicle => {
  return {
    type: ADD_VEHICLE,
    vehicle,
  };
};

export const deleteVehicle = vehicleId => {
  return {
    type: DELETE_VEHICLE,
    vehicleId,
  };
};
