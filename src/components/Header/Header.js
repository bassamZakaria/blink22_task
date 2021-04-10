import React from 'react';
import { Avatar } from 'antd';
export const Header = ({ text }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <div>{text}</div>
    <Avatar size="medium" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
  </div>
);
