import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../store/store";

function Auth() {
  const authStatus = useAuth((state) => state.auth);

  return (
    <div className="Auth">
      {authStatus.status == false ? (
        <>
          <NavLink className="nav-link" to="/registration">
            Регистрация
          </NavLink>
          <NavLink className="nav-link" to="/login">
            Войти
          </NavLink>
        </>
      ) : (
        ""
      )}
      {authStatus.status == true ? (
        <NavLink className="nav-link" to="/logout">
          Выйти
        </NavLink>
      ) : (
        ""
      )}
    </div>
  );
}

export { Auth };
