import React, { useCallback } from "react";
import ReactSelect, { StylesConfig } from "react-select";

interface SelectProps {
  options: { label: string; value: string }[];
  value: { label: string; value: string } | null;
  handleChange: (
    selectedOption: { label: string; value: string } | null
  ) => void;
}

const customStyles: StylesConfig<any, false> = {
  indicatorSeparator: (base) => ({
    ...base,
    width: 0,
  }),
  control: (base) => ({
    ...base,
    border: "1px solid #000",
    borderRadius: "5px",
    boxShadow: "none",
    ":hover": {
      cursor: "pointer",
      border: "1px solid #000",
    },
  }),
  valueContainer: (base) => ({
    ...base,
    padding: "3px 8px",
  }),
};

const Select: React.FC<SelectProps> = React.memo(
  ({ options, value, handleChange }) => {
    const onChange = useCallback(
      (selectedOption: { label: string; value: string } | null) => {
        handleChange(selectedOption);
      },
      [handleChange]
    );

    return (
      <ReactSelect
        options={options}
        value={value}
        onChange={onChange}
        isSearchable={false}
        styles={customStyles}
      />
    );
  }
);

export default Select;
