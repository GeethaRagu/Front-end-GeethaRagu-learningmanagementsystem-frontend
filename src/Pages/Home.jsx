import { Button, Spinner } from "flowbite-react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../Components/OAuth";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../Redux/Slice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

const Home = () => {
  /**React Hooks */
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /**State for loading **/
  const { loading } = useSelector((state) => state.user);
  const { totalItems } = useSelector((state) => state.cart);
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
    console.log(values);
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
      console.log(data);
      if (data.success === false) {
        return dispatch(signInFailure(data.message));
      }
      if (response.ok) {
        localStorage.setItem('Token',data.token);
        dispatch(signInSuccess(data));
        if(totalItems>0){
          navigate('/cart');
        }
        else{
          navigate("/");
        }
        
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className="min-h-screen">
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
          <div className="flex gap-2 text-sm mt-6">
            <Link to="/signup" className="text-amber-500">
              Forgot password ?
            </Link>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Home;
