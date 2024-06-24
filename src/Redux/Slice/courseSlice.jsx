import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
//const data = JSON.parse(localStorage.getItem('cart'));

const initialState = {
  courses: [],
  mentors:[],
  error: null,
  loading: false,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    displayCourse: (state, action) => {
      state.courses = action.payload;
    },
    createCourseStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createCourseSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      toast.success("Course created Successfully");
    },
    createCourseFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      toast.error(action.payload);
    },
    createMentorStart:(state,action)=>{
      state.loading = true;
      state.error = null;
    },
    createMentorSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      toast.success("Mentor created Successfully");
    },
    createMentorFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      toast.error(action.payload);
    },
    displayMentors: (state, action) => {
      state.mentors = action.payload;
    },
  },
});

export const { displayCourse,createCourseStart,createCourseSuccess,createCourseFailure ,createMentorStart,createMentorSuccess,createMentorFailure,displayMentors} = courseSlice.actions;
export default courseSlice.reducer;
