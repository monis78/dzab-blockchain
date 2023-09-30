import React from "react";
import AddressField from "./AddressField";

interface AddressContainerProps {
  addressFieldValues: string;
  onChange: (addressValue: string, index: number) => void;
}
const AddressContainer = ({
  addressFieldValues,
  onChange,
}: AddressContainerProps) => {
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
          <AddressField
            totalLines={addressFieldValues.split("\n").length}
            inputValue={addressFieldValues}
            onChange={onChange}
          />
        </dl>
      </div>
    </div>
  );
};

export default AddressContainer;
