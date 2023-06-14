import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const SignUp = () => {
  const [signUp, setSignUp] = useState({
    name: "",
    username: "",
    password: "",
    birth: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://192.168.254.36:5000/api/users/register",
        signUp
      );
      console.log(response);
      toast.success("Sign up is success!");
      navigate("/signin");
    } catch (error) {
      console.error(error);
      toast.error("Sign up is filed!");
    }
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-4 mx-auto">
            <ToastContainer />
            <div className="card">
              <form onSubmit={handleSubmit}>
                <div className="card-header">
                  <h2 className="text-center">Sign Up</h2>
                </div>
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      className="form-control mb-2"
                      placeholder="Enter name"
                      onChange={(e) =>
                        setSignUp({ ...signUp, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      id="username"
                      className="form-control mb-2"
                      placeholder="Enter username"
                      onChange={(e) =>
                        setSignUp({ ...signUp, username: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="psw">Password</label>
                    <input
                      type="password"
                      id="psw"
                      className="form-control mb-2"
                      placeholder="Enter password"
                      onChange={(e) =>
                        setSignUp({ ...signUp, password: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="birth">Birth</label>
                    <input
                      type="date"
                      id="birth"
                      className="form-control"
                      onChange={(e) =>
                        setSignUp({
                          ...signUp,
                          birth: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="card-footer">
                  <button className="btn btn-primary">Sign Up</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
