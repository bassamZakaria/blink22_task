import { DefaultPage } from '../../containers/DefaultPage';
import { FuelHistory } from '../../containers/FuelHistory/FuelHistory';
import React from 'react';

export const Routes = {
  VEHICLES: {
    REPORT: {
      operatingCost: {
        path: '/vehicles/reports/operatingCost',
        exact: true,
        label: 'Operating Cost',
        comp: <DefaultPage text={'Operating Cost'} />,
      },
      fuelHistory: {
        path: '/vehicles/reports/fuelHistory',
        exact: true,
        label: 'Fuel History',
        comp: <FuelHistory />,
      },
      totalCost: {
        path: '/vehicles/reports/totalCost',
        exact: true,
        label: 'Total Cost',
        comp: <DefaultPage text={'Total Cost'} />,
      },
      costPerMeter: {
        path: '/vehicles/reports/costPerMeter',
        exact: true,
        label: 'Cost/Meter',
        comp: <DefaultPage text={'Cost/Meter'} />,
      },
      expenseSummary: {
        path: '/vehicles/reports/expenseSummary',
        exact: true,
        label: 'Expense Summary',
        comp: <DefaultPage text={'Expense Summary'} />,
      },
      utilization: {
        path: '/vehicles/reports/utilization',
        exact: true,
        label: 'Utilization',
        comp: <DefaultPage text={'Utilization'} />,
      },
      maintenance: {
        path: '/vehicles/reports/maintenance',
        exact: true,
        label: 'Maintenance',
        comp: <DefaultPage text={'Maintenance'} />,
      },
      service: {
        path: '/vehicles/reports/service',
        exact: true,
        label: 'Service',
        comp: <DefaultPage text={'Service'} />,
      },
    },
  },
  PEOPLE: {
    path: '/people',
    label: 'People',
    comp: <DefaultPage text={'People'} />,
  },
};
