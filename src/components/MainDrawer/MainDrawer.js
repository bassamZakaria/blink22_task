import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { Routes } from '../../utils/Enums/Routes';
import { VehicleIcon } from '../../assets/VehicleIcon';
import { ReportIcon } from '../../assets/ReportIcon';
import { PeopleIcon } from '../../assets/PeopleIcon';

export const MainDrawer = () => (
  <Layout.Sider theme="light" width={241}>
    <Menu
      theme="light"
      mode="inline"
      defaultSelectedKeys={['fuelHistory']}
      defaultOpenKeys={['VEHICLES', 'REPORT']}
    >
      <Menu.SubMenu
        key="VEHICLES"
        theme="light"
        mode="inline"
        title="VEHICLES"
        icon={<VehicleIcon />}
      >
        <Menu.SubMenu key="REPORT" theme="light" mode="inline" title="REPORT" icon={<ReportIcon />}>
          {Object.entries(Routes.VEHICLES.REPORT).map(([key, value]) => (
            <Menu.Item key={key}>
              <Link to={value.path}>{value.label}</Link>
            </Menu.Item>
          ))}
        </Menu.SubMenu>
      </Menu.SubMenu>
      <Menu.Item key={'PEOPLE'} icon={<PeopleIcon />}>
        <Link to={Routes.PEOPLE.path}>{Routes.PEOPLE.label}</Link>
      </Menu.Item>
    </Menu>
  </Layout.Sider>
);
