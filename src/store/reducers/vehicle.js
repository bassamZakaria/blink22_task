import { ADD_VEHICLE, DELETE_VEHICLE, SET_VEHICLES } from '../actionTypes';
import * as dotProp from 'dot-prop-immutable';

const initalState = {
  vehicles: {},
};

const setVehicles = (state, action) => {
  return dotProp.set(state, 'vehicles', action?.vehicles);
};

const addVehicle = (state, action) => {
  return dotProp.set(state, `vehicles.${action.vehicle.key}`, action.vehicle);
};

const deleteVehicle = (state, action) => {
  return dotProp.delete(state, `vehicles.${action.vehicleId}`);
};

export default (state = initalState, action) => {
  switch (action.type) {
    case SET_VEHICLES:
      return setVehicles(state, action);
    case ADD_VEHICLE:
      return addVehicle(state, action);
    case DELETE_VEHICLE:
      return deleteVehicle(state, action);
    default:
      return state;
  }
};
