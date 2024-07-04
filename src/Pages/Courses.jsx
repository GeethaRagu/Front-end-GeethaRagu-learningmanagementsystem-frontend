import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { displayCourse } from "../Redux/Slice/courseSlice";
import { Button, Card } from "flowbite-react";
import { addToCart, removeFromCart } from "../Redux/Slice/cartSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { saveuser } from "../Redux/Slice/userSlice";

const Courses = () => {
  /**React hooks**/
  const dispatch = useDispatch();
  /**state from redux**/
  const course = useSelector((state) => state.course.courses);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalItems = useSelector((state) => state.cart.totalItems);
 
  /**Call API to display courses**/
  useEffect(() => {
    fetchData();
  }, []);
  const apiurl = import.meta.env.VITE_API_URLKEY;
  const fetchData = async () => {
    await axios
      .get(`${apiurl}/course/getcourses`)
      .then((res) => {
        dispatch(displayCourse(res.data));
        //console.log("res", res.data);
      })
      .catch((error) => {
        console.log(error);
      
        }
      );

  };

  const AddtoCart = (id, name, category, description, price, quantity) => {
    const item = {
      _id: id,
      coursename: name,
      coursecategory: category,
      coursedescription: description,
      courseprice: price,
      coursequantity: quantity,
    };
    // console.log("item", item);
    // console.log("totalitem", totalItems);
    if (totalItems > 0) {
      const isItemInCart = cartItems.find(
        (cartItem) => cartItem._id === item._id
      );
     // console.log(isItemInCart);
      if (!isItemInCart) {
        item.coursequantity = 1;
        dispatch(addToCart(item));
       
      } else {
        toast("Course already added to the Cart");
      }
    } else {
      item.coursequantity = 1;
      dispatch(addToCart(item));
      
    }
  };

  //console.log("course", course);
  //console.log("cartitems", cartItems);

  return (
    <div className="min-h-screen mb-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ml-5 justify-start">
        {course &&
          course.map((ele, index) => {
            return (
              <Card key={index} className="max-w-sm">
                <h5 className=" mt- 0 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  {ele.coursename} [{ele.coursecategory}]
                </h5>
                <h6 className=" text-xl font-medium tracking-tight text-gray-900 dark:text-white">
                  {ele.coursedescription}
                </h6>

                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    ₹{ele.courseprice}
                  </span>
                 
                  <Button
                    id={ele._id}
                    type="button"
                    onClick={() =>
                      AddtoCart(
                        ele._id,
                        ele.coursename,
                        ele.coursecategory,
                        ele.coursedescription,
                        ele.courseprice,
                        1
                      )
                    }
                    className="bg-gradient-to-r from-amber-950 via-amber-800 to bg-amber-500 rounded-lg text-white"
                  >
                    Add to cart
                  </Button>
                  
                </div>
              </Card>
            );
          })}
      </div>
    </div>
  );
};

export default Courses;
