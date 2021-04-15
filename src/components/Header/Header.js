import React from 'react';
import { Avatar, Layout, Typography } from 'antd';
import HeaderStyle from './Header.module.scss';
export const Header = ({ text }) => (
  <Layout.Header className={HeaderStyle.root}>
    <Typography.Text>{text}</Typography.Text>
    <Avatar size="medium" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
  </Layout.Header>
);
