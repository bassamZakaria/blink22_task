import { ADD_VEHICLE, DELETE_VEHICLE, SET_VEHICLES } from '../actionTypes';
import { mapKeys } from 'lodash';

export const setVehiclesAsync = page => {
  return async dispatch => {
    const response = await fetch(`http://localhost:8080/vehicles?_page=${page}&_limit=10`);
    const data = await response.json();
    dispatch(setVehicles(mapKeys(data, 'id'), page, +response.headers.get('x-total-count')));
  };
};

const setVehicles = (vehicles, page, totalCount) => {
  return {
    type: SET_VEHICLES,
    vehicles,
    page,
    totalCount,
  };
};

export const addVehicleAsync = vehicle => {
  return async dispatch => {
    const response = await fetch(`http://localhost:8080/vehicles/${vehicle.id}`, {
      method: 'PATCH',
      body: JSON.stringify(vehicle),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 200) {
      dispatch(addVehicle(vehicle));
    }
  };
};

const addVehicle = vehicle => {
  return {
    type: ADD_VEHICLE,
    vehicle,
  };
};

export const deleteVehiclesAsync = vehicleId => {
  return async dispatch => {
    const response = await fetch(`http://localhost:8080/vehicles/${vehicleId}`, {
      method: 'delete',
    });
    if (response.status === 200) {
      dispatch(deleteVehicle(vehicleId));
    }
  };
};
const deleteVehicle = vehicleId => {
  return {
    type: DELETE_VEHICLE,
    vehicleId,
  };
};
