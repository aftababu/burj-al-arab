import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import logo from "../../images/icons/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Typography } from "@mui/material";
import "./signup.css";
import { createuser } from "../../redux/logInSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
const Signup = () => {
  const navigate = useNavigate();
  const [password, setPassWord] = useState(false);
  const auth = getAuth();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state?.login?.createuser);
  console.log(userState);
  const handleSubmit = (e) => {
    // e.target.onchange = true;
    createUserWithEmailAndPassword(auth, userState.email, userState.password)
      .then((res) => {
        const user = res.user;
        navigate("/login");
        console.log(user);
      })
      .catch((error) => {
        // const newUser = {};
        // newUser.error = error.code;
        // dispatch(createuser({ ...newUser }));
        // console.log(error);
        // ..
      });
    e.preventDefault();
  };
  const handleValidation = (e) => {
    let isValideForm = false;
    console.log(e.target.type);
    if (e.target.type === "text") {
      isValideForm = /^[a-zA-Z\-]+$/.test(e.target.value);
      console.log(isValideForm);
    }
    if (e.target.type === "email") {
      isValideForm = /^\S+@\S+\.\S+$/.test(e.target.value);
      console.log(isValideForm);
    }
    if (e.target.type === "password") {
      isValideForm =
        /(?=.*[0-9])/.test(e.target.value) && e.target.value.length >= 6;
    }
    // console.log(e.target.form.children);
    if (
      isValideForm &&
      e.target.form.children.password.value ===
        e.target.form.children.confirm_password.value
    ) {
      const newUser = {};
      newUser.username = e.target.form.children.username.value;
      newUser.email = e.target.form.children.email.value;
      newUser.password = e.target.form.children.password.value;
      dispatch(createuser({ ...newUser }));
      console.log(newUser);
    } else if (
      e.target.form.children.password.value !==
      e.target.form.children.confirm_password.value
    ) {
      const newUser = {};
      newUser.error = "password not match";
      dispatch(createuser({ ...newUser }));
      console.log(newUser);
    }
    setPassWord(isValideForm);
    if (!isValideForm) {
      const newUser = {};
      dispatch(createuser({ ...newUser }));
    }
  };
  return (
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

        <form action="" onSubmit={(e) => handleSubmit(e)}>
          <input
            name="username"
            id="username"
            type="text"
            required
            placeholder="username"
            onChange={(e) => handleValidation(e)}
          />

          <input
            type="email"
            required
            placeholder="email"
            name="email"
            onChange={(e) => handleValidation(e)}
          />

          <input
            name="password"
            id="password"
            type="password"
            required
            placeholder="password"
            onChange={(e) => handleValidation(e)}
          />

          <input
            type="password"
            name="confirm_password"
            id="confirm_password"
            required
            placeholder="confirm_password"
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
          <Typography color="error"> {userState?.error}</Typography>
        </form>
        <Link to="/login">already have an account</Link>
      </Box>
    </Box>
  );
};

export default Signup;
