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
  addressValue.split("\n").forEach((transactionDetails, index) => {
    if (transactionDetails === "") {
      return;
    } else {
      const address = transactionDetails
        .split(" ")[0]
        .split("=")[0]
        .split(",")[0];
      const transactionValue =
        +getAmountAfterSpecialCharacter(transactionDetails);
      console.log(transactionDetails, transactionValue);
      if (address.length !== 42) {
        isError = true;
        errorMessage.push(
          `Error on line ${index + 1}, Lenght is not equal to 42`
        );
      } else if (!address.startsWith("0x")) {
        isError = true;
        errorMessage.push(
          `Error on line ${index + 1}, Address doesn't start with 0x`
        );
      } else if (!(0 <= +transactionValue)) {
        isError = true;
        errorMessage.push(`Error on line ${index + 1}, Amount is not correct`);
      } else {
        if (transactionByUniqueAddresses[address]) {
          transactionByUniqueAddresses[address].push(transactionValue);
          dublicateAddressPosition[address].push(index + 1);
          isDublicateError = true;
        } else {
          transactionByUniqueAddresses[address] = [transactionValue];
          dublicateAddressPosition[address] = [index + 1];
        }
      }
    }
  });

  return {
    isError,
    errorMessage,
    isDublicateError,
    transactionByUniqueAddresses,
    dublicateAddressPosition,
  };
};

const getAmountAfterSpecialCharacter = (transactionDetails: string) => {
  const regexPattern = /[=, ]\s*([^=, ]+)/g;
  const matches = transactionDetails.match(regexPattern);

  // Extracted values
  const extractedData = (matches || []).map((match) =>
    match.replace(/^[=, ]+/, "")
  );

  return extractedData.join();
};

export type TransactionActionType = "DELETE" | "COMBINE";

export const calculateTransactionValueBasedOnAction = (
  action: TransactionActionType,
  dublicateTransactions: Record<string, number[]>
): string => {
  let updatedTransaction = "";
  for (const key in dublicateTransactions) {
    updatedTransaction += `${key}=${
      action === "DELETE"
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
