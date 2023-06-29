import React from "react";
import { Filelist } from "../components/Filelist";
import { DnDFiles } from "../components/DnDFiles";
import { useRequestedUserId } from "../store/store";
import { useAuth } from "../store/store";

function Storage() {
  const UserStoreId = useRequestedUserId((state) => state.OwnerId[0]);
  const userId = useAuth((state) => state.auth);

  return (
    <div className="Storage">
      <Filelist />
      {UserStoreId === userId.id ? <DnDFiles /> : ""}
    </div>
  );
}

export { Storage };
