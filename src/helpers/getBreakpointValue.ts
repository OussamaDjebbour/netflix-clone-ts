import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config'; // Fix the path

const fullConfig = resolveConfig(tailwindConfig);
export const getBreakpointValue = (
  value: keyof typeof fullConfig.theme.screens,
): number =>
  +fullConfig.theme.screens[value].slice(
    0,
    fullConfig.theme.screens[value].indexOf('px'),
  );
// export const getBreakpointValue = (value: string): number =>
//   +fullConfig.theme.screens[value].slice(
//     0,
//     fullConfig.theme.screens[value].indexOf('px'),
//   );

export const getCurrentBreakpoint = (): string => {
  let currentBreakpoint: string = '';
  let biggestBreakpointValue = 0;
  for (const breakpoint of Object.keys(fullConfig.theme.screens)) {
    if (['small', 'sm', 'md', 'lg', 'xl', '2xl'].includes(breakpoint)) {
      // const breakpointValue = getBreakpointValue(breakpoint);
      const breakpointValue = getBreakpointValue(
        breakpoint as keyof typeof fullConfig.theme.screens,
      );
      if (
        breakpointValue > biggestBreakpointValue &&
        window.innerWidth >= breakpointValue
      ) {
        biggestBreakpointValue = breakpointValue;
        currentBreakpoint = breakpoint;
      }
    }
  }
  return currentBreakpoint;
};

// const isSmallScreen = useMediaQuery({ query: '(max-width: 640px)' });
// const isMediumScreen = useMediaQuery({
//   query: '(min-width: 641px) and (max-width: 768px)',
// });
// const isLargeScreen = useMediaQuery({ query: '(min-width: 769px)' });

// const [state, setState] = useState('initial state');

// if (isSmallScreen) {
//   setState('small screen state');
// } else if (isMediumScreen) {
//   setState('medium screen state');
// } else {
//   setState('large screen state');
// }

import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

// const [state, setState] = useState('initial state');

// const isSmallScreen = useMediaQuery({ query: '(max-width: 640px)' });

// useEffect(() => {
//   if (isSmallScreen) {
//     setState('small screen state');
//   } else {
//     setState('large screen state');
//   }
// }, [isSmallScreen]);
