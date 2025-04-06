import React from 'react';
import { BsFillBuildingsFill } from "react-icons/bs";
import { IoIosLogIn } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import './Navbar.css'; // Optional for custom styles
import { PiBuildingsFill } from "react-icons/pi";
import { RiLogoutBoxFill } from "react-icons/ri";
import { resetState } from '../../Redux/slices/userLoginSlice';
import { useDispatch } from 'react-redux';
function Navbar() {
    const navigate=useNavigate()

    const dispatch=useDispatch();
    const { currentuser, errorMessage, loginStatus } = useSelector((state) => state.userLogin);

    const logout = () => {
        // Remove token from browser storage
        sessionStorage.removeItem("token");
        // Reset state
        let actionobj = resetState();
        dispatch(actionobj);
        navigate("");
      };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-light shadow">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <PiBuildingsFill className="bg-primary me-2" size={50}  />
          <span className="fw-bold text-dark">GovSchemes</span>
        </Link>
        {loginStatus === true ? (
  <div className="d-flex align-items-center">
    <p className="mb-0 me-3">Welcome <span className="fw-bold">{currentuser.username}</span></p>
    <button
      className="btn btn-outline-light bg-primary me-2 d-flex align-items-center"
      onClick={logout}
    >
      <RiLogoutBoxFill size={20} className="me-1" />
      Log Out
    </button>
  </div>
) : (
  <div className="d-flex">
      <Link to="/admin=rk" className="btn btn-dark fw-semibold">
    Admin
  </Link>
  <Link to="/login" className="btn btn-outline-light bg-primary me-2 d-flex align-items-center">
    <IoIosLogIn size={20} className="me-1" />
    Login
  </Link>

  <Link to="/signup" className="btn btn-warning fw-semibold me-2">
    Sign Up
  </Link>


</div>

)}

        
      </div>
    </nav>
  );
}

export default Navbar;
