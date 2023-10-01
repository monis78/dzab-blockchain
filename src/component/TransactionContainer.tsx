import React from "react";
import AddressField from "./AddressField";
import { getNoOfTransactionFromTransactionData } from "../utils/common-method";

interface TransactionContainerProps {
  transactionData: string;
  onChange: (addressValue: string) => void;
}
const AddressContainer = ({
  transactionData,
  onChange,
}: TransactionContainerProps) => {
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
            totalLines={getNoOfTransactionFromTransactionData(transactionData)}
            inputValue={transactionData}
            onChange={onChange}
          />
        </dl>
      </div>
    </div>
  );
};

export default AddressContainer;
