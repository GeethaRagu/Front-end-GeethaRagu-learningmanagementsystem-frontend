import React from "react";

const APIError = ({ message }) => {
  return (
    <div className="error-screen">
      <h1>Oops! Something went wrong.</h1>
      <p>{message}</p>
    </div>
  );
};

export default APIError;
