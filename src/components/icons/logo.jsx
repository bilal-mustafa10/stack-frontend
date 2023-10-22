import React from 'react';
import { Svg } from './svg';

export const Logo = props => {
  return (
    <Svg {...props} display="inline-block" viewBox="0 0 40 40" width="40px" height="40px">
        <rect width="40" height="40" rx="20" fill="#6B41E8" />
        <g transform="translate(9, 9)">
            <path
                d="M20 10a28.076 28.076 0 0 1-1.091 9M6.231 2.37a8.994 8.994 0 0 1 12.88 3.73M1.958 13S2 12.577 2 10a8.949 8.949 0 0 1 1.735-5.307m12.84 3.088c.281.706.426 1.46.425 2.22a30 30 0 0 1-.464 6.231M5 10a6 6 0 0 1 9.352-4.974M3 19a5.964 5.964 0 0 1 1.01-3.328 5.15 5.15 0 0 0 .786-1.926m8.66 2.486a13.96 13.96 0 0 1-.962 2.683M6.5 17.336C8 15.092 8 12.846 8 10a3 3 0 1 1 6 0c0 .75 0 1.521-.031 2.311M11 10.001c0 3 0 6-2 9"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </g>
    </Svg>
  );
};
