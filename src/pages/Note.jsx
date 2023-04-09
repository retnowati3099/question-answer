import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputField from "../components/InputField";
import "bootstrap-icons/font/bootstrap-icons.css";

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
  const [showDelete, setShowDelete] = useState(false);
  //const [isClicked, setIsClicked] = useState(false);
  const [showText, setShowText] = useState(false);
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
    if (qa.question != "" && e.key === "Enter") {
      e.preventDefault();
      setShowInputField(true);
    } else if (qa.question == "" && e.key === "Enter") {
      e.preventDefault();
      setShowInputField(false);
      toast.warning("Please input your question!");
    }
  };

  const handleKeyDownAnswer = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const handleClick = (id) => {
    setShowDelete(true);
    //setIsClicked(true);
  };

  // nge-delete data
  const handleDelete = (id) => {
    const confirmation = window.confirm("Do you really want to delete?");
    if (confirmation) {
      axios
        .delete(`http://localhost:8080/notes/${id}`)
        .then((res) => {
          console.log(res);
          toast.success("The data is successed to delete!");
          setDataNote(dataNote.filter((item) => item.id !== id));
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          toast.error("The data is filed to delete!");
        });
    }
  };

  // nge-get data dari sever
  useEffect(() => {
    document.title = "Question & Answer";
    axios
      //.get("http://192.168.45.36:5000/api/read/notes")
      .get("http://localhost:8080/notes")
      .then((res) => {
        console.log(res);
        //setDataNote(res.data.data);
        setDataNote(res.data);
        console.log(res.data.length);
        if (res.data.length === 0) {
          setShowText(true);
        } else {
          setShowText(false);
        }

      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // nge-post data
  const handleSubmit = (e) => {
    //alert(`Question: ${qa.question} \n Answer: ${qa.answer}`);
    e.preventDefault();
    axios
      //.post("http://192.168.45.36:5000/api/create/note", qa)
      .post("http://localhost:8080/notes", qa)
      .then((res) => {
        console.log(res);
        setDataNote([...dataNote, res.data]);
        //setQa({ question: "", note: "" });
        toast.success("Note berhasil disimpen nih bang");
        //toast.success(res.data.message);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (qa.note) {
      setShowSubmit(true);
    } else {
      setShowSubmit(false);
    }
  }, [qa.note]);

  return (
    <div className="container">
      <div className="row m-5">
        <div className="col-5">
          <ToastContainer />
          <form onSubmit={handleSubmit} className="sticky-top">
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
                  onKeyDown={handleKeyDownAnswer}
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
        <div className="col-6 offset-1">
          <div className="card border border-0">
            {showText ? <h2>Let started to write your note</h2> : null}
            {dataNote.map((qn, index) => (
              <div
                className="card-body border rounded mb-3"
                key={index}
                onClick={() => handleClick(qn.id)}
              >
                {showDelete ? (
                  <div className="text-end">
                    <button
                      type="button"
                      className="btn-close"
                      aria-label="Close"
                      onClick={() => handleDelete(qn.id)}
                    ></button>
                  </div>
                ) : null}

                {/* {isClicked && (
                  <div className="text-end">
                    <button
                      type="button"
                      className="btn-close"
                      aria-label="Close"
                      onClick={() => handleDelete(qn.id)}
                    ></button>
                  </div>
                )} */}
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
