import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputField from "../components/InputField";

const Note = () => {
  // deklarasi useState Hook
  // const [question, setQuestion] = useState("");
  // const [answer, setAnswer] = useState("");
  const [qa, setQa] = useState({
    question: "",
    note: "",
  });
  const [showInputField, setShowInputField] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);
  const [dataNote, setDataNote] = useState([]);

  // useNavigate hook
  const navigate = useNavigate();

  const handleInputQuestion = (e) => {
    // setQuestion(e.target.value);
    setQa({ ...qa, question: e.target.value });
  };

  const handleInputAnswer = (e) => {
    //setAnswer(e.target.value);
    setQa({ ...qa, note: e.target.value });
  };

  const handleKeyDownQuestion = (e) => {
    if (e.key === "Enter" && qa.question != "") {
      e.preventDefault();
      setShowInputField(true);
    } else if (e.key === "Enter" && qa.question == "") {
      e.preventDefault();
      setShowInputField(false);
      toast.warning("Please input your question!");
    }
  };

  // ngeget data dari sever
  const getData = () => {
    axios
      .get("http://192.168.1.60:5000/api/read/notes")
      .then((res) => {
        console.log(res);
        setDataNote(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // ngepost data
  const postData = () => {
    axios
      .post("http://192.168.1.60:5000/api/create/note", qa)
      .then((res) => {
        console.log(res);
        //alert("Note berhasil disimpen nih bang");
        toast.success(res.data.message);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    document.title = "Question & Answer";
    getData();
  }, []);

  useEffect(() => {
    if (qa.note) {
      setShowSubmit(true);
    } else {
      setShowSubmit(false);
    }
  }, [qa.note]);

  const handleSubmit = (e) => {
    //alert(`Question: ${qa.question} \n Answer: ${qa.answer}`);
    e.preventDefault();
    postData();
  };

  return (
    <div className="container">
      <div className="row m-5">
        <div className="col-5">
          <ToastContainer />
          <form onSubmit={handleSubmit}>
            <div className="card p-3 border border border-0">
              <h2 className="text-center px-3 pb-4">Ask & Answer</h2>
              <InputField
                placeholder={"Type your question here ..."}
                onChange={handleInputQuestion}
                onKeyDown={handleKeyDownQuestion}
                style={{
                  resize: "none",
                  overflow: "hidden",
                }}
                className="form-control mb-3 p-3"
                rows="1"
              />

              {showInputField ? (
                <InputField
                  placeholder={"Type your answer here ..."}
                  onChange={handleInputAnswer}
                  // onKeyDown={handleKeyDownAnswer}
                  style={{ maxHeight: "200px", resize: "none" }}
                  className="form-control mb-3 p-3"
                  rows="1"
                />
              ) : null}
              {showSubmit ? (
                <input
                  className="btn btn-success w-25"
                  type="submit"
                  value="Send"
                />
              ) : null}
            </div>
          </form>
        </div>
        <div className="col-7">
          <div className="card border border-0">
            {dataNote.map((qn, index) => (
              <div className="card-body border rounded mb-3" key={index}>
                <div className="border rounded p-3 my-3">{qn.question}</div>
                <div className="border rounded p-3 my-3">{qn.note}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Note;
