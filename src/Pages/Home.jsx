import { Button, Card, Spinner } from "flowbite-react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../Components/OAuth";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../Redux/Slice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import Courses from "./Courses";
import axios from "axios";
import { displayCourse } from "../Redux/Slice/courseSlice";
import APIError from "../Components/APIError";

const Home = () => {
  /**React Hooks */
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /**State for loading **/
  const { loading } = useSelector((state) => state.user);
  const { totalItems } = useSelector((state) => state.cart);
  const course = useSelector((state) => state.course.courses);
  const currentuser = useSelector((state) => state.user.currentuser);

  // console.log(currentuser);

  const[errormsg,setErrorMsg] = useState('');
  useEffect(() => {
    fetchData();
  }, []);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationschema = Yup.object().shape({
    email: Yup.string().required("Field is empty"),
    password: Yup.string().required("Field is empty"),
  });

  //Call signup API on form submit
  const apiurl = import.meta.env.VITE_API_URLKEY;
  const handleSubmit = async (values) => {
    //console.log(values);
    try {
      dispatch(signInStart());
      const response = await fetch(`${apiurl}/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      //console.log(data);
      if (data.success === false) {
        return dispatch(signInFailure(data.message));
      }
      if (response.ok) {
        localStorage.setItem("Token", data.token);
        dispatch(signInSuccess(data));
        if (totalItems > 0) {
          navigate("/cart");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
     
     
      dispatch(signInFailure(error.message));
    }
  };

  const fetchData = async () => {
    await axios
      .get(`${apiurl}/course/getcourses`)
      .then((res) => {
        dispatch(displayCourse(res.data));
        //console.log("res", res.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="min-h-screen mb-5">
      <div className="px-5 flex max-w-full flex-col md:flex-row md:items-center">
        <div className=" flex flex-col sm:flex-row px-10">
          <img
            className="banner_image"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSATZZeCBzf_eLW82hI6HjAHjfKn_zELdoELQ&s"
            alt=""
          />
          <div className="">
            <span className="text-amber-500 text-8xl font-bold px-3 pb-5">
              Suss Out !
            </span>

            <p className=" text-2xl pt-8 px-3 text-white">
              Tell me and I forgot.Teach me and I remember.
              <p className=" text-2xl px-3 text-white">
                Involve me and I learn.
              </p>
            </p>
            <p className="text-lg pt-8 px-3 text-white">-Benjamin Franklin</p>
          </div>
        </div>
        {!currentuser ? (
          <>
            <div className=" flex-1 pt-5 px-10 py-5 bg-amber-950  text-white border-amber-950 rounded-2xl">
              <h2 className=" text-4xl p-3 text-center">Sign In</h2>
              <Formik
                initialValues={initialValues}
                validationSchema={validationschema}
                onSubmit={handleSubmit}
              >
                <Form>
                  <div className="mt-5">
                    <label className="pr-10">Email :</label>
                    <Field
                      type="email"
                      name="email"
                      placeholder="name@gmail.com"
                      className="w-40 sm:w-full"
                    />
                    <ErrorMessage
                      name="email"
                      component="h6"
                      className="error_message"
                    />
                  </div>
                  <div className="mt-5">
                    <label className="pr-3">Password :</label>
                    <Field
                      type="password"
                      name="password"
                      placeholder="*******"
                      className="w-40 sm:w-full"
                    />
                    <ErrorMessage
                      name="password"
                      component="h6"
                      className="error_message"
                    />
                  </div>
                  <div className="flex flex-row">
                    <Button
                      className="mt-5 mr-4 text-center bg-gradient-to-r from-amber-950 via-amber-800 to bg-amber-500 rounded-lg text-white"
                      type="submit"
                    >
                      {loading ? (
                        <>
                          <Spinner
                            color="amber"
                            aria-label="Amber spinner example"
                            size="sm"
                          />
                          <span className="pl-3">Loading...</span>
                        </>
                      ) : (
                        "Sign In"
                      )}
                    </Button>
                    <OAuth />
                  </div>
                </Form>
              </Formik>
              <div className="flex gap-2 text-sm mt-6">
                <span>Don't Have An Account ?</span>
                <Link to="/signup" className="text-amber-500">
                  Sign Up
                </Link>
              </div>
              <div className="flex gap-2 text-sm mt-6">
                <Link to="/forgotpassword" className="text-amber-500">
                  Forgot password ?
                </Link>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className=" flex-1 pt-5 px-10 py-5 bg-amber-950  text-white border-amber-950 rounded-2xl">
              <img src="data:image/jpeg;base64,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"></img>
              <span className="text-lg px-3">Hello !</span>
              <span className="text-2xl px-3">{currentuser.rest.username}</span>
              <br />
              <Link to="/courses" className="text-blue-300 px-3 text-md">
                Explore more
              </Link>
            </div>
          </>
        )}
      </div>
      <h3 className=" text-2xl font-medium tracking-tight text-white dark:text-white m-6">
        About Suss Out
      </h3>
      <p className=" text-lg font-medium tracking-tight text-white dark:text-white m-6">
        Microlearning provides short bursts of focused learning content that’s
        easy to consume in a matter of minutes. As the information is delivered
        in bits, you can access it on various platforms and devices, including
        mobile phones and tablets. This makes it convenient and accessible when
        desired.
      </p>
      <p className=" text-lg font-medium tracking-tight text-white dark:text-white m-6">
        Its goal is to create a set of online tools that help educate students.
        The organization produces short video lessons. Its website also includes
        supplementary practice exercises and materials for educators.
      </p>
      <h3 className=" text-4xl text-center font-medium tracking-tight text-white dark:text-white m-6">
        LATEST COURSES
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ml-5">
        {course &&
          course.map((ele, index) => {
            return (
              <Card key={index} className="max-w-sm">
                <h5 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  {ele.coursename} [{ele.coursecategory}]
                </h5>
                <h6 className=" text-xl font-medium tracking-tight text-gray-900 dark:text-white">
                  {ele.coursedescription}
                </h6>

                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    ₹{ele.courseprice}
                  </span>
                </div>
              </Card>
            );
          })}
      </div>
    </div>
  );
};

export default Home;
