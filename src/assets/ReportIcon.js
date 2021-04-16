import React from 'react';
import Icon from '@ant-design/icons';

const ReportSvg = () => (
  <svg width="15" height="19" viewBox="0 0 15 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0.4375 0.8125H1.125H9.375H9.63281L9.89062 0.984375L14.0156 5.10938L14.1875 5.36719V5.625V18V18.6875H13.5H1.125H0.4375V18V1.5V0.8125ZM1.8125 2.1875V17.3125H12.8125V6.3125H9.375H8.6875V5.625V2.1875H1.8125ZM10.0625 3.17578V4.9375H11.8242L10.0625 3.17578ZM3.875 7.6875H10.75V9.0625H3.875V7.6875ZM3.875 10.4375H10.75V11.8125H3.875V10.4375ZM3.875 13.1875H10.75V14.5625H3.875V13.1875Z"
      fill="#4D7CFE"
    />
  </svg>
);

export const ReportIcon = props => <Icon component={ReportSvg} {...props} />;
