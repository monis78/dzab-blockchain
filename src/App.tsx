import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import Button from "./component/Button";
import Header from "./component/Header";
import AddressContainer from "./component/AddressContainer";
import {
  TransactionActionType,
  calculateTransactionValueBasedOnAction,
  validateFieldInput,
  validateFieldInputResult,
} from "./utils/common-method";
import TranctionError from "./component/TransactionError";
import DublicationError from "./component/DublicationError";
import { toast } from "react-toastify";

function App() {
  const [addressValue, setAddressValue] = useState([""]);
  const [validateTransaction, setValidateTransaction] =
    useState<validateFieldInputResult>({
      isError: false,
      errorMessage: [],
      isDublicateError: false,
      transactionByUniqueAddresses: {},
      dublicateAddressPosition: {},
    });
  const ref = useRef(1);

  useEffect(() => {
    focusNextInput(ref.current);
  }, [addressValue.length]);

  const onAddressValueChange = (updatedAddressValue: string, index: number) => {
    const updatedAddress = [...addressValue];
    updatedAddress[index - 1] = updatedAddressValue;
    setAddressValue(updatedAddress);
    setValidateTransaction({
      ...validateTransaction,
      isError: false,
      isDublicateError: false,
    });
  };

  const onLineChange = (lineNo: number, action: "ADD" | "DELETE") => {
    if (action === "ADD") {
      setAddressValue([...addressValue, ""]);
    } else {
      const updatedAddress = [...addressValue];
      updatedAddress.splice(lineNo - 1, 1);
      setAddressValue(updatedAddress);
    }
  };

  const focusNextInput = (id: number) => {
    if (id !== -1) {
      const nextIndex = id + 1;
      const nextInput = document.getElementById(`input-${nextIndex}`);
      if (nextInput) {
        nextInput.focus();
        ref.current = nextIndex;
      }
    }
  };

  const onFormSubmit = () => {
    const validateInputValues = validateFieldInput(addressValue);
    if (validateInputValues.isError || validateInputValues.isDublicateError) {
      setValidateTransaction(validateInputValues);
      return;
    } else if (
      Object.values(validateInputValues.transactionByUniqueAddresses).length
    ) {
      toast.success("Thanks for submitting your response");
    } else {
      toast.warn("Please Add input address");
    }
  };

  const onTransactionResolveAction = (action: TransactionActionType) => {
    setAddressValue(
      calculateTransactionValueBasedOnAction(
        action,
        validateTransaction.transactionByUniqueAddresses
      )
    );
    setValidateTransaction({
      ...validateTransaction,
      isDublicateError: false,
    });
  };

  return (
    <div className="App text-white bg-neutral-500">
      <Header />
      <div className="lg px-16">
        <AddressContainer
          addressFieldValues={addressValue}
          onChange={onAddressValueChange}
          onLineChange={onLineChange}
        />

        <div className="text-left py-10 flex justify-between">
          <div>seperated by ',' or ' ' or '='</div>
          <button
            onClick={() => {
              // open accordion on click of show example
            }}
          >
            show Examples
          </button>
        </div>
        {validateTransaction.isError && (
          <TranctionError errorMessages={validateTransaction.errorMessage} />
        )}
        {validateTransaction.isDublicateError && (
          <DublicationError
            transactionByUniqueAddresses={
              validateTransaction.transactionByUniqueAddresses
            }
            dublicateAddressPosition={
              validateTransaction.dublicateAddressPosition
            }
            onTransactionResolveAction={onTransactionResolveAction}
          />
        )}

        <Button
          title="Next"
          onClick={() => {
            onFormSubmit();
          }}
          disabled={
            validateTransaction.isDublicateError || validateTransaction.isError
          }
        />
      </div>
    </div>
  );
}

export default App;
