import React from "react";

const EditTransactionInstructions = () => {
  return (
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
  );
};

export default EditTransactionInstructions;
