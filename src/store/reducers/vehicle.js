import { ADD_VEHICLE, DELETE_VEHICLE, SET_VEHICLES } from '../actionTypes';
import * as dotProp from 'dot-prop-immutable';

const initalState = {
  vehicles: {},
  page: 1,
  totalCount: -1,
};

const setVehicles = (state, action) => {
  let tmpState = dotProp.set(state, 'page', action?.page);
  tmpState = dotProp.set(tmpState, 'totalCount', action?.totalCount);
  return dotProp.set(tmpState, 'vehicles', action?.vehicles);
};

const addVehicle = (state, action) => {
  return dotProp.set(state, `vehicles.${action.vehicle.id}`, action.vehicle);
};

const deleteVehicle = (state, action) => {
  const newTotalCount = state.totalCount - 1;
  let tmpState = dotProp.set(state, 'totalCount', newTotalCount);

  // const maxPage = Math.ceil(newTotalCount / PAGE_COUNT);
  // if (maxPage < state.page && state.page !== -1) {
  //   tmpState = dotProp.set(state, 'page', state.page - 1);
  // }
  return dotProp.delete(tmpState, `vehicles.${action.vehicleId}`);
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
