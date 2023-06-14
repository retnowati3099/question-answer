import axios from "axios";
import React, { useState } from "react";

const SignIn = () => {
  const [signIn, setSignIn] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("endpoint", signIn);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-4 mx-auto">
            <div className="card">
              <form onSubmit={handleSubmit}>
                <div className="card-header">
                  <h2 className="text-center">Sign In</h2>
                </div>
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      id="username"
                      className="form-control mb-2"
                      placeholder="Enter username"
                      onChange={(e) =>
                        setSignIn({ ...signIn, username: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="psw">Password</label>
                    <input
                      type="password"
                      id="psw"
                      className="form-control"
                      placeholder="Enter password"
                      onChange={(e) =>
                        setSignIn({ ...signIn, password: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="card-footer">
                  <button className="btn btn-primary">Sign In</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
