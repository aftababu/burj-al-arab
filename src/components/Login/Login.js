import React from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";
import logo from "../../images/icons/logo.png";
import { Google } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/logInSlice.js";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import signupbg from "../../images/signup.png";

const app = initializeApp(firebaseConfig);

const LogIn = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.login);
  console.log(user);
  const googleProvider = new GoogleAuthProvider();
  const auth = getAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location?.state || { from: "/" };
  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        const loggedInuser = {
          name: user.displayName,
          photo: user.photoURL,
          email: user.email,
          success: true,
          error: "",
        };
        dispatch(login({ ...loggedInuser }));
        navigate(from);
      })
      .catch((error) => {
        const loggedInuser = { error: error.code, success: false };
        dispatch(login({ loggedInuser }));
      });
  };
  const handleSubmit = (e) => {
    // e.target.onchange = true;
    signInWithEmailAndPassword(auth, user.email, user.password)
      .then((res) => {
        const user = res.user;
        const loggedInuser = {
          name: user.displayName,
          photo: user.photoURL,
          email: user.email,
          success: true,
          error: "",
        };
        dispatch(login({ ...loggedInuser }));
        storeAuthToken();
        navigate(from);
      })
      .catch((error) => {
        const loggedInuser = { error: error.code, success: false };
        dispatch(login({ ...loggedInuser }));
      });
    e.preventDefault();
  };

  const handleValidation = (e) => {
    let isValideForm = false;
    console.log(e.target.type);
    if (e.target.type === "email") {
      isValideForm = /^\S+@\S+\.\S+$/.test(e.target.value);
      console.log(isValideForm);
    }
    if (e.target.type === "password") {
      isValideForm =
        /(?=.*[0-9])/.test(e.target.value) && e.target.value.length >= 6;
    }
    if (isValideForm) {
      const newUser = {};
      newUser.email = e.target.form.children.email.value;
      newUser.password = e.target.form.children.password.value;
      dispatch(login({ ...newUser }));
      console.log(newUser);
    }
    if (!isValideForm) {
      const newUser = {};
      dispatch(login({ ...newUser }));
    }
  };

  const storeAuthToken = () => {
    auth.currentUser
      .getIdToken(/* forceRefresh */ true)
      .then(function (idToken) {
        sessionStorage.setItem("token", idToken);
      })
      .catch(function (error) {
        // Handle error
      });
  };
  return (
    <>
      <Box
        sx={{
          width: "100vw",
          height: "calc(1vh*100)",
        }}
      >
        <Box className="signupForm">
          <Link to={"/"}>
            <img
              src={logo}
              alt=""
              style={{
                maxHeight: "50px",
                margin: 20,
              }}
            />
          </Link>
          <Box>
            <form onSubmit={(e) => handleSubmit(e)}>
              <input
                required
                type="email"
                placeholder="Email"
                name="email"
                onChange={(e) => handleValidation(e)}
              />
              <input
                required
                type="password"
                placeholder="Password"
                name="password"
                onChange={(e) => handleValidation(e)}
              />
              <Button
                color="error"
                variant="contained"
                type="submit"
                sx={{ width: "400px" }}
              >
                Sign In
              </Button>
              <Typography color="error"> {user.error}</Typography>
            </form>
            <Box className="logNav">
              <Link to={"/signup"}>Don't have an account</Link>
              <Button onClick={() => handleGoogleLogin()}>
                <Google />
                Sign in With Google
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default LogIn;
