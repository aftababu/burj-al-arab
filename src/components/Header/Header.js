import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import header from "../../images/header.png";
import logo from "../../images/icons/logo.png";
import { useSelector } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import { Button } from "@mui/material";

const Header = () => {
  const user = useSelector((state) => JSON.parse(localStorage.getItem("user")));
  const navigate = useNavigate();
  const auth = getAuth();
  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("user");
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };
  console.log(user);
  return (
    <div
      style={{
        backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${header})`,
      }}
      className="header"
    >
      <nav className="nav">
        <ul>
          <li>
            <img className="logo" src={logo} alt="" />
          </li>
          <li>
            <Link to="/home">Home</Link>
          </li>
          {user?.email ? (
            <>
              <li>
                <Button
                  onClick={() => signOutUser()}
                  color="error"
                  variant="contained"
                >
                  sign Out
                </Button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}

          <li>
            <Link className="btn-book" to="/book">
              Book
            </Link>
          </li>
        </ul>
      </nav>
      <div className="title-container">
        <h1>Burj Al Arab</h1>
        <h2>A global icon of Arabian luxury</h2>
      </div>
    </div>
  );
};

export default Header;
