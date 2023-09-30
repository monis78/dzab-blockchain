import React, { useCallback, useMemo } from "react";

interface AddressFieldProps {
  totalLines: number;
  inputValue: string;
  onChange: (addressValue: string, index: number) => void;
  onLineChange?: (lineNo: number, action: "ADD" | "DELETE") => void;
}
const AddressField = ({
  totalLines,
  inputValue,
  onChange,
}: AddressFieldProps) => {
  const handleInputChange = (event: any) => {
    onChange(event.target.value, totalLines);
  };
  const getLineNumber = useCallback(() => {
    return (
      <>
        {new Array(totalLines).fill(0).map((line, index) => {
          return <div key={index + 1}>{index + 1}</div>;
        })}
      </>
    );
  }, [totalLines]);

  return (
    <div style={{ display: "flex" }}>
      <div className="line-number">{getLineNumber()}</div>
      <div className="line"></div>

      <textarea
        className="line-input bg-transparent px-5"
        value={inputValue}
        onChange={handleInputChange}
        rows={10}
        cols={80}
        style={{ fontFamily: "monospace", lineHeight: "24px" }}
      />
    </div>
  );
};

export default AddressField;
