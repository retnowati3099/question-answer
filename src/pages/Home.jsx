import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="text-center">Welcome!</h1>
        </div>
      </div>
      <div className="row">
        <div className="col d-flex justify-content-center">
          <Link to="/signin" className="btn btn-primary mx-2">
            Sign In
          </Link>
          <Link to="/signup" className="btn btn-outline-primary mx-2">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
