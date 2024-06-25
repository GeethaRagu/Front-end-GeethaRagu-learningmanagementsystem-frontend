import { Button, Card, Spinner } from "flowbite-react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
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

const Home = () => {
  /**React Hooks */
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /**State for loading **/
  const { loading } = useSelector((state) => state.user);
  const { totalItems } = useSelector((state) => state.cart);
  const course = useSelector((state) => state.course.courses);

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
      <div className="pt-5 px-5 flex max-w-full flex-col md:flex-row md:items-center gap-5">
        <div className=" flex flex-row px-10 py-5 bg-amber-950  text-white border-amber-950 rounded-2xl banner_container">
          <div>
            <span className="text-amber-500 text-8xl font-bold">
              <br />
              Suss Out !
            </span>
            <br /> <br /> <br /> <br /> <br />
            <p className=" text-2xl pt-5">
              Tell me and I forgot.Teach me and I remember.Involve me and I
              learn
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-
              Benjamin Franklin
            </p>
          </div>
          <img
            className="banner_image"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSATZZeCBzf_eLW82hI6HjAHjfKn_zELdoELQ&s"
            alt=""
          />
        </div>
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
                <Field type="email" name="email" placeholder="name@gmail.com" />
                <ErrorMessage
                  name="email"
                  component="h6"
                  className="error_message"
                />
              </div>
              <div className="mt-5">
                <label className="pr-3">Password :</label>
                <Field type="password" name="password" placeholder="*******" />
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
          {/* <div className="flex gap-2 text-sm mt-6">
            <Link to="/signup" className="text-amber-500">
              Forgot password ?
            </Link>
          </div> */}
        </div>
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
