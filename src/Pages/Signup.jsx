import { Button, Spinner } from "flowbite-react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {
  signUpFailure,
  signUpStart,
  signUpSuccess,
} from "../Redux/Slice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../Components/OAuth";

const Signup = () => {
  /**React Hooks */
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /**State for loading **/
  const { loading } = useSelector((state) => state.user);

  const initialValues = {
    username: "",
    email: "",
    password: "",
    address: {
      suite: "",
      street: "",
      city: "",
      zipcode: "",
    },
    phone: "",
  };

  const validationschema = Yup.object().shape({
    username: Yup.string().required("Field is empty"),
    email: Yup.string().required("Field is empty"),
    password: Yup.string().required("Field is empty"),
    address: Yup.object().shape({
      suite: Yup.string().required("Field is empty"),
      street: Yup.string().required("Field is empty"),
      city: Yup.string().required("Field is empty"),
      zipcode: Yup.string().required("Field is empty"),
    }),
    phone: Yup.string().required("Field is empty"),
  });

  //Call signup API on form submit
  const apiurl = import.meta.env.VITE_API_URLKEY;
  const handleSubmit = async (values) => {
    // console.log(values);
    try {
      dispatch(signUpStart());
      const response = await fetch(`${apiurl}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      //console.log(data);
      if (data.success === false) {
        return dispatch(signUpFailure(data.message));
      }
      if (response.ok) {
        dispatch(signUpSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signUpFailure(error.message));
    }
  };
  return (
    <div className="min-h-screen">
      <div className="pt-5 px-5 flex max-w-full flex-col md:flex-row md:items-center gap-5">
        <div className=" flex-1 px-10 py-5 bg-amber-950  text-white border-amber-950 rounded-2xl">
          <h2 className=" text-4xl p-3 text-center">Sign Up</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationschema}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className="mt-5">
                <label className="pr-2">Username :</label>
                <Field type="text" name="username" placeholder="Your name" />
                <ErrorMessage
                  name="username"
                  component="h6"
                  className="error_message"
                />
              </div>
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
              <div className="mt-5">
                <h6>Address ::</h6>
                <label className="pr-12">Suite:</label>
                <Field
                  type="text"
                  name="address.suite"
                  placeholder="Suite no"
                />
                <ErrorMessage
                  name="address.suite"
                  component="h6"
                  className="error_message"
                />
              </div>
              <div className="mt-5">
                <label className="pr-9">Street :</label>
                <Field
                  type="text"
                  name="address.street"
                  placeholder="Street name"
                />
                <ErrorMessage
                  name="address.street"
                  component="h6"
                  className="error_message"
                />
              </div>
              <div className="mt-5">
                <label className="pr-12">City :</label>
                <Field
                  type="text"
                  name="address.city"
                  placeholder="City name"
                />
                <ErrorMessage
                  name="address.city"
                  component="h6"
                  className="error_message"
                />
              </div>
              <div className="mt-5">
                <label className="pr-5">Zipcode :</label>
                <Field
                  type="text"
                  name="address.zipcode"
                  placeholder="Zipcode"
                />
                <ErrorMessage
                  name="address.zipcode"
                  component="h6"
                  className="error_message"
                />
              </div>
              <div className="mt-5">
                <label className="pr-8">Phone :</label>
                <Field type="text" name="phone" placeholder="Phone no" />
                <ErrorMessage
                  name="phone"
                  component="h6"
                  className="error_message"
                />
              </div>
              <div className="flex flex-row">
                <Button
                  className="mt-5 px-2 py-1 bg-gradient-to-r from-amber-950 via-amber-800 to bg-amber-500 rounded-lg text-white"
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
                    "Sign Up"
                  )}
                </Button>
                <OAuth />
              </div>
            </Form>
          </Formik>
          <div className="flex gap-2 text-sm mt-6">
            <span>Already have account ?</span>
            <Link to="/" className="text-amber-500">
              Sign In
            </Link>
          </div>
        </div>
        <div className=" flex-1 pt-5 px-10 py-5 bg-amber-950  text-white border-amber-950 rounded-2xl signupright_container">
          Sign up with your Username, Email and Password and address.
        </div>
      </div>
    </div>
  );
};

export default Signup;
