import { Button, Spinner } from "flowbite-react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { createMentorFailure, createMentorStart, createMentorSuccess } from "../Redux/Slice/courseSlice";

const CreateMentor = () => {
    /**React Hooks */
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /**State for loading **/
  const { loading } = useSelector((state) => state.user);
  const initialValues = {
    mentorName:"",
    mentorEmail:""

  };
  const validationschema = Yup.object().shape({
    mentorName: Yup.string().required("Field is empty"),
    mentorEmail: Yup.string().required("Field is empty"),

  });
  //Call create course API on form submit
  const apiurl = import.meta.env.VITE_API_URLKEY;
  const handleSubmit = async (values) => {
    console.log(values);
    try {
      dispatch(createMentorStart());
      const response = await fetch(`${apiurl}/mentor/creatementor`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      console.log(data);
      if (data.success === false) {
        return dispatch(createMentorFailure(data.message));
      }
      if (response.ok) {
        dispatch(createMentorSuccess(data));
        navigate("/mentors");
      }
    } catch (error) {
      dispatch(createMentorFailure(error.message));
    }
  };
    return (
        <div className="min-h-screen">
        <div className="pt-5 px-5 flex max-w-full flex-col md:flex-row md:items-center gap-5">
          <div className=" flex-1 px-10 py-5 bg-amber-950  text-white border-amber-950 rounded-2xl">
            <h2 className=" text-4xl p-3 text-center">Create Mentor</h2>
            <Formik  initialValues={initialValues} validationSchema={validationschema} onSubmit={handleSubmit}>
              <Form>
                <div className="mt-5">
                  <label className="pr-6">Mentor name :</label>
                  <Field type="text" name="mentorName" />
                  <ErrorMessage
                    name="mentorName"
                    component="h6"
                    className="error_message"
                  />
                </div>
                <div className="mt-5">
                  <label className="pr-6">Mentor Email :</label>
                  <Field type="email" name="mentorEmail" />
                  <ErrorMessage
                    name="mentorEmail"
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
                      "Create Mentor"
                    )}
                  </Button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    );
};

export default CreateMentor;