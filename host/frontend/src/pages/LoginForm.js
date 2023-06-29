import React from "react";
import { useState, useEffect } from "react";
import { authRequest } from "../Requests/Auth_request";
import { useNavigate } from "react-router";
import { useAuth } from "../store/store";
import { useFileStore } from "../store/store";
import { useRequestedUserId } from "../store/store";

function LoginForm() {
  const [login, setLogin] = useState("");
  const [password, setpassword] = useState("");
  const [loginDirty, setLoginDirty] = useState(false);
  const [passwordDirty, setpasswordDirty] = useState(false);
  const [loginError, setloginError] = useState("The field cannot be empty");
  const [passwordError, setpassworError] = useState(
    "The field cannot be empty"
  );
  const [formValid, setValid] = useState(false);
  const navigate = useNavigate();
  const authStatus = useAuth((state) => state.setAuth);
  const fetchFiles = useFileStore((state) => state.fetchFiles);
  const setUserStoreId = useRequestedUserId((state) => state.setId);

  useEffect(() => {
    authRequest("GET");
  }, []);

  useEffect(() => {
    if (loginError || passwordError) {
      setValid(false);
    } else {
      setValid(true);
    }
  }, [loginError, passwordError]);

  const loginHandler = (e) => {
    setLogin(e.target.value);
    setloginError("");
  };

  const passwordHandler = (e) => {
    setpassword(e.target.value);
    setpassworError("");
  };

  const blurHandler = (e) => {
    switch (e.target.name) {
      case "login":
        setLoginDirty(true);
        break;
      case "password":
        setpasswordDirty(true);
        break;
    }
  };

  const sendFormhandler = async (e) => {
    e.preventDefault();
    let formdata = new FormData();
    formdata.append("username", login);
    formdata.append("password", password);
    let result = await authRequest("POST", formdata);
    if (result[0] === true) {
      authStatus(true, result[1].is_staff, result[1].id);
      setUserStoreId(result[1].id);
      fetchFiles();
      navigate("/store");
      return;
    } else {
      alert("Wrong login or password");
    }
  };

  return (
    <form className="form">
      <h5>Login</h5>
      {loginDirty && loginError && (
        <div style={{ color: "red" }}>{loginError}</div>
      )}
      <input
        onBlur={blurHandler}
        name="login"
        placeholder="Enter login"
        value={login}
        onChange={(e) => loginHandler(e)}
        type="text"
      ></input>
      <h5>Password</h5>
      {passwordDirty && passwordError && (
        <div style={{ color: "red" }}>{passwordError}</div>
      )}
      <input
        onBlur={blurHandler}
        name="password"
        placeholder="enter password"
        value={password}
        type="password"
        onChange={(e) => passwordHandler(e)}
      ></input>
      <br></br>
      <button onClick={sendFormhandler} disabled={!formValid}>
        Login
      </button>
    </form>
  );
}

export { LoginForm };
