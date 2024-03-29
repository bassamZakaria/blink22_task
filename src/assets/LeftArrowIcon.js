import React from 'react';
import Icon from '@ant-design/icons';

const LeftArrow = () => (
  <svg width="7" height="15" viewBox="0 0 7 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7 14.4609V13.125L7 1.875V0.539062L6.01562 1.45312L0.390625 7.07813L0.0390625 7.5L0.390625 7.92188L6.01562 13.5469L7 14.4609ZM5.875 11.7539L1.62109 7.5L5.875 3.24609V11.7539Z"
      fill="#778CA2"
    />
  </svg>
);

export const LeftArrowIcon = props => <Icon component={LeftArrow} {...props} />;
