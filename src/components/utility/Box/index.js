import React from 'react';
import BoxTitleWrapper from '../BoxTitle';
import { BoxWrapper } from './style';

export default props => (
  <BoxWrapper className="isoBoxWrapper">
    <BoxTitleWrapper title={props.title} subtitle={props.subtitle} />
    {props.children}
  </BoxWrapper>
);
