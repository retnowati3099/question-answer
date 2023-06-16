import axios from "axios";
import React, { useEffect } from "react";

const New = () => {
  const token = localStorage.getItem("token");

  const handleClick = async () => {
    try {
      const response = await axios.get(
        "http://192.168.43.81:5000/api/users/must-login",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <button onClick={handleClick}>Get Data</button>
    </div>
  );
};

export default New;
