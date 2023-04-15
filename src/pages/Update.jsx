import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import InputField from "../components/InputField";

function Update() {
  // deklarasi useState Hook
  const [update, setUpdate] = useState({
    question: "",
    note: "",
  });

  // deklarasi useParams hook dan useState hook
  const { id } = useParams(); // mengakses parameter id route yang sesuai
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Halaman Update | Question | Note";

    // get data dari server
    axios
      //   .get(`http://localhost:8080/notes/${id}`)
      .get(`http://192.168.43.81:5000/api/noteApp/read/note/${id}`)
      .then((res) => {
        console.log(res);
        // setUpdate(res.data);
        setUpdate(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  // update
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      //   .put(`http://localhost:8080/notes/${id}`, update)
      .put(`http://192.168.43.81:5000/api/noteApp/update/note/${id}`, update)
      .then((res) => {
        console.log(res);
        toast.success("Question and note is succesed to be updated!");
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <div className="container m-5">
        <div className="row">
          <div className="col-5 mx-auto">
            <div className="card">
              <form className="p-3" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Question</label>
                  <InputField
                    onChange={(e) => {
                      setUpdate({ ...update, question: e.target.value });
                    }}
                    style={{
                      resize: "none",
                      overflow: "hidden",
                    }}
                    className="form-control mb-3 p-3"
                    rows="1"
                    value={update.question}
                  />
                </div>
                <div className="form-group">
                  <label>Note</label>

                  <InputField
                    onChange={(e) => {
                      setUpdate({ ...update, note: e.target.value });
                    }}
                    style={{
                      resize: "none",
                      overflow: "hidden",
                    }}
                    className="form-control mb-3 p-3"
                    rows="1"
                    value={update.note}
                  />
                </div>
                <div className="text-end">
                  <button type="submit" className="btn btn-success">
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Update;
