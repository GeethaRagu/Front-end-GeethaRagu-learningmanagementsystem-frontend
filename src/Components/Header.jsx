import React from "react";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownDivider,
  Navbar,
} from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../Redux/Slice/themeSlice";
import { FaMoon, FaSun } from "react-icons/fa";
import { signOutSuccess } from "../Redux/Slice/userSlice";

const Header = () => {
  /** State for loading and current user from userslice**/
  const { currentuser } = useSelector((state) => state.user);
  const theme = useSelector((state) => state.theme);

  /**State for cart count**/
  const totalItems = useSelector((state) => state.cart.totalItems);
  //console.log(totalItems);

  /**React hooks**/
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**Sign Out**/
  const handleSignout = () => {
    dispatch(signOutSuccess());
    localStorage.removeItem("Token");
    navigate("/");
  };
  return (
    <div>
      <Navbar fluid rounded className="dark:bg-black mb-10">
        <Link
          to="/"
          className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
        >
          <span className="px-2 py-1 bg-gradient-to-r from-amber-950 via-amber-800 to bg-amber-500 rounded-lg text-white">
            Suss
          </span>
          Out!
        </Link>

        <div className="flex md:order-2">
          <Button
            className="w-12 h-10 mr-2 hidden sm:inline bg-gradient-to-r from-amber-950 via-amber-800 to bg-amber-500"
            onClick={() => dispatch(toggleTheme())}
          >
            {/* {theme === 'light' ? <FaMoon /> : <FaSun />} */}
            {theme == "dark" ? <FaSun /> : <FaMoon />}
          </Button>
          <Button className="w-20 h-10 mr-2 hidden sm:inline bg-gradient-to-r from-amber-950 via-amber-800 to bg-amber-500 bordered text-white">
            <Link to="/cart">
              Cart
              <span className=" bg-white bordered pill rounded-full text-black ml-1 p-1">
                &nbsp;{totalItems}
              </span>
            </Link>
          </Button>

          {currentuser ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="user"
                  img={currentuser.rest.profilePicture}
                  rounded
                />
              }
            >
              <Dropdown.Header>
                <span className=" font-bold">Hi </span>
                <span className="text-sm">{currentuser.rest.username}</span>
              </Dropdown.Header>

              {currentuser.rest.isAdmin ? (
                <>
                  <Link to="/dashboard?tab=createcourse">
                    <Dropdown.Item>Dashboard</Dropdown.Item>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/dashboard?tab=mycourses">
                    <Dropdown.Item>Dashboard</Dropdown.Item>
                  </Link>
                </>
              )}
              <DropdownDivider />
              <Dropdown.Item onClick={handleSignout}>Sign Out</Dropdown.Item>
            </Dropdown>
          ) : (
            <Link to="/signup">
              <Button className="bg-gradient-to-r from-amber-950 via-amber-800 to bg-amber-500">
                SignUp
              </Button>
            </Link>
          )}
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link active as={"div"}>
            <Link to="/courses">Courses</Link>
          </Navbar.Link>
          <Navbar.Link active as={"div"}>
            <Link to="/mentors">Mentors</Link>
          </Navbar.Link>
          <Navbar.Link href="#" as={"div"}>
            Reviews
          </Navbar.Link>
          <Navbar.Link href="#" as={"div"}>
            FAQ
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
