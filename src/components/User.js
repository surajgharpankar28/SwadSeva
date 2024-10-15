import { useState } from "react";

const User = (props) => {
  const [count] = useState(0);
  const [count2] = useState(1);
  return (
    <div className="user-card">
      <p>
        Functional Component = {count}, {count2}
      </p>
      <h2>Name : {props.name}</h2>
      <h3>Location : Pune</h3>
      <h4>Contact : 8799654321</h4>
    </div>
  );
};

export default User;
