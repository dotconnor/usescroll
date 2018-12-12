import * as react from 'react';
function throttle(fn, delay) {
  let lastCall = 0;
  return function (...args) {
    const now = (new Date).getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return fn(...args);
  }
}
function debounce(fn, delay) {
  let timerId;
  return function (...args) {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      fn(...args);
      timerId = null;
    }, delay);
  }
}
export default (timeout = 250, relative = false) => {
  const checkScroll = () => (window ? [window.pageYOffset || document.documentElement.scrollTop, window.pageXOffset || document.documentElement.scrollLeft] : [0,0]);
  const [state, setState] = react.useState(checkScroll());
  const handler = () => {
    setState((prev) => checkScroll().map((updated, i) => {
      console.log(prev, updated);
      if (relative) return updated - prev[i];
      return updated;
    }));
  }
  const throttled = throttle(handler, timeout);
  const debounced = debounce(handler, timeout);
  react.useEffect(() => {
    const internalHandler = () => {
      if (!relative) throttled();
      debounced();
    }
    (window || {}).addEventListener('scroll', internalHandler);
    return () => {
      (window || {}).removeEventListener('scroll', internalHandler);
    }
  })
  return state;
}