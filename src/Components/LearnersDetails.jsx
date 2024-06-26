import { ErrorMessage, Field, Form, Formik } from "formik";
import { Button, Spinner } from "flowbite-react";
import React, { useEffect } from "react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { displayMentors } from "../Redux/Slice/courseSlice";
import { saveuser, viewStudents } from "../Redux/Slice/userSlice";
import { useNavigate } from "react-router-dom";

const LearnersDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  /**Redux state**/
  const { loading } = useSelector((state) => state.user);
  const students = useSelector((state) => state.user.students);
  const mentor = useSelector((state) => state.course.mentors);
  const initialValues = {
    learner: "",
    mentor: "",
    performance: "",
    assessment: "",
  };

  const validationschema = Yup.object().shape({
    learner: Yup.string().required("Field is empty"),
    mentor: Yup.string().required("Field is empty"),
    performance: Yup.string().required("Field is empty"),
    assessment: Yup.string().required("Field is empty"),
  });
  /**Call API to display mentors**/

  useEffect(() => {
    fetchmentor();
    fetchlearner();
  }, []);
  const apiurl = import.meta.env.VITE_API_URLKEY;
  const fetchmentor = async () => {
    await axios
      .get(`${apiurl}/mentor/getmentors`)
      .then((res) => {
        dispatch(displayMentors(res.data));
        // console.log("res", res.data);
      })
      .catch((error) => console.log(error));
  };
  const fetchlearner = async () => {
    await axios
      .get(`${apiurl}/user/viewstudents`)
      .then((res) => {
        dispatch(viewStudents(res.data));
        // console.log("res",res.data);
      })
      .catch((error) => console.log(error));
  };

  const handleSubmit = async (values) => {
    //console.log(values);
    try {
      const response = await fetch(`${apiurl}/user/studentdetails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      //console.log(data);
      if (response.ok) {
        dispatch(saveuser(data));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen mb-5">
      <div className="pt-5 px-5 flex max-w-full flex-col md:flex-row md:items-center gap-5">
        <div className=" flex-1 px-10 py-5 bg-amber-950  text-white border-amber-950 rounded-2xl">
          <Formik
            initialValues={initialValues}
            validationSchema={validationschema}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className="mt-5">
                <label className="pr-2">Learners :</label>
                <Field as="select" name="learner" className="text-black w-40" >
                  {students &&
                    students.map((ele, index) => {
                      return (
                        <>
                          {!ele.isAdmin && (
                            <>
                              <option value={ele.username} key={index}>
                                {ele.username}
                              </option>
                            </>
                          )}
                        </>
                      );
                    })}
                </Field>
                <ErrorMessage
                  name="learner"
                  component="h6"
                  className="error_message"
                />
              </div>
              <div className="mt-5">
                <label className="pr-2">Mentors :</label>
                <Field as="select" name="mentor" className="text-black w-40">
                  {mentor &&
                    mentor.map((ele, index) => {
                      return (
                        <option value={ele.mentorName} key={index}>
                          {ele.mentorName}
                        </option>
                      );
                    })}
                </Field>
                <ErrorMessage
                  name="mentor"
                  component="h6"
                  className="error_message"
                />
              </div>
              <div className="mt-5">
                <label className="pr-2">Learner performance score:</label>
                <Field type="text" name="performance" className="w-40"/>
                <ErrorMessage
                  name="performance"
                  component="h6"
                  className="error_message"
                />
              </div>
              <div className="mt-5">
                <label className="pr-2">Learner assessment score :</label>
                <Field type="text" name="assessment" className="w-40"/>
                <ErrorMessage
                  name="assessment"
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
                    "Save"
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

export default LearnersDetails;
