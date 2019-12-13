import React from "react";
import UserForm from "./User/UserForm";
import UserList from "./User/UserList";

const Users = () => {
  return (
    <div className="Users">
      <UserForm />
      <UserList />
    </div>
  );
}

export default Users;
