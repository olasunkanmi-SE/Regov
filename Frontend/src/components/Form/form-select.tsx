import React, { useState } from "react";

interface SelectProps {
  props: any[];
  onChange: (selectedNumber: number) => void;
}

const NumberSelect = ({ onChange, props }: SelectProps) => {
  const [selectedProps, setSelectedProps] = useState<number | "">("");

  const handlePropsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const number = parseInt(event.target.value, 10);
    setSelectedProps(number);
    onChange(number);
  };

  return (
    <form>
      <label htmlFor="numberSelect">Give a Rating</label>
      <select id="numberSelect" name="number" value={selectedProps} onChange={handlePropsChange}>
        <option value="">-- Select a number --</option>
        {props.map((prop) => (
          <option key={prop} value={prop}>
            {prop}
          </option>
        ))}
      </select>
    </form>
  );
};

export default NumberSelect;
