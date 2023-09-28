import React from "react";

const TranctionError = ({ errorMessages }: { errorMessages: string[] }) => {
  return (
    <div className="text-red">
      {errorMessages.map((error) => {
        return <div key={error}>{error}</div>;
      })}
    </div>
  );
};

export default TranctionError;
