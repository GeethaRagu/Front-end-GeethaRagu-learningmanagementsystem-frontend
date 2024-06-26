import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { clearcartItems } from "../Redux/Slice/cartSlice";

const PaymentSuccess = () => {
    const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearcartItems());
   
  }, []);
  return (
    <div className="min-h-screen mb-5 max-w-50 text-white dark:text-white">
      <div className="m-auto text-center">
        <h1>Your Payment is successful </h1>
        <Link to="/" className="text-blue-600">
          Click here to return to home page
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
