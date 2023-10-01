import React, { useMemo } from "react";
import ValidationError from "./TransactionError";
import { TransactionActionType } from "../utils/common-method";

const DublicationError = ({
  transactionByUniqueAddresses,
  dublicateAddressPosition,
  onTransactionResolveAction,
}: {
  transactionByUniqueAddresses: Record<string, number[]>;
  dublicateAddressPosition: Record<string, number[]>;
  onTransactionResolveAction: (resolveAction: TransactionActionType) => void;
}) => {
  const formattedErrorMessage = useMemo(() => {
    let errorMessage: string[] = [];
    for (const [key, value] of Object.entries(transactionByUniqueAddresses)) {
      if (value.length > 1) {
        errorMessage.push(
          `${key} dublicate in Line: ${dublicateAddressPosition[key].join(",")}`
        );
      }
    }
    return errorMessage;
  }, [transactionByUniqueAddresses, dublicateAddressPosition]);
  return (
    <div className="text-red-400">
      <div className="flex justify-between">
        <div>Dublicate</div>
        <div className="flex justify-between">
          <button
            onClick={() => {
              onTransactionResolveAction(TransactionActionType.DELETE);
            }}
            className="px-4"
          >
            Keep the first one
          </button>
          <div className="px-4">|</div>
          <button
            onClick={() => {
              onTransactionResolveAction(TransactionActionType.COMBINE);
            }}
            className="px-4"
          >
            Combine Balance
          </button>
        </div>
      </div>
      <div className="flex justify-left p-4">
        <div className="p-4">i</div>
        <ValidationError errorMessages={formattedErrorMessage} />
      </div>
    </div>
  );
};

export default DublicationError;
