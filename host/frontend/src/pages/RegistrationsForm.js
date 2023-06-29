import React, { useState, useEffect } from "react";
import { reqRequest } from "../Requests/Reg_request";
import { useNavigate } from "react-router";

function RegistrationsForm() {
  const [login, setLogin] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [loginDirty, setLoginDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  const [loginError, setLoginError] = useState("The field cannot be empty");
  const [passwordError, setPasswordError] = useState(
    "The field cannot be empty"
  );
  const [emailError, setEmailError] = useState("The field cannot be empty");
  const [formValid, setValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (loginError || passwordError) {
      setValid(false);
    } else {
      setValid(true);
    }
  }, [loginError, passwordError]);

  const loginHandler = (e) => {
    setLogin(e.target.value);
    const re = /^[A-Z](.[a-zA-Z0-9_-]*){3,20}/;
    if (!re.test(String(e.target.value)) || e.target.value.length > 20) {
      setLoginError("Wrong Login");
    } else {
      setLoginError("");
    }
  };

  const passwordHandler = (e) => {
    setpassword(e.target.value);
    const re =
      /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/;
    if (!re.test(String(e.target.value))) {
      setPasswordError("wrong Password");
    } else {
      setPasswordError("");
    }
  };

  const ValidateHandler = async (e) => {
    e.preventDefault();
    const secondPassword = document.querySelector(".password1").value;
    if (password != secondPassword) {
      alert("Password mismatch");
    } else {
      let formdata = new FormData();
      formdata.append("username", login);
      formdata.append("password", password);
      formdata.append("email", email);
      formdata.append("first_name", document.querySelector(".firstname").value);
      formdata.append("last_name", document.querySelector(".lastname").value);
      let result = await reqRequest(formdata);
      if (result[0] === true) {
        navigate("/login");
      } else {
        alert(result[1][Object.keys(result[1])]);
      }
    }
  };

  const emailHandler = (e) => {
    setemail(e.target.value);
    const re =
      /^((([0-9A-Za-z]{1}[-0-9A-z\.]{0,30}[0-9A-Za-z]?)|([0-9А-Яа-я]{1}[-0-9А-я\.]{0,30}[0-9А-Яа-я]?))@([-A-Za-z]{1,}\.){1,}[-A-Za-z]{2,})$/;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError("Wrong email");
    } else {
      setEmailError("");
    }
  };

  const blurHandler = (e) => {
    switch (e.target.name) {
      case "login":
        setLoginDirty(true);
        break;
      case "password":
        setPasswordDirty(true);
        break;
      case "email":
        setEmailDirty(true);
    }
  };

  return (
    <form className="form">
      <p>User name</p>
      {loginDirty && loginError && (
        <div style={{ color: "red" }}>{loginError}</div>
      )}
      <input
        onBlur={blurHandler}
        name="login"
        placeholder="enter login"
        onChange={(e) => loginHandler(e)}
        type="text"
        value={login}
      ></input>
      <p>Email</p>
      {emailDirty && emailError && (
        <div style={{ color: "red" }}>{emailError}</div>
      )}
      <input
        onBlur={blurHandler}
        name="email"
        value={email}
        placeholder="enter email"
        onChange={(e) => emailHandler(e)}
        type="text"
      ></input>
      <p>Password</p>
      {passwordDirty && passwordError && (
        <div style={{ color: "red" }}>{passwordError}</div>
      )}
      <input
        onBlur={blurHandler}
        name="password"
        value={password}
        placeholder="enter password"
        onChange={(e) => passwordHandler(e)}
        type="password"
      ></input>
      <br></br>
      <input
        className="password1"
        type="password"
        name="password1"
        placeholder="enter password again"
      ></input>
      <p>First name</p>
      <input
        className="firstname"
        name="first name"
        placeholder="enter first name"
      ></input>
      <p>Last name</p>
      <input
        className="lastname"
        name="last name"
        placeholder="enter last name"
      ></input>
      <br></br>
      <button onClick={ValidateHandler} disabled={!formValid}>
        registration
      </button>
    </form>
  );
}

export { RegistrationsForm };
