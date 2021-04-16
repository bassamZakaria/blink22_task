import React from 'react';
import { Layout, Menu, Image } from 'antd';
import { Link } from 'react-router-dom';
import { Routes } from '../../utils/Enums/Routes';
import { VehicleIcon } from '../../assets/VehicleIcon';
import { ReportIcon } from '../../assets/ReportIcon';
import { PeopleIcon } from '../../assets/PeopleIcon';
import MenuImage from '../../assets/smartselect_20190706-141800_chromeimage.png';

export const MainDrawer = () => (
  <Layout.Sider theme="light" width={241}>
    <Menu
      theme="light"
      mode="inline"
      defaultSelectedKeys={['fuelHistory']}
      defaultOpenKeys={['VEHICLES', 'REPORT']}
    >
      <Menu.Item style={{ textAlign: 'center' }}>
        <Image src={MenuImage} />
      </Menu.Item>
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
