import React from "react";
import ReactSelect from 'react-select';

export default function Select ({
  options,
  value,
  handleChange
}: {
  options: any,
  value: any,
  handleChange: any
}) {
  return (
    <ReactSelect options={options} value={value} onChange={handleChange} isSearchable={false} styles={{
      indicatorSeparator: (baseStyles) => ({
        ...baseStyles,
        width: 0,
      }),
      control: (baseStyles) => ({
        ...baseStyles,
        border: '1px solid #000',
        boxShadow: 'none',
        ":hover": {
          cursor: 'pointer',
          border: '1px solid #000',
        },
      }),
      valueContainer: (baseStyles) => ({
        ...baseStyles,
        padding: '10px 8px',
      })
    }} />
  );
};
