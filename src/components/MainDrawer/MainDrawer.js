import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { Routes } from '../../utils/Enums/Routes';

export const MainDrawer = () => (
  <Layout.Sider theme="light" width={241}>
    <Menu
      theme="light"
      mode="inline"
      defaultSelectedKeys={['fuelHistory']}
      defaultOpenKeys={['VEHICLES', 'REPORT']}
    >
      <Menu.SubMenu key="VEHICLES" theme="light" mode="inline" title="VEHICLES">
        <Menu.SubMenu key="REPORT" theme="light" mode="inline" title="REPORT">
          {Object.entries(Routes.VEHICLES.REPORT).map(([key, value]) => (
            <Menu.Item key={key}>
              <Link to={value.path}>{value.label}</Link>
            </Menu.Item>
          ))}
        </Menu.SubMenu>
      </Menu.SubMenu>
    </Menu>
  </Layout.Sider>
);
