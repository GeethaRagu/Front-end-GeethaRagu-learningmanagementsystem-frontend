import { Button, Spinner } from "flowbite-react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Forgotpassword = () => {
  /**React Hooks */
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /**State for loading **/
  const { loading } = useSelector((state) => state.user);

  const initialValues = {
    email: "",
  };

  const validationschema = Yup.object().shape({
    email: Yup.string().required("Field is empty"),
  });

  //Call signup API on form submit
  const apiurl = import.meta.env.VITE_API_URLKEY;
  const handleSubmit = async (values) => {
    //console.log(values);
    try {
      const response = await fetch(`${apiurl}/user/forgotpassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("Token"),
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      //console.log(data);
      if (response.ok) {
        toast.success(data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="min-h-screen mb-5">
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
                    "Submit"
                  )}
                </Button>
              </div>
            </Form>
          </Formik>
        </div>
        <div className=" flex-1 pt-5 px-10 py-5 bg-amber-950  text-white border-amber-950 rounded-2xl signupright_container">
          An email will be sent with reset link.
        </div>
      </div>
    </div>
  );
};

export default Forgotpassword;
