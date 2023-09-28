import React, { useMemo } from "react";
import AddressField from "./AddressField";

interface AddressContainerProps {
  addressFieldValues: string[];
  onChange: (addressValue: string, index: number) => void;
  onLineChange: (lineNo: number, action: "ADD" | "DELETE") => void;
}
const AddressContainer = ({
  addressFieldValues,
  onChange,
  onLineChange,
}: AddressContainerProps) => {
  const memoizeValue = useMemo(() => {
    return addressFieldValues;
  }, [addressFieldValues]);
  return (
    <div className="p-10" style={{ backgroundColor: "black" }}>
      <div
        className="pb-60  relative overflow-hidden"
        style={{
          maxHeight: "300px",
        }}
      >
        <dl
          className="grid grid-cols-1 gap-x-8 text-center text-white overflow-auto"
          style={{ maxHeight: "300px", scrollbarWidth: "none" }}
        >
          {memoizeValue.map((fieldValue, lineNo) => {
            return (
              <AddressField
                key={lineNo}
                lineNo={lineNo + 1}
                inputValue={fieldValue}
                onChange={onChange}
                onLineChange={onLineChange}
              />
            );
          })}
        </dl>
      </div>
    </div>
  );
};

export default AddressContainer;
