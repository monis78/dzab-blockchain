import React, { useState } from "react";
import "./App.css";
import Button from "./component/Button";
import Header from "./component/Header";
import TransactionContainer from "./component/TransactionContainer";
import {
  TransactionActionType,
  calculateTransactionValueBasedOnAction,
  validateFieldInput,
  validateFieldInputResult,
} from "./utils/common-method";
import TranctionError from "./component/TransactionError";
import DublicationError from "./component/DublicationError";
import { toast } from "react-toastify";
import EditTransactionInstructions from "./component/EditTransactionInstructions";

function App() {
  const [transactionData, setTransactionData] = useState("");
  const [validateTransaction, setValidateTransaction] =
    useState<validateFieldInputResult>({
      isError: false,
      errorMessage: [],
      isDublicateError: false,
      transactionByUniqueAddresses: {},
      dublicateAddressPosition: {},
    });

  const onTransactionDataChange = (updatedTransactionData: string) => {
    setTransactionData(updatedTransactionData);
    setValidateTransaction({
      ...validateTransaction,
      isError: false,
      isDublicateError: false,
    });
  };

  const onFormSubmit = () => {
    const validateInputValues = validateFieldInput(transactionData);
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
    setTransactionData(
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
        <TransactionContainer
          transactionData={transactionData}
          onChange={onTransactionDataChange}
        />

        <EditTransactionInstructions />

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
