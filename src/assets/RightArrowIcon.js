import React from 'react';
import Icon from '@ant-design/icons';

const RightArrow = () => (
  <svg width="7" height="15" viewBox="0 0 7 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0 14.4609V13.125L0 1.875V0.539062L0.984375 1.45312L6.60938 7.07813L6.96094 7.5L6.60938 7.92188L0.984375 13.5469L0 14.4609ZM1.125 11.7539L5.37891 7.5L1.125 3.24609V11.7539Z"
      fill="#778CA2"
    />
  </svg>
);

export const RightArrowIcon = props => <Icon component={RightArrow} {...props} />;
