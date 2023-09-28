import React from "react";

interface AddressFieldProps {
  lineNo: number;
  inputValue: string;
  onChange: (addressValue: string, index: number) => void;
  onLineChange: (lineNo: number, action: "ADD" | "DELETE") => void;
}
const AddressField = ({
  lineNo,
  inputValue,
  onChange,
  onLineChange,
}: AddressFieldProps) => {
  return (
    <div style={{ display: "flex" }}>
      <span className="line-number">{lineNo}</span>
      <div className="line"></div>
      <input
        value={inputValue}
        className="line-input bg-transparent px-5"
        type="text"
        onChange={(event) => {
          onChange(event.target.value, lineNo);
        }}
        id={`input-${lineNo}`}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            onLineChange(lineNo, "ADD");
          } else if (
            event.key === "Backspace" &&
            event.currentTarget.value === ""
          ) {
            onLineChange(lineNo, "DELETE");
          }
        }}
      />
    </div>
  );
};

export default AddressField;
