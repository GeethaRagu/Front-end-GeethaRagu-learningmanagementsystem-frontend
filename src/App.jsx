import React  from "react";
import Header from "./Components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Courses from "./Pages/Courses";
import Mentors from "./Pages/Mentors";
import Signup from "./Pages/Signup";
import { ToastContainer } from "react-toastify";
import Cart from "./Pages/Cart";
import PrivateRoute from "./Components/PrivateRoute";
import Dashboard from "./Pages/Dashboard";
import FooterArea from "./Components/FooterArea";
import Frequentlyasked from "./Pages/Frequentlyasked";
import Reviews from "./Pages/Reviews";
import Payment from "./Pages/Payment";
import PaymentSuccess from "./Pages/PaymentSuccess";


const App = () => {
  return (
    <div>
      <div>
        <ToastContainer></ToastContainer>
      </div>
      <div>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="courses" element={<Courses />} />
            <Route path="mentors" element={<Mentors />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/cart" element={<Cart />} />
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route path="/faq" element={<Frequentlyasked/>}></Route>
            <Route path="/review" element={<Reviews/>}></Route>
            <Route path="/payment" element={<Payment/>}/>
            <Route path="/success" element={<PaymentSuccess/>}/>
          </Routes>
          <FooterArea />
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
