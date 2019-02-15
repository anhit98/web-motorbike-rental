import React from 'react';
import { ComponentTitleWrapper } from './style';

export default props => (
  <ComponentTitleWrapper className="isoComponentTitle">
    {props.children}
  </ComponentTitleWrapper>
);
