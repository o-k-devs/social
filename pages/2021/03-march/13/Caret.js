import React from 'react';
import colors from 'styles/colors';

export default function Caret({ className, passedRef }) {
  return (
    <svg
      width="17"
      height="8"
      viewBox="0 0 17 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={passedRef}
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        strokeWidth="1"
        className="caret-stroke"
        stroke={colors.backgroundLight}
        d="M8.39888 7.99994L5.95983e-05 0.949104L1.13062 0L9.52944 7.05083L8.39888 7.99994Z"
        fill={colors.backgroundLight}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        strokeWidth="1"
        className="caret-stroke"
        stroke={colors.backgroundLight}
        d="M17.0001 0.949173L8.60126 8.00001L7.4707 7.0509L15.8695 6.87982e-05L17.0001 0.949173Z"
        fill={colors.backgroundLight}
      />
    </svg>
  );
}
