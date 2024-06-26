import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import CheckOutForm from "../Components/CheckOutForm";
import { useSelector } from "react-redux";

const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY);

const Payment = () => {
  /**state from redux**/

  const cartItems = useSelector((state) => state.cart.cartItems);
  const [clientSecret, setClientSecret] = useState("");
  const bodydata = [
    {
      _id: "667abddb5be68de187900b0d",
      coursename: "Social - Advanced",
      coursecategory: "Level-8",
      coursedescription: "Topics: Social Advanced",
      courseprice: "850",
      coursequantity: 1,
    },
    {
      _id: "667864918f400915031b3a96",
      coursename: "Science - Intermediate",
      coursecategory: "Level 3",
      coursedescription: "Topics : Science for intermediates",
      courseprice: "750",
      coursequantity: 1,
    },
  ];
  const apiurl = import.meta.env.VITE_API_URLKEY;
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(`${apiurl}/checkout/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cartItems }),
      // body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="min-h-screen mb-5 text-white dark:text-white ">
      <div className="flex flex-col items-center justify-items-center w-50 text-white">
        {clientSecret && (
          <Elements options={options} stripe={stripePromise} className="w-50 text-white">
            <CheckOutForm />
          </Elements>
        )}
      </div>
    </div>
  );
};

export default Payment;
