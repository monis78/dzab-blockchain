export interface validateFieldInputResult {
  isError: boolean;
  errorMessage: string[];
  isDublicateError: boolean;
  transactionByUniqueAddresses: Record<string, number[]>;
  dublicateAddressPosition: Record<string, number[]>;
}
export const validateFieldInput = (
  addressValue: string
): validateFieldInputResult => {
  let isError = false;
  let isDublicateError = false;
  const errorMessage: string[] = [];
  const transactionByUniqueAddresses: Record<string, number[]> = {};
  const dublicateAddressPosition: Record<string, number[]> = {};
  getIndividualTransaction(addressValue).forEach(
    (transactionDetails, index) => {
      if (transactionDetails === "") {
        return;
      } else {
        const seperateAddressFromTransactionDetails = transactionDetails
          .split(" ")[0]
          .split("=")[0]
          .split(",")[0];

        const transactionValue =
          getAmountAfterSpecialCharacter(transactionDetails);
        if (seperateAddressFromTransactionDetails.length !== 42) {
          isError = true;
          errorMessage.push(
            `Error on line ${index + 1}, Lenght is not equal to 42`
          );
        } else if (!seperateAddressFromTransactionDetails.startsWith("0x")) {
          isError = true;
          errorMessage.push(
            `Error on line ${index + 1}, Address doesn't start with 0x`
          );
        } else if (!(0 <= +transactionValue)) {
          isError = true;
          errorMessage.push(
            `Error on line ${index + 1}, Amount is not correct`
          );
        } else {
          if (
            transactionByUniqueAddresses[seperateAddressFromTransactionDetails]
          ) {
            transactionByUniqueAddresses[
              seperateAddressFromTransactionDetails
            ].push(transactionValue);
            dublicateAddressPosition[
              seperateAddressFromTransactionDetails
            ].push(index + 1);
            isDublicateError = true;
          } else {
            transactionByUniqueAddresses[
              seperateAddressFromTransactionDetails
            ] = [transactionValue];
            dublicateAddressPosition[seperateAddressFromTransactionDetails] = [
              index + 1,
            ];
          }
        }
      }
    }
  );

  return {
    isError,
    errorMessage,
    isDublicateError,
    transactionByUniqueAddresses,
    dublicateAddressPosition,
  };
};

const getAmountAfterSpecialCharacter = (transactionDetails: string): number => {
  const regexPatternToSeperateAmountFromTransactionDetils =
    /[=, ]\s*([^=, ]+)/g;
  const matches = transactionDetails.match(
    regexPatternToSeperateAmountFromTransactionDetils
  );

  // Extracted values
  const extractedData = (matches || []).map((match) =>
    match.replace(/^[=, ]+/, "")
  );

  return +extractedData.join();
};

export enum TransactionActionType {
  DELETE = "DELETE",
  COMBINE = "COMBINE",
}

export const calculateTransactionValueBasedOnAction = (
  action: TransactionActionType,
  dublicateTransactions: Record<string, number[]>
): string => {
  let updatedTransaction = "";
  for (const key in dublicateTransactions) {
    updatedTransaction += `${key}=${
      action === TransactionActionType.DELETE
        ? dublicateTransactions[key][0]
        : sumOfArray(dublicateTransactions[key])
    }\n`;
  }
  return updatedTransaction;
};

const sumOfArray = (array: number[]) => {
  var sum = array.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);
  return sum;
};

export const getNoOfTransactionFromTransactionData = (
  transactionData: string
): number => {
  return transactionData.split("\n").length;
};

const getIndividualTransaction = (transactionData: string): string[] => {
  return transactionData.split("\n");
};
