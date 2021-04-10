import React from 'react';
import './App.css';
import { Layout, Menu } from 'antd';
import { BrowserRouter, Link, Route, Switch, Redirect } from 'react-router-dom';
import { DefaultPage } from './pages/DefaultPage';
import { FuelHistory } from './pages/FuelHistory/FuelHistory';
import { Header } from './components/Header/Header';
import { MainPage } from './containers/MainPage/MainPage';

function App() {
  const routes = {
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
    PEOPLE: undefined,
  };

  return (
    <BrowserRouter>
      <Layout style={{ minHeight: '100vh' }}>
        <Layout.Sider theme="light">
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={['fuelHistory']}
            defaultOpenKeys={['VEHICLES', 'REPORT']}
          >
            <Menu.SubMenu key="VEHICLES" theme="light" mode="inline" title="VEHICLES">
              <Menu.SubMenu key="REPORT" theme="light" mode="inline" title="REPORT">
                {Object.entries(routes.VEHICLES.REPORT).map(([key, value]) => (
                  <Menu.Item key={key}>
                    <Link to={value.path}>{value.label}</Link>
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            </Menu.SubMenu>
          </Menu>
        </Layout.Sider>
        <Layout>
          <Layout.Header style={{ backgroundColor: 'white', width: '100%' }}>
            <Header text="Hello Header" />
          </Layout.Header>
          <Switch>
            <Redirect exact from="/" to={routes.VEHICLES.REPORT.fuelHistory.path} />
            {Object.values(routes.VEHICLES.REPORT).map(route => (
              <Route
                {...route}
                key={route.path}
                render={() => <MainPage>{route.comp}</MainPage>}
              />
            ))}
          </Switch>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
