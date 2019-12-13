import React from "react";
import { useSelector } from "react-redux";

import User from "./User";

const UserList = props => {
  // useSelector permet d'accéder à une valeur enregistrée dans le store redux
  const userList = useSelector(reduxState => reduxState.userReducer.list);

  return (
    <div>
      <span className="text">Nombre d'utilisateurs : {userList.length}</span>
      {userList.map(user => {
        return <User key={user} username={user} />;
      })}
    </div>
  );
};

export default UserList;
