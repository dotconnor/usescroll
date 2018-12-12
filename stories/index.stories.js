import React from 'react';

import { storiesOf } from '@storybook/react';
import usescroll from '..';

const UseScroll = () => {
  const scrolls = usescroll();
  return (
    <div style={{height: 10000, width: 10000}}>
      <div style={{position: 'fixed'}}>
      {'Absolute scroll positions, updated based on passed in timeout, with a guarantee to be updated on the last call.'}
      <br />
      {'Vertical:' + scrolls[0]}
      <br />
      {'Horizontal:' + scrolls[1]}
      </div>
    </div>
  )
}
const UseScrollRelative = () => {
  const scrolls = usescroll(250, true);
  return (
    <div style={{height: 10000, width: 10000}}>
      <div style={{position: 'fixed'}}>
      {'Calculated based on previous scroll, updated on scroll stop.'}
      <br />
      {'Vertical (Relative):' + scrolls[0]}
      <br />
      {'Horizontal Relative):' + scrolls[1]}
      </div>
    </div>
  )
}
storiesOf('useScroll', module)
  .add('Example', () =>
    <UseScroll />
  ).add("Relative Scroll", () =>
  <UseScrollRelative />);
