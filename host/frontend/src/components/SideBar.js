import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../store/store";
import { useFileStore } from "../store/store";
import { useRequestedUserId } from "../store/store";

function SideBar() {
  const authStatus = useAuth((state) => state.auth);
  const fetchFiles = useFileStore((state) => state.fetchFiles);
  const setUserStoreId = useRequestedUserId((state) => state.setId);

  const handleFecthMyFiles = () => {
    setUserStoreId(authStatus.id);
    fetchFiles();
  };
  return (
    <div className="SideBar">
      {authStatus.status == true ? (
        <NavLink onClick={handleFecthMyFiles} className="nav-link" to="/store">
          Мое Хранилище
        </NavLink>
      ) : (
        ""
      )}

      <div>------------</div>
      {authStatus.is_staff == true ? (
        <NavLink className="nav-link" to="/userslist">
          Список Пользователей
        </NavLink>
      ) : (
        ""
      )}
    </div>
  );
}

export { SideBar };
