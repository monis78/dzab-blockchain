import React from "react";

const TranctionError = ({ errorMessages }: { errorMessages: string[] }) => {
  return (
    <div className="text-red-800 border-2 m-4 border-red-800 flex justify-left">
      <div className="p-4">i</div>
      <div>
        {errorMessages.map((error) => {
          return <div key={error}>{error}</div>;
        })}
      </div>
    </div>
  );
};

export default TranctionError;
