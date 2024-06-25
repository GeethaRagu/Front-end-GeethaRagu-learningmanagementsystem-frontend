import { Button, Card } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ImCross } from "react-icons/im";
import { removeFromCart } from "../Redux/Slice/cartSlice";
import { saveuser } from "../Redux/Slice/userSlice";

const Cart = () => {
  /**React hooks**/
  const navigate = useNavigate();
  const dispatch = useDispatch();
  /**state from redux**/

  const cartItems = useSelector((state) => state.cart.cartItems);
  const { totalItems } = useSelector((state) => state.cart);
  const { total } = useSelector((state) => state.cart);
  const { currentuser } = useSelector((state) => state.user);

  //console.log(cartItems);

  const proceedCheckOut = () => {
    if (!currentuser) {
      toast("Sign in to proceed with checkout");
      navigate("/");
    } else {
      makePayment();
    }
  };
  const apiurl = import.meta.env.VITE_API_URLKEY;
  //console.log(currentuser);
  const makePayment = () => {
    const itemarray = [];
    cartItems.forEach((e) => {
      const itemid = e._id;
      const coursesofuser = currentuser.rest.courses;
      if (currentuser.rest.courses.length > 0) {
        const isCourse = coursesofuser.find(
          (cartItem) => cartItem._id === itemid
        );
        console.log(isCourse);
        if (!isCourse) {
          itemarray.push(itemid);
          handlePayment(itemarray);
        } else {
          return toast.error("Course already added");
        }
      } else {
        itemarray.push(itemid);
        handlePayment(itemarray);
      }
    });
  };
  const handlePayment = async (itemarray) => {
    const bodydata = {
      userId: currentuser.rest._id,
      courses: itemarray,
    };
    console.log(bodydata);

    try {
      const response = await fetch(`${apiurl}/course/addcourse`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodydata),
      });
      const data = await response.json();

      if (response.ok) {
        dispatch(saveuser(data));
        toast(data.message);
      }
    } catch (error) {}
  };
  const removeItem = (item) => {
    //console.log(item);
    dispatch(removeFromCart({ item }));
  };

  return (
    <div className="min-h-screen mb-5">
      {totalItems > 0 ? (
        <>
          <div className="flex justify-center items-center mt-10">
            <div className="grid grid-rows-1 gap-4">
              {cartItems &&
                cartItems.map((ele, index) => {
                  return (
                    <Card key={index} className="flex-1 flex-col">
                      <div className="pt-5 px-5 flex max-w-full flex-col md:flex-row md:items-center gap-5">
                        <div className=" flex-1 px-10 py-5">
                          {ele.coursename}
                        </div>
                        <div className=" flex-1 pt-5 px-10 py-5">
                          {ele.coursedescription}
                        </div>
                        <div className=" flex-2 pt-5 px-10 py-5">
                          ₹{ele.courseprice}
                        </div>
                        <Button
                          className=""
                          type="button"
                          onClick={() => {
                            removeItem(ele);
                          }}
                        >
                          <ImCross />
                        </Button>
                      </div>
                    </Card>
                  );
                })}
              <div className="bg-white">
                <div className="pt-5 px-5 flex max-w-full flex-col md:flex-row md:items-center gap-5">
                  <div className=" flex-1 px-10 py-5">TOTAL COURSES</div>
                  <div className=" flex-2 pt-5 px-10 py-5">{totalItems}</div>
                </div>
                <div className="pt-5 px-5 flex max-w-full flex-col md:flex-row md:items-center gap-5">
                  <div className=" flex-1 px-10 py-5">SUBTOTAL</div>
                  <div className=" flex-2 pt-5 px-10 py-5">₹{total}</div>
                </div>
                <div className="pt-5 px-5 flex max-w-full flex-col md:flex-row md:items-center gap-5">
                  <div className=" flex-1 px-10 py-5">SHIPPING</div>
                  <div className=" flex-2 pt-5 px-10 py-5">FREE</div>
                </div>
              </div>
              <div className="pt-5 px-5 flex max-w-full flex-col md:flex-row md:items-center gap-5 bg-white">
                <div className=" flex-1 px-10 py-5">TOTAL</div>
                <div className=" flex-2 pt-5 px-10 py-5">₹{total}</div>
              </div>
            </div>
          </div>
          <Button
            type="button"
            onClick={proceedCheckOut}
            className="bg-gradient-to-r from-amber-950 via-amber-800 to bg-amber-500 rounded-lg text-white"
          >
            Proceed to CheckOut
          </Button>
        </>
      ) : (
        <span className="text-white dark:text-white">Your cart is empty</span>
      )}
    </div>
  );
};

export default Cart;
