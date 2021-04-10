import { ADD_VEHICLE, DELETE_VEHICLE, SET_VEHICLES } from '../actionTypes';

const initalState = {
  vehicles: {},
};

const setVehicles = (state, action) => {
  return state;
};

const addVehicle = (state, action) => {
  return state;
};

const deleteVehicle = (state, action) => {
  return state;
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
